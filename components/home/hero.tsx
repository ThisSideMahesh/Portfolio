import Image from "next/image";
import { TypingLine } from "@/components/home/typing-line";
import heroPhoto from "@/public/images/mahesh-hero.jpg";
import { site, taglines } from "@/lib/site";

const lines = [taglines.tech, taglines.teaching, taglines.management];

export function Hero() {
  return (
    <section className="wrap grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
      <div>
        <p className="text-sm text-muted">Final-year B.Tech CSE, MIT Chhatrapati Sambhajinagar</p>
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
          <a href={`mailto:${site.email}`} className="pill pill-solid">
            Email me
            <span className="pill-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </a>
          <a href="#doors" className="pill pill-ghost">
            See my work
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
        <Image
          src={heroPhoto}
          alt="Mahesh Namdev Khandebharad smiling in a black hoodie and glasses, outdoors at night beside lit plants."
          priority
          sizes="(min-width: 768px) 40vw, 90vw"
          className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
        />
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
