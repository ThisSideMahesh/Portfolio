"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import type { OpenDoorData } from "@/lib/data";

const OPEN_MS = 1000;
export const WALK_KEY = "door-walk";

/**
 * An open door. Hover or focus: the leaf eases ajar, the knob turns orange, the other doors
 * dim and the tagline swaps for what is behind the door. Click: the other doors fall away,
 * the leaf swings wide, the view zooms into the dark doorway until the screen is black, and
 * the door's page fades in from that black (see WalkIn). Modified clicks and reduced motion
 * skip the animation and navigate normally.
 */
export function DoorCard({ door }: { door: OpenDoorData }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  // Cache Components keeps the home page mounted (hidden) after navigating away;
  // the cleanup runs when it is hidden, so the door is closed again on the way back.
  useEffect(() => () => setOpening(false), []);

  function walkThrough(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    router.prefetch(door.href);
    setOpening(true);
    try {
      sessionStorage.setItem(WALK_KEY, "1");
    } catch {
      // Without storage the next page simply appears without the fade.
    }
    window.setTimeout(() => router.push(door.href), OPEN_MS);
  }

  return (
    <>
      <Link href={door.href} onClick={walkThrough} data-opening={opening || undefined} className="door group block focus-visible:outline-offset-4">
        <span className="door-frame relative block aspect-[3/5] rounded-t-[6px] bg-band">
          <span className="door-leaf absolute inset-0 rounded-t-[6px] border border-door-line bg-door p-[11%]">
            <span className="flex h-full flex-col gap-[9%]">
              <span className="block h-[40%] rounded-[3px] border border-door-line" />
              <span className="block flex-1 rounded-[3px] border border-door-line" />
            </span>
            <span className="absolute top-[7%] left-1/2 -translate-x-1/2 rounded-[3px] border border-door-line bg-bg px-3 py-1 text-xs font-medium tracking-wide whitespace-nowrap">
              {door.name}
            </span>
            <span
              aria-hidden="true"
              className="absolute top-[55%] right-[10%] size-3.5 rounded-full bg-muted transition-colors group-hover:bg-accent group-focus-visible:bg-accent"
            />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-xs whitespace-nowrap text-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Click to enter
          </span>
          <span aria-hidden="true" className="absolute inset-x-[-6%] -bottom-px h-1 rounded-full bg-ink/80" />
        </span>

        <span className="mt-5 block font-display text-2xl font-semibold tracking-tight">{door.name}</span>
        <span className="mt-2 grid text-muted [&>*]:col-start-1 [&>*]:row-start-1">
          <span className="transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">{door.tagline}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {door.behind.map((item) => (
              <span key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </span>
        </span>
      </Link>

      {/* The room goes dark as the visitor steps through. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[90] bg-band transition-opacity duration-300 ease-[var(--ease-out)] ${
          opening ? "opacity-100 delay-[620ms]" : "opacity-0"
        }`}
      />
    </>
  );
}
