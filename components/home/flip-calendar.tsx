"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2600;
const FLIP_MS = 650;

/**
 * Spiral-bound flip calendar that cycles the roles. The top page lifts on its ring hinge and
 * flips up and over to reveal the next one. Pauses on hover/focus, while the tab is hidden,
 * and via the pause button (WCAG 2.2.2). Under reduced motion it stays still on the first role.
 * Screen readers get the whole list once, as text, in the parent heading.
 */
export function FlipCalendar({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(0); // re-arms the timer while the tab is hidden

  useEffect(() => {
    if (paused || hovered || roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (document.hidden) return setTick((t) => t + 1);
      setLeaving(index);
      setIndex((i) => (i + 1) % roles.length);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, hovered, roles.length, tick]);

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(roles.length).padStart(2, "0")}`;

  return (
    <div
      className="flex items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div aria-hidden="true" className="calendar relative min-w-0 flex-1 md:max-w-[30rem]">
        {/* Rings */}
        <div className="absolute -top-3 inset-x-6 z-30 flex justify-between">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className="calendar-ring" />
          ))}
        </div>
        {/* Offset backing card and the stacked page edges under it */}
        <span className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[0.9rem] bg-ink" />
        <span className="absolute inset-x-1 -bottom-1.5 h-full rounded-[0.9rem] border border-line bg-[var(--paper-edge)]" />
        <span className="absolute inset-x-0.5 -bottom-0.75 h-full rounded-[0.9rem] border border-line bg-[var(--paper-edge)]" />

        {/* Current page */}
        <div className="calendar-page relative z-10">
          <span className="calendar-word">{roles[index]}</span>
          <span className="calendar-counter">{counter}</span>
        </div>

        {/* The page that is flipping away */}
        {leaving !== null ? (
          <div key={leaving} className="calendar-page calendar-flip absolute inset-0 z-20">
            <span className="calendar-word">{roles[leaving]}</span>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play role animation" : "Pause role animation"}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </div>
  );
}
