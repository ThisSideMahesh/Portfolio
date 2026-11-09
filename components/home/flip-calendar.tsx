"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2600;
const FLIP_MS = 760;
const ROUNDS = 3; // stops on the first role after three full rounds

/**
 * Spiral-bound flip calendar that cycles the roles. The top page lifts on its ring hinge,
 * darkens as it turns away and flips up over the rings; the page underneath settles in.
 *
 * No visible pause button (Mahesh's choice). WCAG 2.2.2 still needs a way to stop moving
 * content, so: hover pauses it, a click or tap on the card pauses/resumes it, it stops by
 * itself after three rounds, it never runs while the tab is hidden, and under reduced motion
 * it does not run at all. Screen readers get the whole list once, as text, in the heading.
 */
export function FlipCalendar({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [flips, setFlips] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(0); // re-arms the timer while the tab is hidden

  const finished = flips >= roles.length * ROUNDS;

  useEffect(() => {
    if (paused || hovered || finished || roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (document.hidden) return setTick((t) => t + 1);
      setLeaving(index);
      setIndex((i) => (i + 1) % roles.length);
      setFlips((f) => f + 1);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, hovered, finished, roles.length, tick]);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(roles.length).padStart(2, "0")}`;

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (finished ? setFlips(0) : setPaused((p) => !p))}
      className="calendar relative w-full max-w-[30rem] cursor-pointer"
    >
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
