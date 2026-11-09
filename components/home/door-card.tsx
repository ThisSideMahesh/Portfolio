"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { PanelDoor } from "@/components/home/panel-door";
import type { OpenDoorData } from "@/lib/data";

const NAVIGATE_MS = 1250;
export const WALK_KEY = "door-walk";

/**
 * An open door. Hover or focus: the other doors fade away, the handle turns, the leaf eases
 * ajar and a panel beside it says what is behind the door (DoorWall). Click: the leaf swings wide,
 * the view zooms into the doorway until the screen is black, and the door's page fades in
 * from that black (WalkIn). Modified clicks and reduced motion navigate normally.
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
    window.setTimeout(() => router.push(door.href), NAVIGATE_MS);
  }

  return (
    <>
      <Link href={door.href} onClick={walkThrough} data-opening={opening || undefined} className="door group block focus-visible:outline-offset-4">
        <PanelDoor variant={door.id} name={door.name} />
        <span aria-hidden="true" className="door-enter">
          Click to enter
        </span>
        <span className="sr-only">{door.name}: {door.tagline}</span>
      </Link>
      {/* Phones have no hover: the name and tagline sit under the door instead of the panel. */}
      <p aria-hidden="true" className="mt-4 text-muted md:hidden">
        {door.tagline}
      </p>

      {/* The room goes dark as the visitor steps through. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[90] bg-band transition-opacity duration-300 ease-[var(--ease-out)] ${
          opening ? "opacity-100 delay-[900ms]" : "opacity-0"
        }`}
      />
    </>
  );
}
