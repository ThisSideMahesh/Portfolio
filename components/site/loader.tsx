"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { LOADER_SEEN_KEY } from "@/components/theme/theme-script";
import { site } from "@/lib/site";

const MIN_MS = 1400;
const MAX_MS = 2000;

/** Pills that stack up as the counter climbs, then scatter outwards (direction per pill). */
const PILLS = [
  { label: site.name, at: 0, dx: "-38vw", dy: "-30vh", rot: "-14deg" },
  { label: "Tech", at: 18, dx: "34vw", dy: "-24vh", rot: "12deg" },
  { label: "Teaching", at: 42, dx: "-30vw", dy: "18vh", rot: "-9deg" },
  { label: "Management", at: 66, dx: "36vw", dy: "26vh", rot: "15deg" },
  { label: "Digital Creator", at: 88, dx: "4vw", dy: "40vh", rot: "-6deg" },
] as const;

/**
 * Opening animation, first visit to "/" only (decided before paint by the head script).
 * A counter climbs to 100 while one pill per door stacks up in the centre; at 100 the pills
 * scatter and the screen lifts away. Fonts and the window must be ready, but it never runs
 * longer than 2 s. Skipped entirely under reduced motion.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pillRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("is-loading")) return;

    let ready = false;
    Promise.all([
      document.fonts.ready,
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]).then(() => (ready = true));

    const start = performance.now();
    let frame = 0;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const done = (ready && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // Ease out towards 92 while waiting; jump the rest once ready.
      const eased = 1 - Math.pow(1 - Math.min(1, elapsed / MIN_MS), 2.2);
      const value = done ? 100 : Math.round(eased * 92);

      if (numberRef.current) numberRef.current.textContent = String(value).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
      pillRefs.current.forEach((pill, i) => {
        if (pill && value >= PILLS[i].at) pill.dataset.in = "";
      });

      if (value >= 100 && !finished) {
        finished = true;
        window.setTimeout(() => rootRef.current?.setAttribute("data-done", ""), 180);
        window.setTimeout(() => {
          html.classList.remove("is-loading");
          try {
            sessionStorage.setItem(LOADER_SEEN_KEY, "1");
          } catch {
            // Storage blocked: the opening may show again next visit, which is harmless.
          }
        }, 1050);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="site-loader">
      <span className="font-display text-lg font-semibold">{site.username}</span>

      <ul className="loader-pills absolute top-1/2 left-1/2 flex w-[min(78vw,20rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-2">
        {PILLS.map((pill, i) => (
          <li
            key={pill.label}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            className="loader-pill"
            style={{ "--dx": pill.dx, "--dy": pill.dy, "--rot": pill.rot, "--i": i } as CSSProperties}
          >
            {i === PILLS.length - 1 ? <span className="size-1.5 rounded-full bg-accent" /> : null}
            {pill.label}
          </li>
        ))}
      </ul>

      <div>
        <p className="text-xs text-band-muted">Opening the doors</p>
        <span ref={numberRef} className="font-display text-[clamp(4.5rem,14vw,10rem)] leading-none font-semibold tabular-nums">
          000
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px bg-band-line">
        <span ref={barRef} className="block h-full origin-left scale-x-0 bg-accent" />
      </span>
    </div>
  );
}
