"use client";

import { useEffect, useState } from "react";

/**
 * Big year beside the timeline (desktop only). Each digit is a column of 0–9 that slides to the
 * active value, so the year rolls digit by digit. An IntersectionObserver picks the year whose
 * entries cross the middle of the viewport; nothing listens to scroll events.
 */
export function StoryYearMarker({ years }: { years: readonly number[] }) {
  const [active, setActive] = useState(years[0] ?? 0);
  const [month, setMonth] = useState(-1);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-story-year]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-story-year")));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));

    // The month follows the entry crossing the middle of the screen; entries without a month keep the last one.
    const monthObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const value = Number(entry.target.getAttribute("data-story-month"));
          if (entry.isIntersecting && value >= 0) setMonth(value);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-story-month]").forEach((target) => monthObserver.observe(target));
    return () => {
      observer.disconnect();
      monthObserver.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="mt-10 hidden md:block">
      <p className="flex font-display text-[clamp(5rem,11vw,9rem)] leading-none font-semibold tracking-tighter tabular-nums">
        {String(active)
          .padStart(4, "0")
          .split("")
          .map((digit, i) => (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <span
                className="story-digit flex flex-col"
                style={{ transform: `translateY(-${Number(digit)}em)`, transitionDelay: `${i * 50}ms` }}
              >
                {"0123456789".split("").map((n) => (
                  <span key={n} className="h-[1em]">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          ))}
      </p>
      {/* The month rolls like the year digits: a column of twelve names slides to the active one. */}
      <div className="mt-4 h-[1.2em] overflow-hidden font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] font-bold tracking-[0.18em] text-accent-text uppercase">
        <div className="story-digit flex flex-col" style={{ transform: `translateY(-${Math.max(month, 0) * 1.2}em)` }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <span key={m} className="h-[1.2em]">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
