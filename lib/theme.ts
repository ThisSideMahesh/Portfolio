"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/components/theme/theme-script";

/** Shared theme store for the header toggle and the rope lamp, so both always agree. */
export type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

function resolvedTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", onChange);
  };
}

function apply(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked (private mode); the choice still applies for this page view.
  }
  listeners.forEach((notify) => notify());
}

/**
 * Switches theme. Where View Transitions are supported and motion is allowed, the new theme
 * spreads as a circle from `origin` (the lamp's bulb, or the button that was pressed).
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("startViewTransition" in document)) {
    apply(next);
    return;
  }
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(() => apply(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" }, // = --ease-in-out
      );
    })
    .catch(() => {
      // A skipped transition still applied the theme.
    });
}

/** Current theme on the client; null during server render and hydration. */
export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, resolvedTheme, () => null);
}
