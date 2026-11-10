import type { ReactNode } from "react";

export type DoorVariant = "tech" | "teaching" | "management" | "creator";

/**
 * A modern single-leaf panel door, drawn in CSS + inline SVG (no photo), after the style
 * Mahesh chose: casing and skirting, flat leaf with stepped mouldings, a raised panel with a
 * thin brass inlay, a brass lever handle on the left and brass hinges on the right.
 * Each profession gets its own colour and its own panel design (see MOTIFS).
 * The leaf hinges on its right edge over a dark doorway (CSS: .pdoor / .pdoor-leaf).
 * Details: crown moulding on the casing, lacquer sheen, brass kick plate and threshold, and a
 * soft contact shadow on the floor. The locked Creator door wears two strips of caution tape.
 */
export function PanelDoor({ variant, name, locked = false }: { variant: DoorVariant; name: string; locked?: boolean }) {
  return (
    <span className={`pdoor relative block aspect-[10/21] ${locked ? "is-locked" : ""}`} data-variant={variant}>
      <span aria-hidden="true" className="pdoor-casing" />
      <span aria-hidden="true" className="pdoor-opening">
        <span className="pdoor-doorway" />
        <span className="pdoor-leaf">
          <span className="pdoor-moulding" />
          <span className="pdoor-panel">{MOTIFS[variant]}</span>
          <span className="pdoor-plate">{name}</span>
          <span className="pdoor-handle">
            <span className="pdoor-rose" />
            <span className="pdoor-lever" />
            <span className="pdoor-keyhole" />
          </span>
          <span className="pdoor-hinge" style={{ top: "9%" }} />
          <span className="pdoor-hinge" style={{ top: "47%" }} />
          <span className="pdoor-hinge" style={{ top: "86%" }} />
          <span className="pdoor-kickplate" />
        </span>
        <span className="pdoor-threshold" />
      </span>
      {locked ? (
        <svg viewBox="0 0 24 30" aria-hidden="true" className="pdoor-padlock">
          <path d="M7 13V8.5a5 5 0 0 1 10 0V13" fill="none" stroke="#8a6a2b" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="3" y="12.5" width="18" height="15" rx="2.5" fill="url(#pd-brass)" stroke="#8a6a2b" strokeWidth="0.8" />
          <circle cx="12" cy="19" r="1.8" fill="#3a2a12" />
          <rect x="11.2" y="19.5" width="1.6" height="4" rx="0.8" fill="#3a2a12" />
        </svg>
      ) : null}
      {locked ? (
        <>
          <span aria-hidden="true" className="pdoor-tape" style={{ top: "30%", rotate: "-17deg" }}>
            <span>UNDER CONSTRUCTION • DO NOT ENTER • UNDER CONSTRUCTION • DO NOT ENTER •</span>
          </span>
          <span aria-hidden="true" className="pdoor-tape" style={{ top: "58%", rotate: "13deg" }}>
            <span>DO NOT ENTER • UNDER CONSTRUCTION • DO NOT ENTER • UNDER CONSTRUCTION •</span>
          </span>
        </>
      ) : null}
      <span aria-hidden="true" className="pdoor-skirting" />
      <span aria-hidden="true" className="pdoor-shadow" />
    </span>
  );
}

/** Shared brass gradient for every inlay (defined once per SVG; ids are scoped by variant). */
function Brass({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f2d58a" />
        <stop offset="0.5" stopColor="#c9993c" />
        <stop offset="1" stopColor="#a47a2a" />
      </linearGradient>
    </defs>
  );
}

const svgProps = { viewBox: "0 0 100 220", preserveAspectRatio: "xMidYMid meet", className: "h-full w-full" } as const;

const MOTIFS: Record<DoorVariant, ReactNode> = {
  // Tech: brass inlay traced like a circuit board, with solder nodes and a chip.
  tech: (
    <svg {...svgProps}>
      <Brass id="b-tech" />
      <g fill="none" stroke="url(#b-tech)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="88" height="208" rx="1" />
        <path d="M6 58 H32 V96 H58" />
        <path d="M94 128 H70 V160 H44 V188" />
        <path d="M50 6 V34 H72" />
        <rect x="56" y="88" width="22" height="16" rx="1.5" />
        <path d="M60 88 V82 M67 88 V82 M74 88 V82 M60 104 V110 M67 104 V110 M74 104 V110" />
      </g>
      <g fill="url(#b-tech)">
        <circle cx="72" cy="34" r="2.6" />
        <circle cx="44" cy="188" r="2.6" />
        <circle cx="32" cy="58" r="2" />
        <circle cx="70" cy="128" r="2" />
      </g>
    </svg>
  ),
  // Teaching: the panel is a blackboard with chalk lines, on a wooden chalk ledge.
  teaching: (
    <svg {...svgProps}>
      <Brass id="b-teach" />
      <rect x="6" y="6" width="88" height="196" rx="1.5" fill="#1d2a24" stroke="url(#b-teach)" strokeWidth="1.6" />
      <g fill="none" stroke="#e8eee9" strokeOpacity="0.72" strokeLinecap="round" strokeWidth="1.3">
        <path d="M18 40 C28 34 36 46 46 40 S62 34 70 40" />
        <path d="M18 62 H76" />
        <path d="M18 76 H62" />
        <path d="M18 90 H70" />
        <path d="M24 140 L36 124 L48 140 M28.5 134 H43.5" />
        <path d="M58 132 H74 M66 124 V140" />
      </g>
      <rect x="2" y="202" width="96" height="9" rx="1.5" fill="#7b5a36" />
      <rect x="2" y="202" width="96" height="2.5" fill="#9b7650" />
      <rect x="62" y="198.5" width="16" height="4" rx="2" fill="#f4f1ea" />
    </svg>
  ),
  // Management: two stacked panels; the top one carries a brass org chart.
  management: (
    <svg {...svgProps}>
      <Brass id="b-mgmt" />
      <g fill="none" stroke="url(#b-mgmt)" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="6" y="6" width="88" height="84" rx="1" />
        <rect x="6" y="100" width="88" height="114" rx="1" />
        <rect x="14" y="108" width="72" height="98" rx="1" strokeOpacity="0.55" />
        <path d="M50 34 V48 M24 48 H76 M24 48 V58 M50 48 V58 M76 48 V58" />
      </g>
      <g fill="url(#b-mgmt)">
        <rect x="42" y="22" width="16" height="12" rx="2" />
        <rect x="16" y="58" width="16" height="12" rx="2" />
        <rect x="42" y="58" width="16" height="12" rx="2" />
        <rect x="68" y="58" width="16" height="12" rx="2" />
      </g>
    </svg>
  ),
  // Creator: a brass ring with a play mark, for the channel still behind a locked door.
  creator: (
    <svg {...svgProps}>
      <Brass id="b-creator" />
      <rect x="6" y="6" width="88" height="208" rx="1" fill="none" stroke="url(#b-creator)" strokeWidth="1.6" />
      <circle cx="50" cy="96" r="24" fill="none" stroke="url(#b-creator)" strokeWidth="1.8" />
      <path d="M44 84 L62 96 L44 108 Z" fill="url(#b-creator)" />
      <path d="M26 150 H74 M32 162 H68" stroke="url(#b-creator)" strokeWidth="1.2" strokeOpacity="0.6" />
      <defs>
        <linearGradient id="pd-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d488" />
          <stop offset="0.55" stopColor="#c99a3f" />
          <stop offset="1" stopColor="#9a7428" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
