"use client";

import { useEffect, useState } from "react";

/**
 * Big year beside the timeline (desktop only). Each digit is a column of 0–9 that slides to the
 * active value, so the year rolls digit by digit. An IntersectionObserver picks the year whose
 * entries cross the middle of the viewport; nothing listens to scroll events.
 */
export function StoryYearMarker({ years }: { years: readonly number[] }) {
  const [active, setActive] = useState(years[0] ?? 0);

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
    return () => observer.disconnect();
  }, []);

  const position = Math.max(0, years.indexOf(active));

  return (
    <div aria-hidden="true" className="mt-10 hidden md:block">
      <p className="flex font-display text-[clamp(5rem,11vw,9rem)] leading-none font-semibold tracking-tighter tabular-nums">
        {String(active)
          .padStart(4, "0")
          .split("")
          .map((digit, i) => (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <span
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateY(-${Number(digit)}em)`, transitionDelay: `${i * 60}ms` }}
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
      <div className="mt-5 flex items-center gap-4 text-sm text-muted tabular-nums">
        <span>
          {String(position + 1).padStart(2, "0")} / {String(years.length).padStart(2, "0")}
        </span>
        <span className="relative h-px w-28 bg-line">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500"
            style={{ width: `${((position + 1) / years.length) * 100}%` }}
          />
        </span>
      </div>
    </div>
  );
}
