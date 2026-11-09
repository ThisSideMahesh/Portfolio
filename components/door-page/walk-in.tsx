"use client";

import { useLayoutEffect, useRef } from "react";
import { WALK_KEY } from "@/components/home/door-card";

/**
 * Second half of the door walk-through: when the visitor arrived by opening a door, the page
 * starts black and fades in. On a direct visit the overlay stays invisible. The flag is read in
 * a layout effect and the overlay is driven through its ref, so it is black before the first
 * paint (no flash of the page) without an extra React render.
 */
export function WalkIn() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = ref.current;
    if (!overlay) return;
    let walked = false;
    try {
      walked = sessionStorage.getItem(WALK_KEY) === "1";
      sessionStorage.removeItem(WALK_KEY);
    } catch {
      // No storage: no fade.
    }
    if (!walked) return;

    overlay.style.transition = "none";
    overlay.style.opacity = "1";
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        overlay.style.transition = "opacity 700ms var(--ease-out)";
        overlay.style.opacity = "0";
      }),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] bg-band opacity-0" />;
}
