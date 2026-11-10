"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { WALK_KEY } from "@/components/home/door-card";
import { PanelDoor } from "@/components/home/panel-door";
import { doors } from "@/lib/data";

const DOOR_PATHS: readonly string[] = doors.flatMap((door) =>
  door.locked ? [] : [door.href],
);
const idOf = (path: string) => path.slice(1);

/**
 * Timeline in ms from the click. The door page then fades in with WalkIn.
 * From a door page: step back out of the doorway you are in, close that door, open the next one,
 * walk into it. From the home page the hallway is already there, so it goes straight to opening.
 */
const FROM_DOOR = {
  unfreeze: 40, // transitions back on after the first frame
  stepBack: 60, // the light shrinks from the whole screen to the current doorway (520 ms)
  hideLight: 640, // the doorway shows its own light again (120 ms)
  close: 680, // the current door swings shut (400 ms)
  open: 900, // the next door's handle turns and it swings open (400 ms)
  goIn: 1250, // the light grows from the new doorway to the whole screen (550 ms)
  navigate: 1850,
} as const;
const FROM_HOME = {
  unfreeze: 40,
  stepBack: 40,
  hideLight: 40,
  close: 40,
  open: 150,
  goIn: 550,
  navigate: 1150,
} as const;
// From a door page back to the home page: step back out of the doorway, close the door, then the
// overlay fades to reveal the home page (which is the hallway itself).
const TO_HOME = {
  unfreeze: 40,
  stepBack: 60, // the light shrinks from the whole screen to the current doorway (520 ms)
  hideLight: 640, // the doorway shows its own light again (120 ms)
  close: 680, // the door swings shut (400 ms)
  navigate: 1150,
  fade: 1350, // earliest the hallway may fade away (350 ms); it also waits until the home hero is on screen
} as const;
const FADE_MS = 350;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
const FALLBACK_MS = 7000; // if the page still has not changed this long after navigating, load it directly (a cold route in development can take several seconds)

type Swap = { from: string; to: string; hash: string };

