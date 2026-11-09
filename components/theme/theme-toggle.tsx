"use client";

import { toggleTheme, useTheme } from "@/lib/theme";

/** Header theme button, on every screen size (the rope lamp lives in the hero only). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => {
        const r = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className={`inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors duration-[var(--dur-fast)] hover:text-ink active:scale-[0.97] ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="8.25" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
