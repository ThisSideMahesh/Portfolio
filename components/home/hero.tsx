import Image from "next/image";
import type { CSSProperties } from "react";
import { FlipCalendar } from "@/components/home/flip-calendar";
import { HireMenu } from "@/components/home/hire-menu";
import cutoutColour from "@/public/images/mahesh-cutout-colour.png";
import cutout from "@/public/images/mahesh-cutout.png";
import { heroRoles, site } from "@/lib/site";

const rolesSentence = `${heroRoles.slice(0, -1).join(", ")} and ${heroRoles.at(-1)}`;

export function Hero() {
  return (
    <section className="wrap relative flex min-h-[calc(100svh-4rem)] flex-col">
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)] items-end gap-6 pt-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
        <div className="self-center pb-8 md:pb-16">
          <h1 className="rise text-[clamp(2.6rem,7vw,5.5rem)]">
            Hi, I&rsquo;m Mahesh.
            <span className="sr-only">
              {" "}
              {site.name}: {rolesSentence}.
            </span>
          </h1>
          <p aria-hidden="true" style={{ "--d": 1 } as CSSProperties} className="rise mt-1 font-display text-[clamp(2.2rem,6vw,4.75rem)] leading-none font-semibold tracking-tight text-muted">
            I am a
          </p>
          <div style={{ "--d": 2 } as CSSProperties} className="rise mt-7">
            <FlipCalendar roles={heroRoles} />
          </div>
          <div style={{ "--d": 3 } as CSSProperties} className="rise mt-10 flex flex-wrap gap-3">
            <HireMenu tone="page" />
            <a href="#doors" className="pill pill-ghost">
              See my work
            </a>
          </div>
        </div>

        {/* Background-free portrait standing on the bottom edge; colour fades in on hover. */}
        <div style={{ "--d": 2 } as CSSProperties} className="rise hero-portrait group relative mx-auto w-full max-w-[460px] self-end md:max-w-[540px]">
          <Image
            src={cutout}
            alt="Mahesh Namdev Khandebharad, smiling, wearing glasses, a black hoodie and grey jeans, with his hands in his pockets."
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="relative w-full"
          />
          <Image
            src={cutoutColour}
            alt=""
            sizes="(min-width: 768px) 40vw, 90vw"
            className="absolute inset-0 w-full opacity-0 transition-opacity duration-700 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
          />
        </div>
      </div>

      <div className="flex items-center border-t border-line py-3 text-xs font-bold tracking-[0.12em] text-muted uppercase md:grid md:grid-cols-3 md:py-2">
        <span className="inline-flex items-center gap-2 text-ink">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          Available for work from 10 December 2026
        </span>
        <span className="hidden text-center md:block">Onsite-first</span>
        <span translate="no" className="hidden min-h-11 items-center justify-self-end text-ink md:inline-flex">
          Mahesh Namdev Khandebharad
        </span>
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
