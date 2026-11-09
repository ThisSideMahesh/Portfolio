"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { toggleTheme, useTheme } from "@/lib/theme";

const MAX_PULL = 90; // px the cord can stretch
const TRIGGER = 28; // px of pull that counts as a pull (a plain click also counts)

/**
 * Pull-cord light switch (desktop). Drag the bead down and let go, or click it, to switch
 * theme; the cord springs back with a small overshoot. It is a real <button>, so Enter and
 * Space work and screen readers announce it as a toggle.
 */
export function PullCord() {
  const theme = useTheme();
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<number | null>(null);
  const moved = useRef(false);

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    start.current = event.clientY;
    moved.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (start.current === null) return;
    const distance = Math.max(0, Math.min(MAX_PULL, event.clientY - start.current));
    if (distance > 4) moved.current = true;
    setPull(distance);
  }

  function release() {
    if (start.current === null) return;
    const pulled = pull >= TRIGGER;
    start.current = null;
    setDragging(false);
    setPull(0);
    if (pulled) toggleTheme();
  }

  return (
    <div className="pointer-events-none fixed top-0 right-6 z-30 hidden lg:block xl:right-10">
      <button
        type="button"
        aria-label="Dark theme (pull cord)"
        aria-pressed={theme === null ? undefined : theme === "dark"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onClick={(event) => {
          // Keyboard activation, or a click without a drag, toggles directly.
          if (event.detail === 0 || !moved.current) toggleTheme();
          moved.current = false;
        }}
        className="pull-cord group pointer-events-auto relative flex w-11 touch-none flex-col items-center outline-offset-4 select-none"
        style={{ "--pull": `${pull}px` } as CSSProperties}
        data-dragging={dragging || undefined}
      >
        <span aria-hidden="true" className="pull-cord-string block w-px" />
        <span aria-hidden="true" className="pull-cord-bead block h-9 w-5 cursor-grab rounded-b-full rounded-t-[40%] active:cursor-grabbing" />
      </button>
    </div>
  );
}
