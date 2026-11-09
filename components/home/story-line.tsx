"use client";

import { useEffect, useRef } from "react";

/**
 * The timeline's line: a faint track, an orange fill that grows as you scroll through the
 * story, and a pointer that rides the end of the fill. Progress is where the viewport's middle
 * sits along the list. One passive scroll listener, at most one update per frame, transform only
 * (scaleY on the fill, translateY on the pointer). Entry dots light up once the pointer passes.
 */
export function StoryLine() {
  const rootRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const list = root?.parentElement;
    if (!root || !list) return;
    const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-story-dot]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const middle = window.innerHeight * 0.5;
      const progress = Math.min(1, Math.max(0, (middle - rect.top) / rect.height));
      const px = progress * rect.height;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
      if (dotRef.current) dotRef.current.style.transform = `translate(-50%, ${px}px)`;
      for (const dot of dots) {
        const reached = dot.getBoundingClientRect().top - rect.top <= px + 2;
        dot.toggleAttribute("data-reached", reached);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <span ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px">
      <span className="absolute inset-0 bg-line" />
      <span ref={fillRef} className="story-fill absolute inset-0 origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
      <span ref={dotRef} className="story-pointer absolute top-0 left-0" style={{ transform: "translate(-50%, 0px)" }} />
    </span>
  );
}
