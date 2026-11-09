import Image from "next/image";
import { TypingLine } from "@/components/home/typing-line";
import heroColour from "@/public/images/mahesh-hero-colour.jpg";
import heroPhoto from "@/public/images/mahesh-hero.jpg";
import { site, taglines } from "@/lib/site";

const lines = [taglines.tech, taglines.teaching, taglines.management];
const alt = "Mahesh Namdev Khandebharad smiling in a black hoodie and glasses, outdoors at night beside lit plants.";

export function Hero() {
  return (
    <section className="wrap relative flex min-h-[calc(100svh-4rem)] flex-col">
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)] items-center gap-10 py-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Final-year B.Tech CSE
          </p>
          <h1 className="mt-5 text-[clamp(2.4rem,7vw,5.25rem)]">
            <span className="block">Hi, I&rsquo;m Mahesh.</span>
            <span className="mt-2 block text-[0.62em] leading-tight text-muted [font-variation-settings:'wdth'_112]">
              {site.name}
            </span>
          </h1>
          <div className="mt-8 max-w-[34ch]">
            <TypingLine lines={lines} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="pill pill-solid">
              Work with me
              <span className="pill-arrow" aria-hidden="true">
                <Arrow />
              </span>
            </a>
            <a href="#doors" className="pill pill-ghost">
              See my work
            </a>
          </div>
        </div>

        {/* Black and white by default; the colour photo fades in on hover (same crop, colour-balanced only). */}
        <div className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[1.5rem] md:max-w-none">
          <Image src={heroPhoto} alt={alt} priority sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[4/5] w-full object-cover" />
          <Image
            src={heroColour}
            alt=""
            sizes="(min-width: 768px) 40vw, 90vw"
            className="absolute inset-0 aspect-[4/5] w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </div>
      </div>

      <div className="hidden grid-cols-3 border-t border-line py-4 text-xs text-muted md:grid">
        <span>B.Tech CSE, class of 2027</span>
        <span className="text-center">Jalna, Maharashtra, India</span>
        <a href="#doors" className="justify-self-end hover:text-ink">
          Scroll to explore
        </a>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
