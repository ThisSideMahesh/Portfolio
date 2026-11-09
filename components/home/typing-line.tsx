"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 38;
const ERASE_MS = 18;
const HOLD_MS = 2600;

/**
 * Self-typing line (DESIGN.md §5). Server-renders the first line in full, so the text is
 * readable before JavaScript and never shifts layout. Pauses while the tab is hidden;
 * under reduced motion it stays on the first line.
 */
export function TypingLine({ lines }: { lines: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(lines[0]?.length ?? 0);
  const [erasing, setErasing] = useState(false);
  const [tick, setTick] = useState(0); // re-arms the timer while the tab is hidden

  useEffect(() => {
    if (lines.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const full = lines[index] ?? "";
    let delay = erasing ? ERASE_MS : TYPE_MS;
    if (!erasing && shown === full.length) delay = HOLD_MS;

    const timer = window.setTimeout(() => {
      if (document.hidden) return setTick((t) => t + 1);
      if (!erasing && shown === full.length) return setErasing(true);
      if (erasing && shown === 0) {
        setErasing(false);
        return setIndex((i) => (i + 1) % lines.length);
      }
      setShown((s) => s + (erasing ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [lines, index, shown, erasing, tick]);

  return (
    <p className="min-h-[3.2em] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-muted">
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {(lines[index] ?? "").slice(0, shown)}
        <span className="caret" />
      </span>
    </p>
  );
}
