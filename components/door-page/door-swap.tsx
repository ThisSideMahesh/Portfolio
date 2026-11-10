"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WALK_KEY } from "@/components/home/door-card";
import { PanelDoor } from "@/components/home/panel-door";
import { doors } from "@/lib/data";

const DOOR_PATHS: readonly string[] = doors.flatMap((door) => (door.locked ? [] : [door.href]));
const idOf = (path: string) => path.slice(1);

/**
 * Timeline in ms from the click. The door page then fades in with WalkIn.
 * From a door page: step back out of the doorway you are in, close that door, open the next one,
 * walk into it. From the home page the hallway is already there, so it goes straight to opening.
 */
const FROM_DOOR = {
  unfreeze: 60, // transitions back on after the zoomed-in first frame
  zoomOut: 200, // step back into the hallway (700 ms)
  close: 950, // the current door swings shut (520 ms)
  open: 1500, // the next door's handle turns and it swings open (560 ms)
  zoomIn: 2150, // walk into the new doorway (800 ms)
  veil: 2700, // page colour comes up (250 ms)
  navigate: 2950,
} as const;
const FROM_HOME = {
  unfreeze: 60,
  zoomOut: 60,
  close: 60,
  open: 350,
  zoomIn: 1000,
  veil: 1550,
  navigate: 1800,
} as const;
const FALLBACK_MS = 7000; // if the page still has not changed this long after navigating, load it directly (a cold route in development can take several seconds)

type Swap = { from: string; to: string };

/**
 * Door-to-door walk: on the home page or a door page, following a link to a door page (top nav,
 * phone menu, footer) does not just swap the page. The hallway appears zoomed into the doorway you are
 * standing in, the view steps back, that door closes, the next one opens and the view walks
 * into it; then the new page fades in (WalkIn). Reduced motion and modified clicks navigate
 * normally.
 *
 * The click is caught on the document in the capture phase, so calling preventDefault() there
 * stops next/link's own navigation. Timers (not requestAnimationFrame, which pauses in
 * background windows) drive the sequence, and a fallback loads the page directly if needed.
 */
export function DoorSwap() {
  const router = useRouter();
  const pathname = usePathname();
  const [swap, setSwap] = useState<Swap | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);
  const active = swap !== null && swap.from === pathname;
  const activeRef = useRef(active);

  // Any page change ends the walk (the overlay hands over to the new page's WalkIn).
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setSwap(null);
  }

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      const from = window.location.pathname;
      // A walk is in progress: a second door link (reachable by keyboard) must not cut it off.
      if (activeRef.current) {
        if (DOOR_PATHS.includes(url.pathname) && url.origin === window.location.origin) event.preventDefault();
        return;
      }
      if (url.origin !== window.location.origin || url.hash) return;
      if (anchor.classList.contains("door")) return; // the home doors have their own walk-through (DoorCard)
      if ((from !== "/" && !DOOR_PATHS.includes(from)) || !DOOR_PATHS.includes(url.pathname) || url.pathname === from) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      router.prefetch(url.pathname);
      setSwap({ from, to: url.pathname });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return active ? <SwapOverlay key={`${swap.from}>${swap.to}`} from={swap.from} to={swap.to} /> : null;
}

function SwapOverlay({ from, to }: Swap) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fromHome = from === "/";
  const fromId = fromHome ? "" : idOf(from);
  const toId = idOf(to);
  const T = fromHome ? FROM_HOME : FROM_DOOR;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    // Measure both doorways before anything is transformed. Each zoom is a pure scale about the
    // door's own centre, never a pan: the doorway grows in place until it fills the screen, so the
    // view goes straight into the door instead of sliding sideways across the hallway to it.
    // Reset first: in development React runs effects twice, and a second run would otherwise measure
    // a stage the first run had already zoomed.
    stage.style.transform = "none";
    stage.style.transformOrigin = "50% 50%";
    const stageBox = stage.getBoundingClientRect();
    type Zoom = { origin: string; transform: string };
    const NONE: Zoom = { origin: "50% 50%", transform: "none" };
    const zoomInto = (id: string): Zoom => {
      const opening = root.querySelector(`[data-swap-door="${id}"] .pdoor-opening`);
      if (!opening) return NONE;
      const box = opening.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      // Smallest scale at which the doorway covers all four screen edges.
      const scale =
        Math.max((2 * cx) / box.width, (2 * (window.innerWidth - cx)) / box.width, (2 * cy) / box.height, (2 * (window.innerHeight - cy)) / box.height) * 1.06;
      return { origin: `${cx - stageBox.left}px ${cy - stageBox.top}px`, transform: `scale(${scale})` };
    };
    const fromZoom = zoomInto(fromId);
    const toZoom = zoomInto(toId);
    const apply = (zoom: Zoom) => {
      stage.style.transformOrigin = zoom.origin;
      stage.style.transform = zoom.transform;
    };
    const leaf = (id: string, state: "open" | "shut") =>
      root.querySelector(`[data-swap-door="${id}"]`)?.setAttribute("data-leaf", state);

    if (!fromHome) apply(fromZoom); // first frame: still inside the current doorway

    const timers = [
      window.setTimeout(() => root.classList.remove("is-instant"), T.unfreeze),
      window.setTimeout(() => {
        root.dataset.veil = "off";
        stage.style.transform = "none"; // steps back out about the same point it went in
      }, T.zoomOut),
      window.setTimeout(() => leaf(fromId, "shut"), T.close),
      window.setTimeout(() => leaf(toId, "open"), T.open),
      window.setTimeout(() => apply(toZoom), T.zoomIn), // the origin moves while the stage is at scale 1, so nothing slides
      window.setTimeout(() => {
        root.dataset.veil = "on";
      }, T.veil),
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(WALK_KEY, "1");
        } catch {
          // Without storage the next page simply appears without the fade.
        }
        router.push(to);
      }, T.navigate),
      window.setTimeout(() => {
        if (window.location.pathname !== to) window.location.assign(to);
      }, T.navigate + FALLBACK_MS),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [fromHome, fromId, toId, to, router, T]);

  return (
    <div ref={rootRef} aria-hidden="true" data-veil={fromHome ? "off" : "on"} className="door-swap door-room is-instant fixed inset-0 z-[95] flex items-center overflow-hidden">
      <div ref={stageRef} className="door-swap-stage mx-auto w-full px-4">
        <ul className="grid grid-cols-4 gap-3 md:gap-8">
          {doors.map((door) => (
            <li key={door.id} className="relative pt-10 md:pt-14">
              <span className="door-light">
                <span className="door-light-fixture" />
                <span className="door-light-cone" />
              </span>
              <span className="swap-door relative block" data-swap-door={door.id} data-leaf={door.id === fromId ? "open" : "shut"}>
                <PanelDoor variant={door.id} name={door.name} locked={door.locked} />
              </span>
            </li>
          ))}
        </ul>
        <div className="door-floor" />
      </div>
      <div className="door-swap-veil pointer-events-none absolute inset-0 bg-[var(--light)]" />
    </div>
  );
}
