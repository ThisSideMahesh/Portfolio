"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { PanelDoor } from "@/components/home/panel-door";
import type { OpenDoorData } from "@/lib/data";

const LIGHT_MS = 760; // the leaf has finished swinging in; the light now grows from the doorway
const GROW_MS = 800;
const NAVIGATE_MS = 1650;
const FALLBACK_MS = 6000; // if the page has not changed this long after navigating, load it directly
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
  const lightRef = useRef<HTMLSpanElement>(null);

  // Cache Components keeps the home page mounted (hidden) after navigating away;
  // the cleanup runs when it is hidden, so the door is closed again on the way back.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
      const light = lightRef.current;
      if (light) {
        light.style.transition = "none";
        light.style.opacity = "0";
        light.style.transform = "none";
      }
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
    // The walk in is a flat patch of warm light placed over the doorway that grows to the whole
    // screen. (Scaling the door's own artwork 6x made the browser drop tiles: black patches.)
    const light = lightRef.current;
    const opening = event.currentTarget.querySelector(".pdoor-opening");
    if (light && opening) {
      const b = opening.getBoundingClientRect();
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      const scale =
        Math.max((2 * cx) / b.width, (2 * (window.innerWidth - cx)) / b.width, (2 * cy) / b.height, (2 * (window.innerHeight - cy)) / b.height) * 1.06;
      light.style.transition = "none";
      light.style.left = `${b.left}px`;
      light.style.top = `${b.top}px`;
      light.style.width = `${b.width}px`;
      light.style.height = `${b.height}px`;
      light.style.transform = "none";
      light.style.opacity = "0";
      timers.current.push(
        window.setTimeout(() => {
          light.style.opacity = "1";
          void light.offsetWidth;
          light.style.transition = `transform ${GROW_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`;
          light.style.transform = `scale(${scale})`;
        }, LIGHT_MS),
      );
    }
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

      {/* The patch of warm light that grows from the doorway to the whole screen (see walkThrough). */}
      <span ref={lightRef} aria-hidden="true" className="swap-light" style={{ position: "fixed", zIndex: 90, opacity: 0 }} />
    </>
  );
}
