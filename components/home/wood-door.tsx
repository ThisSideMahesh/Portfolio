import Image from "next/image";
import frame from "@/public/images/door-frame.png";
import leafLeft from "@/public/images/door-leaf-left.png";
import leafRight from "@/public/images/door-leaf-right.png";

/** Leaf box as a % of the frame image (printed by scripts/process-door.mjs). */
const LEAF_BOX = { top: "6.53%", height: "84.65%", left: "16.38%", right: "15.53%" } as const;

/**
 * The carved wooden double door, in three layers: a dark doorway, the hollow frame, and two
 * leaves that each swing on their own hinge (CSS in globals.css: .wood-door / .leaf-l / .leaf-r).
 * A brass name plate sits on the lintel so it stays put when the leaves open.
 */
export function WoodDoor({ name, locked = false, priority = false }: { name: string; locked?: boolean; priority?: boolean }) {
  const sizes = "(min-width: 768px) 22vw, 70vw";
  return (
    <span className={`wood-door relative block aspect-[586/1010] ${locked ? "is-locked" : ""}`}>
      <span aria-hidden="true" className="doorway absolute" style={LEAF_BOX} />
      <Image src={frame} alt="" sizes={sizes} priority={priority} className="absolute inset-0 h-full w-full" />
      <span aria-hidden="true" className="leaves absolute" style={LEAF_BOX}>
        <Image src={leafLeft} alt="" sizes={sizes} className="leaf-l absolute top-0 left-0 h-full w-1/2" />
        <Image src={leafRight} alt="" sizes={sizes} className="leaf-r absolute top-0 left-1/2 h-full w-1/2" />
      </span>
      <span aria-hidden="true" className="door-plate">{name}</span>
      {locked ? (
        <svg viewBox="0 0 24 30" aria-hidden="true" className="door-padlock">
          <path d="M7 13V8.5a5 5 0 0 1 10 0V13" fill="none" stroke="#8a6a2b" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="3" y="12.5" width="18" height="15" rx="2.5" fill="url(#brass)" stroke="#8a6a2b" strokeWidth="0.8" />
          <circle cx="12" cy="19" r="1.8" fill="#3a2a12" />
          <rect x="11.2" y="19.5" width="1.6" height="4" rx="0.8" fill="#3a2a12" />
          <defs>
            <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f0d488" />
              <stop offset="0.55" stopColor="#c99a3f" />
              <stop offset="1" stopColor="#9a7428" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
    </span>
  );
}
