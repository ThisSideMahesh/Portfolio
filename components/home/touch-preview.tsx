"use client";

import { useEffect, useRef } from "react";

/**
 * Touch screens have no hover, so a phone or tablet would never see what a laptop sees when the
 * pointer rests on a door: the other doors fading, the leaf easing ajar and the panel that says what
 * is behind it. This gives touch the same moment: the first tap on a door previews it (the same CSS as
 * hover, switched on by [data-preview]), the second tap walks in. Tapping anywhere else puts it back.
 *
 * Mouse and keyboard are left alone (hover and focus already do this), and so is the narrow phone
 * layout (below 768px), which lists the same points under each door instead.
 */
export function TouchPreview() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = marker.current?.closest(".door-stage");
    if (!stage) return;
    let pointer = "mouse";
    const clear = () => stage.querySelectorAll(".door[data-preview]").forEach((door) => door.removeAttribute("data-preview"));
    const onDown = (event: Event) => {
      pointer = (event as PointerEvent).pointerType || "mouse";
    };
    const onClick = (event: Event) => {
      const click = event as MouseEvent;
      if (pointer === "mouse" || click.detail === 0) return; // laptop pointer, or Enter on the keyboard
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const door = (click.target as Element | null)?.closest(".door");
      if (!door || door.hasAttribute("data-opening") || door.hasAttribute("data-preview")) return; // second tap goes through
      click.preventDefault();
      click.stopPropagation();
      clear();
      door.setAttribute("data-preview", "");
    };
    const onOutside = (event: Event) => {
      if (!(event.target as Element | null)?.closest(".door")) clear();
    };
    stage.addEventListener("pointerdown", onDown, true);
    stage.addEventListener("click", onClick, true);
    document.addEventListener("pointerdown", onOutside, true);
    return () => {
      stage.removeEventListener("pointerdown", onDown, true);
      stage.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerdown", onOutside, true);
      clear();
    };
  }, []);

  return <span ref={marker} aria-hidden="true" hidden />;
}
