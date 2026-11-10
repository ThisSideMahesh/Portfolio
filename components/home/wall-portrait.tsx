import Image from "next/image";

/**
 * A framed portrait hung on the hallway wall above the doors, lit by its own picture light (the
 * same warm light as the spotlights over the doors). Wood frame, cream mat, a wire from a nail.
 * Purely decorative to the doors, so it has no motion; the picture has a descriptive alt.
 */
export function WallPortrait() {
  return (
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
            alt="Framed painting of a bearded man in an orange turban with a white feather, a maroon embroidered robe and pearl necklaces, standing at an arched window at sunset"
            sizes="(min-width: 768px) 240px, 180px"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </figure>
  );
}
