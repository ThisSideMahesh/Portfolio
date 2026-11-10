"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { LOADER_SEEN_KEY } from "@/components/theme/theme-script";
import { site } from "@/lib/site";

const MIN_MS = 1400;
const MAX_MS = 2000;
const CLEAR_MS = 1450; // after the count reaches 100: long enough for the panels to lift away

/** One tall panel per door, in the door's own colour. They lift away in turn to open up the page. */
const PANELS = ["#24334a", "#2f4a3b", "#6b2f3b", "#2b2825"] as const;

/**
 * Opening animation, first visit to "/" only (decided before paint by the head script).
 * Four tall panels in the door colours fill the screen while a counter climbs to 100 under
 * "Opening up the work". At 100 the text fades and the panels lift away one after another
 * (transform only), opening up the page behind them. Fonts and the window must be ready, but it
 * never runs longer than 2 s. Skipped entirely under reduced motion.
 *
 * Fail-safe: the counter is driven by requestAnimationFrame, which browsers pause in background
 * windows, so a plain timer also finishes the opening at MAX_MS + 400 whatever happens.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

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

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      if (numberRef.current) numberRef.current.textContent = "100";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      window.setTimeout(() => rootRef.current?.setAttribute("data-done", ""), 200);
      window.setTimeout(() => {
        html.classList.remove("is-loading");
        try {
          sessionStorage.setItem(LOADER_SEEN_KEY, "1");
        } catch {
          // Storage blocked: the opening may show again next visit, which is harmless.
        }
      }, CLEAR_MS);
    };
    const safety = window.setTimeout(finish, MAX_MS + 400);

    const tick = (now: number) => {
      const elapsed = now - start;
      const done = (ready && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // Ease out towards 92 while waiting; jump the rest once ready.
      const eased = 1 - Math.pow(1 - Math.min(1, elapsed / MIN_MS), 2.2);
      const value = done ? 100 : Math.round(eased * 92);

      if (numberRef.current) numberRef.current.textContent = String(value).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
      if (value >= 100) return finish();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="site-loader">
      <div className="loader-panels">
        {PANELS.map((color, i) => (
          <span key={color} className="loader-panel" style={{ "--pc": color, "--i": i } as CSSProperties} />
        ))}
      </div>

      <div className="loader-ui">
        <span translate="no" className="font-display text-lg font-semibold">
          {site.name}
        </span>
        <div>
          <p className="text-sm font-medium tracking-wide text-band-muted">Opening up the work</p>
          <span ref={numberRef} className="font-display text-[clamp(4.5rem,14vw,10rem)] leading-none font-semibold tabular-nums">
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
