"use client";

import { useRef, type PointerEvent } from "react";
import { toggleTheme, useTheme } from "@/lib/theme";

const MAX_PULL = 70; // px, the most the rope stretches
const TRIGGER = 22; // px of pull that switches the light

const AUTO_PULL = 34; // px the lamp dips by itself on a click or tap

/**
 * Hanging rope lamp, fixed in the right-hand margin so it hangs beside every section
 * (desktop widths that have a margin wide enough; smaller screens use the header button). Black ceiling cap, twisted jute rope with a knot,
 * bronze socket and an Edison bulb. The bulb is lit in the light theme and off in the dark
 * theme (pure CSS from the theme tokens, so it is right before JavaScript runs). Pull the
 * bulb down, or click / tap / press Enter: a click plays the pull by itself (dip, switch at the
 * bottom, spring back). The rope springs back and the lamp swings.
 * Motion is transform-only; drag uses rubber-band resistance.
 */
export function RopeLamp() {
  const theme = useTheme();
  const swingRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLSpanElement>(null);
  const bulbRef = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ startY: number; pull: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  function setPull(px: number, animate: boolean | string) {
    const lower = lowerRef.current;
    const upper = upperRef.current;
    if (!lower || !upper) return;
    const transition = animate === false ? "none" : animate === true ? "transform 620ms var(--ease-spring)" : animate;
    lower.style.transition = transition;
    upper.style.transition = transition;
    lower.style.transform = `translateY(${px}px)`;
    upper.style.transform = `scaleY(${(upper.offsetHeight + px) / upper.offsetHeight})`;
  }

  function bulbCentre() {
    const r = bulbRef.current?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined;
  }

  function swing() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    swingRef.current?.animate(
      { transform: ["rotate(0deg)", "rotate(3.2deg)", "rotate(-2.2deg)", "rotate(1.2deg)", "rotate(-0.5deg)", "rotate(0deg)"] },
      { duration: 1500, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }, // = --ease-out (WAAPI cannot read CSS vars)
    );
  }

  function flip() {
    toggleTheme(bulbCentre());
    swing();
  }

  /** Click / tap / keyboard: pull the lamp down by itself, switch at the bottom, spring back. */
  function autoPull() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      toggleTheme(bulbCentre());
      return;
    }
    setPull(AUTO_PULL, "transform 190ms var(--ease-out)");
    window.setTimeout(() => {
      flip();
      setPull(0, true);
    }, 200);
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    drag.current = { startY: event.clientY, pull: 0, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const state = drag.current;
    if (!state) return;
    const distance = Math.max(0, event.clientY - state.startY);
    // Rubber band: resistance rises as the rope stretches.
    state.pull = MAX_PULL * (1 - Math.exp(-distance / MAX_PULL));
    if (distance > 4) state.moved = true;
    setPull(state.pull, false);
  }

  function onPointerUp() {
    const state = drag.current;
    drag.current = null;
    if (!state) return;
    setPull(0, true);
    if (state.moved) {
      suppressClick.current = true;
      if (state.pull >= TRIGGER) flip();
      else swing();
    }
  }

  return (
    <div
      ref={swingRef}
      className="rope-lamp pointer-events-none fixed top-0 z-50 hidden origin-top xl:block"
      style={{ right: "max(4px, calc((100vw - 1200px) / 4 - 16px))" }}
    >
      {/* Ceiling cap */}
      <svg viewBox="0 0 60 22" width="60" height="22" aria-hidden="true" className="mx-auto block">
        <rect x="4" y="0" width="52" height="12" rx="3" fill="#1b1a19" />
        <rect x="24" y="12" width="12" height="10" rx="2" fill="#2a2826" />
      </svg>

      {/* Upper rope: stretches (scaleY from the top) while the lower part is pulled */}
      <span ref={upperRef} aria-hidden="true" className="rope mx-auto block h-[92px] w-[11px] origin-top" />

      <div ref={lowerRef}>
        {/* Knot */}
        <svg viewBox="0 0 54 78" width="54" height="78" aria-hidden="true" className="mx-auto -my-1 block">
          <defs>
            <pattern id="jute" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="8" height="8" fill="#b18a56" />
              <rect width="3" height="8" fill="#8a673b" />
              <rect x="4" width="1.4" height="8" fill="#d4b07c" />
            </pattern>
          </defs>
          <path d="M27 0 C27 14 8 16 8 32 C8 48 27 50 27 40 C27 30 46 34 46 48 C46 62 27 62 27 78" fill="none" stroke="url(#jute)" strokeWidth="11" strokeLinecap="round" />
          <path d="M27 6 C27 18 44 20 44 34 C44 46 30 46 28 40" fill="none" stroke="url(#jute)" strokeWidth="11" strokeLinecap="round" />
          <path d="M27 0 C27 14 8 16 8 32 C8 48 27 50 27 40 C27 30 46 34 46 48 C46 62 27 62 27 78" fill="none" stroke="#6e5230" strokeOpacity="0.35" strokeWidth="11" strokeDasharray="1 5" />
        </svg>

        {/* Lower rope + pull target (socket and bulb) */}
        <span aria-hidden="true" className="rope mx-auto block h-[46px] w-[11px]" />
        <button
          type="button"
          aria-label="Dark theme (pull the lamp)"
          aria-pressed={theme === null ? undefined : theme === "dark"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={() => {
            if (suppressClick.current) {
              suppressClick.current = false;
              return;
            }
            autoPull();
          }}
          className="lamp-pull pointer-events-auto relative mx-auto -mt-px flex w-16 touch-none cursor-grab flex-col items-center select-none active:cursor-grabbing"
        >
          {/* Socket */}
          <svg viewBox="0 0 26 30" width="26" height="30" aria-hidden="true" className="block">
            <rect x="4" y="0" width="18" height="6" rx="2" fill="#3a2d22" />
            <rect x="2" y="5" width="22" height="20" rx="3" fill="#4a3a2b" />
            <rect x="2" y="9" width="22" height="2" fill="#2b2119" />
            <rect x="2" y="15" width="22" height="2" fill="#2b2119" />
            <rect x="6" y="24" width="14" height="6" rx="2" fill="#5b4733" />
          </svg>

          {/* Bulb: glow halo, glass and filament; lit state comes from CSS (--bulb-on) */}
          <span ref={bulbRef} className="relative -mt-0.5 block">
            <span aria-hidden="true" className="bulb-halo" />
            <svg viewBox="0 0 48 70" width="48" height="70" aria-hidden="true" className="relative block">
              <defs>
                <radialGradient id="glass-lit" cx="50%" cy="42%" r="60%">
                  <stop offset="0%" stopColor="#fff6dc" />
                  <stop offset="55%" stopColor="#ffd98a" />
                  <stop offset="100%" stopColor="#f2a541" />
                </radialGradient>
              </defs>
              {/* glass (off) */}
              <path className="bulb-glass-off" d="M16 2 h16 v6 C42 16 46 26 46 38 C46 56 36 68 24 68 C12 68 2 56 2 38 C2 26 6 16 16 8 Z" />
              {/* glass (lit) fades in over the off glass */}
              <path className="bulb-glass-on" d="M16 2 h16 v6 C42 16 46 26 46 38 C46 56 36 68 24 68 C12 68 2 56 2 38 C2 26 6 16 16 8 Z" fill="url(#glass-lit)" />
              {/* filament */}
              <path className="bulb-filament" d="M19 8 L19 36 M29 8 L29 36 M19 36 L21 32 L23 40 L25 32 L27 40 L29 36" fill="none" strokeWidth="1.4" strokeLinejoin="round" />
              {/* glass highlight */}
              <path d="M12 26 C10 34 11 44 15 52" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
