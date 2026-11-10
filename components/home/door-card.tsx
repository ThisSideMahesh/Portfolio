"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { PanelDoor } from "@/components/home/panel-door";
import type { OpenDoorData } from "@/lib/data";

const NAVIGATE_MS = 1250;
const FALLBACK_MS = 3000; // if the page has not changed this long after navigating, load it directly
export const WALK_KEY = "door-walk";

/**
 * An open door. Hover or focus: the other doors fade away, the handle turns, the leaf eases
 * ajar and a panel beside it says what is behind the door (DoorWall). Click: the leaf swings wide,
 * the view zooms into the doorway, a cover in the page colour comes up, and the door's page fades
 * in (WalkIn). Modified clicks and reduced motion navigate normally.
 *
 * Fail-safe (the "black screen" bug): the route is prefetched on hover/focus so navigation is
 * instant, and if the page still has not changed FALLBACK_MS after navigating, the cover is
 * lifted and the browser loads the page directly. Timers are cleared if the page goes away.
 */
export function DoorCard({ door }: { door: OpenDoorData }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const timers = useRef<number[]>([]);

  // Cache Components keeps the home page mounted (hidden) after navigating away;
  // the cleanup runs when it is hidden, so the door is closed again on the way back.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
      setOpening(false);
    },
    [],
  );

  const prefetch = () => router.prefetch(door.href);

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
    timers.current.push(
      window.setTimeout(() => {
        router.push(door.href);
        timers.current.push(
          window.setTimeout(() => {
            if (window.location.pathname !== door.href) {
              setOpening(false);
              window.location.assign(door.href);
            }
          }, FALLBACK_MS),
        );
      }, NAVIGATE_MS),
    );
  }

  return (
    <>
      <Link
        href={door.href}
        onClick={walkThrough}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        data-opening={opening || undefined}
        className="door group block focus-visible:outline-offset-4"
      >
        <PanelDoor variant={door.id} name={door.name} />
        <span aria-hidden="true" className="door-enter">
          Click to enter
        </span>
        <span className="sr-only">{door.name}: {door.tagline}</span>
      </Link>

      {/* A cover in the page colour comes up as the visitor steps through (no black screen). */}
      <span
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[90] bg-bg transition-opacity duration-300 ease-[var(--ease-out)] ${
          opening ? "opacity-100 delay-[900ms]" : "opacity-0"
        }`}
      />
    </>
  );
}
