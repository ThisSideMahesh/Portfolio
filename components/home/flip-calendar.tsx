"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2600;
const FLIP_MS = 760;

/**
 * Spiral-bound flip calendar that cycles the roles continuously. The top page lifts on its
 * ring hinge, darkens as it turns away and flips up over the rings; the page underneath
 * settles in. It waits while the tab is hidden and does not run under reduced motion.
 *
 * Known exception (Mahesh's choice, 2026-11-10): there is no pause control, so this does not
 * meet WCAG 2.2.2 (Pause, Stop, Hide). Hover/click pauses and a three-round stop were tried
 * and read as "broken", so they were removed. Revisit before launch (PLAN §8).
 * Screen readers get the whole list once, as text, in the heading.
 */
export function FlipCalendar({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [flips, setFlips] = useState(0);
  const [tick, setTick] = useState(0); // re-arms the timer while the tab is hidden

  useEffect(() => {
    if (roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (document.hidden) return setTick((t) => t + 1);
      setLeaving(index);
      setIndex((i) => (i + 1) % roles.length);
      setFlips((f) => f + 1);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [index, roles.length, tick]);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(roles.length).padStart(2, "0")}`;

  return (
    <div aria-hidden="true" className="calendar relative w-full max-w-[30rem]">
      {/* Rings */}
      <div className="absolute inset-x-6 -top-3 z-30 flex justify-between">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="calendar-ring" />
        ))}
      </div>
      {/* Offset backing card and the stacked page edges under it */}
      <span className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[0.9rem] bg-ink" />
      <span className="absolute inset-x-1 -bottom-1.5 h-full rounded-[0.9rem] border border-line bg-[var(--paper-edge)]" />
      <span className="absolute inset-x-0.5 -bottom-0.75 h-full rounded-[0.9rem] border border-line bg-[var(--paper-edge)]" />

      {/* Current page: settles in as the page above lifts away */}
      <div key={`page-${index}`} className={`calendar-page relative z-10 ${flips > 0 ? "calendar-settle" : ""}`}>
        <span className="calendar-word">{roles[index]}</span>
        <span className="calendar-counter">{counter}</span>
      </div>

      {/* The page that is flipping away */}
      {leaving !== null ? (
        <div key={`leaving-${flips}`} className="calendar-page calendar-flip absolute inset-0 z-20">
          <span className="calendar-word">{roles[leaving]}</span>
        </div>
      ) : null}
    </div>
  );
}
