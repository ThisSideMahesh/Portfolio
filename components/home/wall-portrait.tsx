import Image from "next/image";

/**
 * The portrait shrine in the doors section: a framed portrait on the hallway wall, resting on a shelf
 * between two brass diyas, with a quiet tagline under it. The picture is lit by its own picture light.
 *
 * The diyas are unlit in light mode and light up in dark mode. That is pure CSS: the theme tokens set
 * --diya-lit to 0 or 1 (app/globals.css), and the flame, glow and the light on the frame follow it,
 * so the existing theme toggle drives it and nothing here reads the theme in JavaScript. Reduced motion
 * keeps the light but stops the flicker.
 */
export function WallPortrait() {
  return (
    <div className="wall-shrine">
      {/* Shared paint for both diyas (brass) and both flames; drawn once. */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="diya-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0cf80" />
            <stop offset="0.36" stopColor="#c99a42" />
            <stop offset="0.72" stopColor="#8a5f1d" />
            <stop offset="1" stopColor="#573a0f" />
          </linearGradient>
          <linearGradient id="diya-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6dc94" />
            <stop offset="1" stopColor="#b98a35" />
          </linearGradient>
          <linearGradient id="diya-flame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff8a1f" />
            <stop offset="0.55" stopColor="#ffc247" />
            <stop offset="1" stopColor="#fff1b8" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wall-shrine-row">
        <Diya side="left" />

        <figure className="wall-art">
          <svg aria-hidden="true" viewBox="0 0 100 30" preserveAspectRatio="none" className="wall-art-wire">
            <path d="M14 30 L50 3 L86 30" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="3" r="2" fill="currentColor" />
          </svg>
          <div className="wall-art-light" aria-hidden="true">
            <span className="wall-art-lamp" />
            <span className="wall-art-cone" />
          </div>
          <div className="wall-art-frame">
            <div className="wall-art-mat">
              <Image
                src="/images/wall-portrait.webp"
                width={404}
                height={644}
                alt="Framed portrait of Chhatrapati Shivaji Maharaj in an orange turban with a white feather and a maroon embroidered robe, standing at an arched window at sunset"
                sizes="(min-width: 1024px) 240px, 180px"
                className="block h-auto w-full"
              />
            </div>
            <span aria-hidden="true" className="wall-art-spill" />
          </div>
        </figure>

        <Diya side="right" />
        <span aria-hidden="true" className="wall-ledge" />
      </div>

      <p className="wall-tagline">Inspired by history. Driven to build.</p>
    </div>
  );
}

/** A traditional brass diya: shallow bowl, pinched spout with a wick, stem and foot. The left one is the right one mirrored. */
function Diya({ side }: { side: "left" | "right" }) {
  return (
    <span aria-hidden="true" className={`diya diya-${side}`}>
      <span className="diya-glow" />
      <svg viewBox="0 0 100 80" className="diya-body">
        <path d="M33 77 Q50 81 67 77 L64 71 H36 Z" fill="url(#diya-brass)" />
        <path d="M42 72 L44.5 63 H55.5 L58 72 Z" fill="url(#diya-brass)" />
        <path d="M6 36 C8 56 28 66 50 66 C72 66 92 56 94 36 Z" fill="url(#diya-brass)" />
        <path d="M86 33 Q95 31 97 25 Q94 37 88 43 Z" fill="url(#diya-brass)" />
        <ellipse cx="50" cy="36" rx="44" ry="9" fill="url(#diya-rim)" />
        <ellipse cx="50" cy="37" rx="37" ry="6.2" fill="#3b2508" />
        <ellipse cx="43" cy="35.4" rx="14" ry="1.8" fill="#8a6126" opacity="0.55" />
        <path d="M14 45 C30 57 70 57 86 45" fill="none" stroke="#f3da98" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M20 51 C34 60 66 60 80 51" fill="none" stroke="#f3da98" strokeOpacity="0.28" strokeWidth="1" />
        <ellipse cx="50" cy="36" rx="44" ry="9" fill="none" stroke="#fbe9b4" strokeOpacity="0.55" strokeWidth="0.8" />
        <path d="M95.2 26 L97 21" stroke="#2b1c0a" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 20 44" className="diya-flame">
        <path d="M10 0 C13.5 9 20 17 20 29 C20 38 15.5 44 10 44 C4.5 44 0 38 0 29 C0 22 4 17 6 12 C7 16 8.5 17.5 9 17 C9.5 11 9 6 10 0 Z" fill="url(#diya-flame)" />
        <path d="M10 22 C12.4 26 14 29 14 33 C14 38 12.3 41 10 41 C7.7 41 6 38 6 33 C6 29 8 26 10 22 Z" fill="#fff8dc" opacity="0.9" />
      </svg>
    </span>
  );
}
