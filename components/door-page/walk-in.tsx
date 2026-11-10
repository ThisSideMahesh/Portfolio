"use client";

import { useLayoutEffect, useRef } from "react";
import { WALK_KEY } from "@/components/home/door-card";

const SAFETY_MS = 1200;

/**
 * Second half of the door walk-through: when the visitor arrived by opening a door, the page
 * starts covered in the page colour and fades in. On a direct visit the cover never shows.
 *
 * Fail-safe by design (the "black screen" bug): the fade is a CSS animation, which the browser
 * times by itself, instead of waiting for requestAnimationFrame (which can be paused when a
 * window is unfocused or busy). A timer also removes the cover after 1.2 s whatever happens.
 */
export function WalkIn() {
  const ref = useRef<HTMLDivElement>(null);
  const walkedRef = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    const cover = ref.current;
    if (!cover) return;
    // Read the flag once per mount: in development React runs this effect twice, and the second run
    // would otherwise find the flag already cleared and leave the first run's class behind.
    if (walkedRef.current === null) {
      let walked = false;
      try {
        walked = sessionStorage.getItem(WALK_KEY) === "1";
        sessionStorage.removeItem(WALK_KEY);
      } catch {
        // No storage: no fade.
      }
      walkedRef.current = walked;
    }
    if (!walkedRef.current) return;

    cover.classList.add("walk-in-active");
    const remove = () => cover.classList.remove("walk-in-active");
    cover.addEventListener("animationend", remove, { once: true });
    const safety = window.setTimeout(remove, SAFETY_MS);
    return () => {
      window.clearTimeout(safety);
      cover.removeEventListener("animationend", remove);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="walk-in-cover pointer-events-none fixed inset-0 z-[90] bg-[var(--light)]" />;
}
