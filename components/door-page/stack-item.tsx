"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const TOP_PX = 80; // 5rem: just under the header island
const STEP_PX = 20; // 1.25rem: how far each of the first cards peeks out below the one in front
const ROOM_PX = 24; // air kept under a card that sticks

/**
 * One card in a stack. Every card always sticks (CSS sticky, see .stack-card), in a fixed order: each later
 * card is drawn above the earlier ones. There is no "pinned or not" state, which is what used to make a card
 * slide under its neighbours on some window sizes.
 *
 * The only thing measured is where a card sticks. A card taller than the window sticks higher, so its bottom
 * (the links) stays on screen instead of hanging below the fold. The result is written to a CSS variable
 * (--stack-top), never to React state, so a card changing size (an image loading, a font swapping) only
 * nudges a number and never flips the layout.
 */
export function StackItem({ depth, index, children }: { depth: number; index: number; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const place = () => {
      const wanted = TOP_PX + depth * STEP_PX;
      const top = Math.min(wanted, window.innerHeight - el.offsetHeight - ROOM_PX);
      el.style.setProperty("--stack-top", `${Math.round(top)}px`);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(el);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [depth]);

  return (
    <li ref={ref} className="stack-card" style={{ "--depth": depth, "--i": index } as CSSProperties}>
      {children}
    </li>
  );
}
