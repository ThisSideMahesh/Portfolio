"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const TOP_PX = 80; // matches 5rem in .stack-card
const STEP_PX = 20; // matches 1.25rem
const ROOM_PX = 24;

/**
 * One card in a stack. It is pinned (CSS sticky, see .stack-card) only while the whole card fits in the
 * window below its pin position: a card taller than the window cannot be pinned, because its bottom
 * (the links) could then never be scrolled into view. Too-tall cards, and phones, simply scroll.
 * Measured on mount, on resize and whenever the card changes size (images loading, text reflowing).
 */
export function StackItem({ depth, children }: { depth: number; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const [pin, setPin] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setPin(window.innerWidth >= 768 && el.offsetHeight + TOP_PX + depth * STEP_PX + ROOM_PX <= window.innerHeight);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [depth]);

  return (
    <li ref={ref} data-pin={pin || undefined} className="stack-card" style={{ "--depth": depth } as CSSProperties}>
      {children}
    </li>
  );
}
