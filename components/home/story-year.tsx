"use client";

import { useEffect, useState } from "react";

/**
 * Big year beside the timeline (desktop only). An IntersectionObserver picks the year whose
 * entries cross the middle of the viewport; no scroll listener, no scroll-linked animation.
 */
export function StoryYearMarker({ years }: { years: readonly number[] }) {
  const [active, setActive] = useState(years[0]);

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

  return (
    <p aria-hidden="true" className="mt-10 hidden font-display text-[clamp(5rem,11vw,9rem)] leading-none font-semibold tabular-nums tracking-tighter md:block">
      {active}
    </p>
  );
}
