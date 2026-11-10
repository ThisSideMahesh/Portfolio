"use client";

import { useEffect, useRef } from "react";
import { PanelDoor } from "@/components/home/panel-door";
import { LOADER_SEEN_KEY } from "@/components/theme/theme-script";
import { site } from "@/lib/site";

const MIN_MS = 1100;
const MAX_MS = 1700;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

/**
 * Opening animation, first visit to "/" only (decided before paint by the head script).
 * One door stands in a dark hallway. As the counter climbs to 100 under "Opening up the work",
 * the door cracks open inward and light leaks through. At 100 the handle turns, the door swings
 * wide inward, and the view walks through the doorway into the page, which fades in with the
 * hero rising: the same door and the same walk the site's tabs use. Skipped under reduced motion.
 *
 * Beat map (ms after 100): 0 handle, 120 swing in (650), 600 walk through (850), 1250 fade to
 * page (350), 1650 done. Fail-safe: the counter uses requestAnimationFrame, which browsers pause
 * in background windows, so a plain timer also runs the whole sequence at MAX_MS + 400.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const door = doorRef.current;
    if (!html.classList.contains("is-loading") || !root || !door) return;
    const leaf = door.querySelector<HTMLElement>(".pdoor-leaf");
    const lever = door.querySelector<HTMLElement>(".pdoor-lever");
    const opening = door.querySelector<HTMLElement>(".pdoor-opening");

    let ready = false;
    Promise.all([
      document.fonts.ready,
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]).then(() => (ready = true));

    const start = performance.now();
    let frame = 0;
    let finished = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      if (numberRef.current) numberRef.current.textContent = "100";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      root.setAttribute("data-done", "");
      root.style.setProperty("--lit", "1");

      if (lever) {
        lever.style.transition = "transform 160ms cubic-bezier(0.23, 1, 0.32, 1)";
        lever.style.transform = "rotate(28deg)";
      }
      at(120, () => {
        if (!leaf) return;
        leaf.style.transition = `transform 650ms ${EASE}`;
        leaf.style.transform = "rotateY(-84deg)";
      });
      at(600, () => {
        if (!opening) return;
        const box = opening.getBoundingClientRect();
        const scale = Math.max(window.innerWidth / box.width, window.innerHeight / box.height) * 1.15;
        door.style.transition = `transform 850ms ${EASE}`;
        door.style.transform = `scale(${scale})`;
      });
      at(1250, () => root.setAttribute("data-fade", ""));
      at(1650, () => {
        html.classList.remove("is-loading");
        try {
          sessionStorage.setItem(LOADER_SEEN_KEY, "1");
        } catch {
          // Storage blocked: the opening may show again next visit, which is harmless.
        }
      });
    };
    timers.push(window.setTimeout(finish, MAX_MS + 400));

    const tick = (now: number) => {
      const elapsed = now - start;
      const done = (ready && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // Ease out towards 92 while waiting; jump the rest once ready.
      const eased = 1 - Math.pow(1 - Math.min(1, elapsed / MIN_MS), 2.2);
      const value = done ? 100 : Math.round(eased * 92);
      const p = value / 100;

      if (numberRef.current) numberRef.current.textContent = String(value).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      // The door cracks open as the count rises, and light leaks through the gap.
      if (leaf) leaf.style.transform = `rotateY(${-p * 24}deg)`;
      root.style.setProperty("--lit", String(p * 0.6));

      if (value >= 100) return finish();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="site-loader">
      <div className="loader-stage">
        <div ref={doorRef} className="loader-door">
          <PanelDoor variant="tech" name="Welcome" />
        </div>
      </div>

      <div className="loader-ui">
        <span translate="no" className="font-display text-lg font-semibold">
          {site.name}
        </span>
        <div>
          <p className="text-sm font-medium tracking-wide text-band-muted">Opening up the work</p>
          <span ref={numberRef} className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-none font-semibold tabular-nums">
            000
          </span>
        </div>
        <span className="absolute inset-x-0 bottom-0 h-px bg-band-line">
          <span ref={barRef} className="block h-full origin-left scale-x-0 bg-accent" />
        </span>
      </div>
    </div>
  );
}
