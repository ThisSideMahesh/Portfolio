"use client";

import { useEffect, useRef } from "react";
import { LOADER_SEEN_KEY } from "@/components/theme/theme-script";

const MIN_MS = 700;
const MAX_MS = 1200;

/**
 * First-visit loader: a counter from 0 to 100 in the bottom-left corner.
 * It only shows when the inline head script added `is-loading` to <html>, so return visits
 * and reduced-motion visitors never see it. It finishes when fonts and the window have
 * loaded, but never runs longer than 1.2 s.
 */
export function Loader() {
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("is-loading")) return;

    let ready = false;
    const markReady = () => (ready = true);
    Promise.all([
      document.fonts.ready,
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]).then(markReady);

    const start = performance.now();
    let frame = 0;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease towards 90 while waiting, then run to 100 once ready (or at the cap).
      const done = (ready && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      const target = done ? 100 : Math.min(90, (elapsed / MIN_MS) * 90);
      const value = Math.round(target);
      if (numberRef.current) numberRef.current.textContent = String(value).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;

      if (value >= 100 && !finished) {
        finished = true;
        rootRef.current?.setAttribute("data-done", "");
        window.setTimeout(() => {
          html.classList.remove("is-loading");
          try {
            sessionStorage.setItem(LOADER_SEEN_KEY, "1");
          } catch {
            // Storage blocked: the loader may show again next visit, which is harmless.
          }
        }, 450);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="site-loader">
      <span className="font-display text-lg font-semibold">thissidemahesh</span>
      <span ref={numberRef} className="font-display text-[clamp(4.5rem,14vw,10rem)] leading-none font-semibold tabular-nums">
        000
      </span>
      <span className="absolute inset-x-0 bottom-0 h-px bg-band-line">
        <span ref={barRef} className="block h-full origin-left scale-x-0 bg-accent" />
      </span>
    </div>
  );
}
