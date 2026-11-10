"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Line = { text: string; className?: string };

/**
 * A heading whose words rise out of a mask, one after another, the first time it scrolls into
 * view (comment #16). Words stagger by 70 ms. The heading keeps its full text as an aria-label,
 * and under reduced motion the words simply fade. The hidden state is only applied after
 * hydration (data-armed), so without JavaScript the text is just visible.
 */
export function RevealHeading({ id, className, lines }: { id?: string; className?: string; lines: readonly Line[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    el.setAttribute("data-armed", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.setAttribute("data-in", "");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    // Fail-safe: never leave a heading hidden if the observer never fires.
    const safety = window.setTimeout(() => el.setAttribute("data-in", ""), 6000);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  let word = 0;
  return (
    <h2 ref={ref} id={id} className={className} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className={`block ${line.className ?? ""}`}>
          {line.text.split(" ").map((w, i) => (
            <span key={`${w}-${i}`}>
              {i > 0 ? " " : null}
              <span className="rw-word">
                <span style={{ "--w": word++ } as CSSProperties}>{w}</span>
              </span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
