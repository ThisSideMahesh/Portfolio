"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";

function resolvedTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", onChange);
  };
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked (private mode); the choice still applies for this page view.
  }
  listeners.forEach((notify) => notify());
}

/** Two-state toggle. The server snapshot is null, so the label settles after hydration without a mismatch. */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, resolvedTheme, () => null);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : isDark}
      className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:text-ink"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="8.25" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