/**
 * Door walks: on the home page or a door page, following a link to a door page (top nav,
 * phone menu, footer) does not just swap the page. Going back to the home page from a door page
 * (Home, the logo, My story, Contact, Back to the doors) walks out: step back, the door closes,
 * the hallway fades to the home page. The hallway appears zoomed into the doorway you are
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
  const walkingOut = swap !== null && swap.to === "/";
  // A walk to a door ends when the page changes (the overlay hands over to the new page's WalkIn).
  // A walk out to the home page stays up over the new page until its own fade has finished.
  const active =
    swap !== null &&
    (swap.from === pathname || (walkingOut && pathname === "/"));
  const activeRef = useRef(active);
  const clear = useCallback(() => setSwap(null), []);

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (!walkingOut) setSwap(null);
  }

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href);
      const from = window.location.pathname;
      // A walk is in progress: a second door link (reachable by keyboard) must not cut it off.
      if (activeRef.current) {
        if (
          (DOOR_PATHS.includes(url.pathname) || url.pathname === "/") &&
          url.origin === window.location.origin
        )
          event.preventDefault();
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (anchor.classList.contains("door")) return; // the home doors have their own walk-through (DoorCard)
      const fromDoor = DOOR_PATHS.includes(from);
      const out = fromDoor && url.pathname === "/"; // back to the home page, optionally to a section (#doors, #story, #contact)
      const toDoor =
        DOOR_PATHS.includes(url.pathname) &&
        !url.hash &&
        (from === "/" || fromDoor) &&
        url.pathname !== from;
      if (!out && !toDoor) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      router.prefetch(url.pathname);
      setSwap({ from, to: url.pathname, hash: out ? url.hash : "" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return active ? (
    <SwapOverlay
      key={`${swap.from}>${swap.to}`}
      from={swap.from}
      to={swap.to}
      hash={swap.hash}
      clear={clear}
    />
  ) : null;
}

function SwapOverlay({ from, to, hash, clear }: Swap & { clear: () => void }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const fromHome = from === "/";
  const fromId = fromHome ? "" : idOf(from);
  const out = to === "/";
  const toId = out ? "" : idOf(to);
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
    const box = (id: string) =>
      root
        .querySelector(`[data-swap-door="${id}"] .pdoor-opening`)
        ?.getBoundingClientRect();
    const coverScale = (b: DOMRect) => {
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      const W = window.innerWidth;
      const H = window.innerHeight;
      return (
        Math.max(
          (2 * cx) / b.width,
          (2 * (W - cx)) / b.width,
          (2 * cy) / b.height,
          (2 * (H - cy)) / b.height,
        ) * 1.06
      );
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
    const animate = (
      prop: "transform" | "opacity",
      value: string,
      ms: number,
    ) => {
      light.style.transition = `${prop} ${ms}ms ${prop === "transform" ? EASE : "ease-out"}`;
      light.style[prop] = value;
    };
    const leaf = (id: string, state: "open" | "shut") =>
      root
        .querySelector(`[data-swap-door="${id}"]`)
        ?.setAttribute("data-leaf", state);

    // Measure with nothing transformed (in development React runs effects twice).
    stage.style.transform = "none";
    const fromBox = fromHome ? undefined : box(fromId);
    const toBox = out ? undefined : box(toId);
    if (fromBox)
      place(fromBox, coverScale(fromBox), 1); // first frame: standing in the doorway you came through
    else place(toBox, 1, 0);

    const dest = out ? `/${hash}` : to;
    const go = () => {
      if (!out) {
        try {
          sessionStorage.setItem(WALK_KEY, "1");
        } catch {
          // Without storage the next page simply appears without the fade.
        }
      }
      router.push(dest);
      // The home page stays mounted and remembers where it was scrolled; Home and the logo mean the top.
      if (out && !hash) {
        window.setTimeout(
          () => window.scrollTo({ top: 0, behavior: "instant" }),
          120,
        );
        window.setTimeout(
          () => window.scrollTo({ top: 0, behavior: "instant" }),
          400,
        );
      }
    };
    const fallback = (ms: number) =>
      window.setTimeout(() => {
        if (window.location.pathname !== (out ? "/" : to))
          window.location.assign(dest);
      }, ms + FALLBACK_MS);

    const startedAt = performance.now();
    let poll = 0;
    let fading = false;
    // The hallway fades only once the home page is really showing: its hero entrance (a rise) starts
    // when the page is shown, so a fixed timer could fade the hallway first and leave an empty page.
    const fade = () => {
      if (fading) return;
      fading = true;
      window.clearInterval(poll);
      root.style.transition = `opacity ${FADE_MS}ms ease-out`;
      root.style.opacity = "0";
      timers.push(window.setTimeout(clear, FADE_MS + 100));
    };
    const timers: number[] = [];
    const startPolling = () => {
      poll = window.setInterval(() => {
        const heroShown =
          window.location.pathname === "/" &&
          (document.querySelector(".hero-portrait")?.getClientRects().length ??
            0) > 0;
        if (heroShown && performance.now() - startedAt >= TO_HOME.fade) fade();
      }, 50);
    };

    timers.push(
      ...(out
        ? [
            window.setTimeout(
              () => root.classList.remove("is-instant"),
              TO_HOME.unfreeze,
            ),
            window.setTimeout(
              () => fromBox && animate("transform", "scale(1)", 520),
              TO_HOME.stepBack,
            ),
            window.setTimeout(
              () => fromBox && animate("opacity", "0", 120),
              TO_HOME.hideLight,
            ),
            window.setTimeout(() => leaf(fromId, "shut"), TO_HOME.close),
            window.setTimeout(go, TO_HOME.navigate),
            window.setTimeout(startPolling, TO_HOME.navigate),
            window.setTimeout(fade, TO_HOME.navigate + 4000), // never leave the hallway up if something is slow
            fallback(TO_HOME.navigate),
          ]
        : [
            window.setTimeout(
              () => root.classList.remove("is-instant"),
              T.unfreeze,
            ),
            window.setTimeout(
              () => fromBox && animate("transform", "scale(1)", 520),
              T.stepBack,
            ),
            window.setTimeout(
              () => fromBox && animate("opacity", "0", 120),
              T.hideLight,
            ),
            window.setTimeout(() => leaf(fromId, "shut"), T.close),
            window.setTimeout(() => leaf(toId, "open"), T.open),
            window.setTimeout(() => {
              if (!toBox) return;
              place(toBox, 1, 1);
              animate("transform", `scale(${coverScale(toBox)})`, 550);
            }, T.goIn),
            window.setTimeout(go, T.navigate),
            fallback(T.navigate),
          ]),
    );
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(poll);
    };
  }, [fromHome, fromId, toId, to, hash, out, router, clear, T]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="door-swap door-room is-instant fixed inset-0 z-[95] flex items-center overflow-hidden"
    >
      <div ref={stageRef} className="door-swap-stage mx-auto w-full px-4">
        <ul className="grid grid-cols-4 gap-3 md:gap-8">
          {doors.map((door) => (
            <li key={door.id} className="relative pt-10 md:pt-14">
              <span className="door-light">
                <span className="door-light-fixture" />
                <span className="door-light-cone" />
              </span>
              <span
                className="swap-door relative block"
                data-swap-door={door.id}
                data-leaf={door.id === fromId ? "open" : "shut"}
              >
                <PanelDoor
                  variant={door.id}
                  name={door.name}
                  locked={door.locked}
                  tape={false}
                />
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
