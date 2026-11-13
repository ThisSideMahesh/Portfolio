import Image from "next/image";
import Link from "next/link";
import { StackItem } from "@/components/door-page/stack-item";
import { WalkIn } from "@/components/door-page/walk-in";
import { DownloadIcon } from "@/components/ui/download-icon";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cv } from "@/lib/site";
import type {
  CaseLink,
  CaseStudy,
  CaseVisual,
  DoorPage as DoorPageData,
} from "@/lib/door-pages";

/**
 * A door's page: a huge title, then case cards that stack as you scroll (CSS sticky, each card slightly
 * lower than the one before). The same stacking is used on all three door pages; Tech, which has many
 * cards, groups them under titled sections with jump links. A "Back to the doors" pill is fixed bottom-left.
 */
export function DoorPage({ page }: { page: DoorPageData }) {
  // One wrapper on purpose: on navigation Next measures the page's top-level elements to decide
  // whether to scroll to the top. Loose fixed children (the walk-in cover, the back pill) always
  // look "on screen", so the new page kept the home page's scroll position. The wrapper's box is
  // the real content, so Next scrolls to the top as it should.
  return (
    <div>
      <WalkIn />
      <section className="wrap pt-16 pb-12 md:pt-24">
        <h1 className="text-[clamp(3rem,10vw,8rem)]">{page.title}</h1>
        <p className="mt-6 max-w-[46ch] text-[clamp(1.15rem,2vw,1.5rem)] text-muted">
          {page.intro}
        </p>
      </section>

      {page.sections ? (
        // Pages with sections (Tech): a jump link row, then one titled stack of cards per section.
        <div className="pb-32">
          <nav aria-label="Sections on this page" className="wrap pb-2">
            <ul className="flex flex-wrap gap-2">
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="pill pill-ghost min-h-11 text-sm">
                    {section.label ?? section.title}
                    <span className="text-muted tabular-nums">{section.cases.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="wrap scroll-mt-16 pt-12 md:pt-16">
              <RevealHeading id={`${section.id}-title`} className="mb-8 text-[clamp(1.75rem,4vw,3rem)] md:mb-10" lines={[{ text: section.title }]} />
              <CardStack cases={section.cases} heading="h3" />
            </section>
          ))}
        </div>
      ) : (
        <div className="wrap pb-32">
          <CardStack cases={page.cases ?? []} heading="h2" />
        </div>
      )}

      {/* Bottom left, on every door page: back to the doors, and the CV one click away. */}
      <div className="fixed bottom-4 left-4 z-30 flex flex-wrap gap-2">
        <Link href="/#doors" className="pill pill-ghost bg-bg/95 text-sm backdrop-blur-sm">
          <span aria-hidden="true">←</span> Back to the doors
        </Link>
        <a href={cv.href} download={cv.filename} className="pill pill-ghost gap-2 bg-bg/95 text-sm backdrop-blur-sm">
          <DownloadIcon size={14} />
          <span>
            CV<span className="sr-only"> download ({cv.note})</span>
          </span>
        </a>
      </div>
    </div>
  );
}

/** Cards that stack as you scroll (see .stack-card in globals.css). The first five sit a step lower than the one before. */
function CardStack({ cases, heading }: { cases: readonly CaseStudy[]; heading: "h2" | "h3" }) {
  return (
    <ol>
      {cases.map((study, index) => (
        <StackItem key={study.title} depth={Math.min(index, 4)}>
          <CaseCard study={study} heading={heading} />
        </StackItem>
      ))}
    </ol>
  );
}

function CaseCard({ study, heading: Heading = "h2" }: { study: CaseStudy; heading?: "h2" | "h3" }) {
  return (
    <div className="case-shell">
      <article className="case-core grid grid-cols-[minmax(0,1fr)] gap-10 p-6 md:min-h-[520px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14 md:p-12">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-brass uppercase">
            {study.kicker}
          </p>
          <Heading className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
            {study.title}
          </Heading>
          <p className="mt-2 font-mono text-xs text-muted tabular-nums">
            {study.when}
          </p>
          <p className="mt-6 max-w-[52ch] text-lg">{study.summary}</p>
          <ul className="mt-6 space-y-2">
            {study.points.map((point) => (
              <li key={point} className="flex gap-3 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.85em] h-px w-3 shrink-0 bg-brass"
                />
                {point}
              </li>
            ))}
          </ul>
          {study.links?.length ? (
            <p className="mt-7 flex flex-wrap gap-2">
              {study.links.map((link) => (
                <LinkPill key={link.href} link={link} />
              ))}
            </p>
          ) : null}
        </div>
        <div className="case-visual">
          <Visual visual={study.visual} />
        </div>
      </article>
    </div>
  );
}

/** Outside link as a pill: a small brand icon for GitHub and LinkedIn, and the text without the repeated "LinkedIn:" prefix (kept for screen readers). */
function LinkPill({ link }: { link: CaseLink }) {
  const host = new URL(link.href).hostname;
  const kind = host.includes("github") ? "github" : host.includes("linkedin") ? "linkedin" : "web";
  const text = kind === "linkedin" ? (link.label === "LinkedIn post" ? "Post" : link.label.replace(/^LinkedIn:\s*/, "")) : link.label;
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="pill pill-ghost min-h-11 gap-2 text-sm">
      {kind === "github" ? <GithubMark /> : kind === "linkedin" ? <LinkedinMark /> : null}
      <span>
        {kind === "linkedin" ? <span className="sr-only">LinkedIn: </span> : null}
        {text}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <span aria-hidden="true" className="text-muted">
        ↗
      </span>
    </a>
  );
}

function GithubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="shrink-0">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="shrink-0 text-[#0a66c2]">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

const imageSizes = "(min-width: 768px) 40vw, 85vw";

function Visual({ visual }: { visual: CaseVisual }) {
  switch (visual.kind) {
    case "screens": {
      const [main, second] = visual.images;
      // The main screenshot fills the panel (cropped to fit, anchored top left so the app's navigation
      // stays visible); a second screenshot sits in the corner like a second window. A lone, very wide
      // picture (a 16:9 slide) is shown whole instead, so cropping never cuts its text.
      const wide = !second && main.width / main.height > 1.5;
      return (
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-band ring-1 ring-line ${wide ? "p-3 md:p-4" : ""}`}>
          <Image
            src={main.src}
            width={main.width}
            height={main.height}
            alt={main.alt}
            sizes={imageSizes}
            className={wide ? "h-full w-full rounded-md object-contain" : `absolute inset-0 h-full w-full object-cover ${second ? "object-left-top" : "object-center"}`}
          />
          {second ? (
            <Image
              src={second.src}
              width={second.width}
              height={second.height}
              alt={second.alt}
              sizes={imageSizes}
              className="absolute right-3 bottom-3 h-auto w-[56%] rounded-md shadow-[0_14px_34px_-10px_rgb(0_0_0/0.75)] ring-1 ring-white/25"
            />
          ) : null}
        </div>
      );
    }
    case "logo":
      return (
        <div className="flex aspect-[4/3] items-center justify-center rounded-[1rem] border border-line bg-[#f6f4f0] p-10">
          <Image
            src={visual.image.src}
            width={visual.image.width}
            height={visual.image.height}
            alt={visual.image.alt}
            sizes={imageSizes}
            className="h-auto max-h-[68%] w-auto max-w-[78%] object-contain"
          />
        </div>
      );
    case "logos":
      return (
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-[1rem] border border-line bg-[#f6f4f0] p-6">
          <ul className="grid w-full max-w-[26rem] grid-cols-2 gap-3">
            {visual.logos.map((logo, i) => (
              <li key={logo.src} className={`flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-[0_1px_0_rgb(0_0_0/0.06)] ${i === visual.logos.length - 1 && visual.logos.length % 2 === 1 ? "col-span-2" : ""}`}>
                <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} sizes="200px" className="h-auto max-h-full w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
          {visual.note ? <p className="text-center font-medium text-[#3b3732]">{visual.note}</p> : null}
        </div>
      );
    case "mark":
      return (
        <div aria-hidden="true" className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[1rem] bg-band p-8 text-band-ink">
          <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(var(--band-line)_1px,transparent_1px),linear-gradient(90deg,var(--band-line)_1px,transparent_1px)] [background-size:34px_34px]" />
          <p className="relative font-head text-[clamp(4.5rem,11vw,8rem)] leading-none font-light tracking-[-0.05em] text-accent">{visual.mark}</p>
          <p className="relative max-w-[24ch] text-lg font-medium text-band-muted">{visual.caption}</p>
        </div>
      );
    case "stat":
      return (
        <div className="flex aspect-[4/3] flex-col justify-end rounded-[1rem] bg-band p-8 text-band-ink">
          <p className="font-head text-[clamp(3.5rem,9vw,7rem)] leading-none font-light tracking-[-0.05em]">
            {visual.value}
          </p>
          <p className="mt-3 text-lg font-medium text-band-muted">
            {visual.label}
          </p>
        </div>
      );
    case "flow":
      return (
        <ol className="flex aspect-[4/3] flex-col justify-center gap-3 rounded-[1rem] bg-band p-8 text-band-ink">
          {visual.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-4">
              <span className="font-mono text-xs text-band-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-head text-[clamp(1.5rem,3vw,2.25rem)] font-medium">
                {step}
              </span>
              {i < visual.steps.length - 1 ? (
                <span aria-hidden="true" className="ml-auto text-accent">
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      );
    case "stack":
      return (
        <ol className="flex aspect-[4/3] flex-col justify-center gap-2 rounded-[1rem] bg-band p-6 text-band-ink md:p-8">
          {visual.layers.map((layer, i) => (
            <li key={layer.name}>
              <div className="rounded-[0.75rem] border border-band-line px-5 py-4">
                <p className="font-head text-xl font-medium">
                  {layer.name}
                </p>
                <p className="text-sm text-band-muted">{layer.detail}</p>
              </div>
              {i < visual.layers.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="mx-auto block h-5 w-px bg-accent"
                />
              ) : null}
            </li>
          ))}
        </ol>
      );
    case "tags":
      return (
        <ul className="flex aspect-[4/3] flex-wrap content-center gap-2 rounded-[1rem] bg-band p-8">
          {visual.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-band-line px-4 py-2 text-band-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      );
  }
}
