"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contactIntents } from "@/lib/data";
import { site } from "@/lib/site";

function mailto(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * One "Hire me" button that opens the four contact options (comment #10). Each option opens the
 * visitor's email app with a prefilled subject and body. The menu scales in from the button
 * (ease-out, 200 ms), closes on Esc, on a click outside, or after a choice, and gives focus back
 * to the button.
 */
export function HireMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="pill bg-band-ink pr-1.5 text-lg text-band"
      >
        Hire me
        <span className="pill-arrow" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`transition-transform duration-[var(--dur-ui)] ease-[var(--ease-out)] ${open ? "rotate-180" : ""}`}
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div id={menuId} data-open={open || undefined} className="hire-menu" inert={!open}>
        <p className="px-3 pt-1 pb-2 text-sm text-band-muted">What is it about?</p>
        <ul>
          {contactIntents.map((intent) => (
            <li key={intent.label}>
              <a
                href={mailto(intent.subject, intent.body)}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-between gap-6 rounded-xl px-3 py-2 text-band-ink transition-colors hover:bg-band-line focus-visible:bg-band-line"
              >
                {intent.label}
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
