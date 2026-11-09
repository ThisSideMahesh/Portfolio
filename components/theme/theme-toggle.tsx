"use client";

import { toggleTheme, useTheme } from "@/lib/theme";

/** Compact toggle for phones and tablets; desktop uses the pull-cord. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className={`inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="8.25" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
