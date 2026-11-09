"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "@/components/site/site-header";

/**
 * Full-screen menu for phones. Closes on Esc, on link click, and returns focus to the button.
 * The panel is portalled to <body>: the header's backdrop-filter makes it the containing block
 * for fixed children, which would otherwise trap the "full-screen" panel inside the header.
 */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open
        ? createPortal(
            <div id={panelId} className="mobile-menu-panel fixed inset-0 z-[60] flex flex-col bg-bg px-4 pt-6 pb-10">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="ml-auto inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium"
              >
                Close
              </button>
              <nav aria-label="Main" className="mt-auto">
                <ul className="space-y-1">
                  {links.map((link, i) => (
                    <li key={link.href} className="mobile-menu-item" style={{ animationDelay: `${60 + i * 40}ms` }}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 font-display text-5xl font-semibold tracking-tight"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
