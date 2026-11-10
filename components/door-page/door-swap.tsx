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
  unfreeze: 60, // transitions back on after the first frame
  stepBack: 200, // the light shrinks from the whole screen to the current doorway (800 ms)
  hideLight: 1050, // the doorway shows its own light again (160 ms)
  close: 1150, // the current door swings shut (540 ms)
  open: 1700, // the next door's handle turns and it swings open (540 ms)
  goIn: 2300, // the light grows from the new doorway to the whole screen (800 ms)
  navigate: 3150,
} as const;
const FROM_HOME = {
  unfreeze: 60,
  stepBack: 60,
  hideLight: 60,
  close: 60,
  open: 350,
  goIn: 1000,
  navigate: 1850,
} as const;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
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
  const lightRef = useRef<HTMLDivElement>(null);
  const fromHome = from === "/";
  const fromId = fromHome ? "" : idOf(from);
  const toId = idOf(to);
  const T = fromHome ? FROM_HOME : FROM_DOOR;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const light = lightRef.current;
    if (!root || !stage || !light) return;

    // Going through a door is drawn with a flat patch of warm light, never by scaling the hallway.
    // Scaling the whole hallway about 10x made the browser drop tiles (black patches, half-painted
    // doors, seen in a recording). A flat colour scaled on the GPU has nothing to tile: the patch sits
    // exactly over a doorway and grows to cover the screen (or shrinks back from it), and it is a pure
    // scale about the doorway's own centre, so the view goes straight in and never pans.
    const box = (id: string) => root.querySelector(`[data-swap-door="${id}"] .pdoor-opening`)?.getBoundingClientRect();
    const coverScale = (b: DOMRect) => {
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      const W = window.innerWidth;
      const H = window.innerHeight;
      return Math.max((2 * cx) / b.width, (2 * (W - cx)) / b.width, (2 * cy) / b.height, (2 * (H - cy)) / b.height) * 1.06;
    };
    const place = (b: DOMRect | undefined, scale: number, opacity: number) => {
      if (!b) return;
      light.style.transition = "none";
      light.style.left = `${b.left}px`;
      light.style.top = `${b.top}px`;
      light.style.width = `${b.width}px`;
      light.style.height = `${b.height}px`;
      light.style.transform = `scale(${scale})`;
      light.style.opacity = String(opacity);
      void light.offsetWidth; // commit this state before the next transition starts
    };
    const animate = (prop: "transform" | "opacity", value: string, ms: number) => {
      light.style.transition = `${prop} ${ms}ms ${prop === "transform" ? EASE : "ease-out"}`;
      light.style[prop] = value;
    };
    const leaf = (id: string, state: "open" | "shut") => root.querySelector(`[data-swap-door="${id}"]`)?.setAttribute("data-leaf", state);

    // Measure with nothing transformed (in development React runs effects twice).
    stage.style.transform = "none";
    const fromBox = fromHome ? undefined : box(fromId);
    const toBox = box(toId);
    if (fromBox) place(fromBox, coverScale(fromBox), 1); // first frame: standing in the doorway you came through
    else place(toBox, 1, 0);

    const timers = [
      window.setTimeout(() => root.classList.remove("is-instant"), T.unfreeze),
      window.setTimeout(() => fromBox && animate("transform", "scale(1)", 800), T.stepBack),
      window.setTimeout(() => fromBox && animate("opacity", "0", 160), T.hideLight),
      window.setTimeout(() => leaf(fromId, "shut"), T.close),
      window.setTimeout(() => leaf(toId, "open"), T.open),
      window.setTimeout(() => {
        if (!toBox) return;
        place(toBox, 1, 1);
        animate("transform", `scale(${coverScale(toBox)})`, 800);
      }, T.goIn),
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
    <div ref={rootRef} aria-hidden="true" className="door-swap door-room is-instant fixed inset-0 z-[95] flex items-center overflow-hidden">
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
      <div ref={lightRef} className="swap-light" />
    </div>
  );
}
