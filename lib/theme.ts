"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/components/theme/theme-script";

/** Shared theme store for the header toggle and the pull-cord, so both always agree. */
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

/** Switches theme with a cross-fade (View Transitions) where supported and motion is allowed. */
export function toggleTheme() {
  const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "startViewTransition" in document) {
    document.startViewTransition(() => apply(next));
  } else {
    apply(next);
  }
}

/** Current theme on the client; null during server render and hydration. */
export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, resolvedTheme, () => null);
}
