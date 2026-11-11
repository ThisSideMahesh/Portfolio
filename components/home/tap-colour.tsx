"use client";

import { useEffect, useRef } from "react";

/**
 * On a laptop the hero portrait fades from black and white to colour while the pointer is on it. Touch has no
 * hover, so a tap does the same (and a second tap puts it back). Renders nothing: it only switches
 * [data-colour] on the portrait it sits in.
 */
export function TapColour() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = marker.current?.closest(".hero-portrait");
    if (!box) return;
    let pointer = "mouse";
    const onDown = (event: Event) => {
      pointer = (event as PointerEvent).pointerType || "mouse";
    };
    const onClick = () => {
      if (pointer === "mouse") return;
      if (box.hasAttribute("data-colour")) box.removeAttribute("data-colour");
      else box.setAttribute("data-colour", "");
    };
    box.addEventListener("pointerdown", onDown);
    box.addEventListener("click", onClick);
    return () => {
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("click", onClick);
    };
  }, []);

  return <span ref={marker} aria-hidden="true" hidden />;
}
