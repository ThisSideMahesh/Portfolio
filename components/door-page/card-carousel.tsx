"use client";

import { Children, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { RevealHeading } from "@/components/ui/reveal-heading";

/**
 * A titled row of cards that swipes side by side, one card at a time (CSS scroll-snap), with the
 * next card peeking in so the swipe is obvious. Touch and trackpads scroll natively; a mouse can drag
 * the row; the arrow buttons, the dots and the Left and Right keys move one card. The active card is
 * found with an IntersectionObserver (no scroll listener). A single card shows no controls.
 */
export function CardCarousel({ title, children }: { title: string; children: ReactNode }) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const root = scroller.current;
    if (!root || total < 2) return;
    const items = Array.from(root.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLElement));
        }
      },
      { root, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [total]);

  const go = (index: number) => {
    const root = scroller.current;
    const target = root?.children[Math.max(0, Math.min(total - 1, index))] as HTMLElement | undefined;
    if (!root || !target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollTo({ left: target.offsetLeft - root.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  };

  // Mouse drag (touch and trackpad already scroll natively).
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller.current) return;
    drag.current = { x: event.clientX, left: scroller.current.scrollLeft };
    scroller.current.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return;
    scroller.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const root = scroller.current;
    if (!drag.current || !root) return;
    drag.current = null;
    root.releasePointerCapture(event.pointerId);
    setDragging(false);
    // Settle on the nearest card.
    const items = Array.from(root.children) as HTMLElement[];
    const nearest = items.reduce((best, item, i) => (Math.abs(item.offsetLeft - root.offsetLeft - root.scrollLeft) < Math.abs(items[best].offsetLeft - root.offsetLeft - root.scrollLeft) ? i : best), 0);
    go(nearest);
  };

  return (
    <section aria-roledescription="carousel" aria-label={title} className="wrap py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
        <RevealHeading className="text-[clamp(1.75rem,4vw,3rem)]" lines={[{ text: title }]} />
        {total > 1 ? (
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm font-medium text-muted tabular-nums" aria-hidden="true">
              {active + 1} / {total}
            </span>
            <button type="button" className="carousel-arrow" aria-label={`Previous card in ${title}`} disabled={active === 0} onClick={() => go(active - 1)}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="carousel-arrow" aria-label={`Next card in ${title}`} disabled={active === total - 1} onClick={() => go(active + 1)}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={scroller}
        tabIndex={total > 1 ? 0 : undefined}
        aria-label={`${title}, swipe or use the arrow keys`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        data-dragging={dragging || undefined}
        className="carousel"
      >
        {slides.map((slide, i) => (
          <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${total}`} className="carousel-slide">
            {slide}
          </div>
        ))}
      </div>

      {total > 1 ? (
        <div className="mt-5 flex justify-center gap-1" aria-hidden="false">
          {slides.map((_, i) => (
            <button key={i} type="button" aria-label={`Go to card ${i + 1} of ${total}`} aria-current={i === active ? "true" : undefined} onClick={() => go(i)} className="carousel-dot" />
          ))}
        </div>
      ) : null}
    </section>
  );
}
