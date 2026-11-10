import Link from "next/link";
import { CardCarousel } from "@/components/door-page/card-carousel";
import { WalkIn } from "@/components/door-page/walk-in";
import type {
  CaseStudy,
  CaseVisual,
  DoorPage as DoorPageData,
} from "@/lib/door-pages";

/**
 * A door's page: a huge title, then either case cards that stack as you scroll (CSS sticky, each card
 * slightly lower than the one before) or, for pages with sections (Tech), one swipeable row of
 * cards per section, and a "Back to the doors" pill fixed bottom-left.
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
        // Swipeable rows, one titled row per section: each card is one item, side by side.
        <div className="pb-32">
          {page.sections.map((section) => (
            <CardCarousel key={section.id} title={section.title}>
              {section.cases.map((study) => (
                <CaseCard key={study.title} study={study} heading="h3" />
              ))}
            </CardCarousel>
          ))}
        </div>
      ) : (
        <ol className="wrap pb-32">
          {(page.cases ?? []).map((study, index) => (
            <li key={study.title} className="sticky mb-8 md:mb-16" style={{ top: `calc(5rem + ${index * 1.25}rem)` }}>
              <CaseCard study={study} />
            </li>
          ))}
        </ol>
      )}

      <Link
        href="/#doors"
        className="pill pill-ghost fixed bottom-4 left-4 z-30 bg-bg/95 text-sm backdrop-blur-sm"
      >
        <span aria-hidden="true">←</span> Back to the doors
      </Link>
    </div>
  );
}

function CaseCard({ study, heading: Heading = "h2" }: { study: CaseStudy; heading?: "h2" | "h3" }) {
  return (
    <div className="case-shell">
      <article className="case-core grid grid-cols-[minmax(0,1fr)] gap-10 p-6 md:min-h-[520px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14 md:p-12">
        <div>
          <p className="text-sm font-semibold text-accent-text">
            {study.kicker}
          </p>
          <Heading className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
            {study.title}
          </Heading>
          <p className="mt-2 text-sm font-medium text-muted tabular-nums">
            {study.when}
          </p>
          <p className="mt-6 max-w-[52ch] text-lg">{study.summary}</p>
          <ul className="mt-6 space-y-2">
            {study.points.map((point) => (
              <li key={point} className="flex gap-3 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent"
                />
                {point}
              </li>
            ))}
          </ul>
          {study.links?.length ? (
            <p className="mt-7 flex flex-wrap gap-2">
              {study.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="pill pill-ghost min-h-11 text-sm">
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </p>
          ) : null}
        </div>
        <Visual visual={study.visual} />
      </article>
    </div>
  );
}

function Visual({ visual }: { visual: CaseVisual }) {
  switch (visual.kind) {
    case "stat":
      return (
        <div className="flex aspect-[4/3] flex-col justify-end rounded-[1rem] bg-band p-8 text-band-ink">
          <p className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none font-semibold tracking-tight">
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
              <span className="font-display text-sm text-band-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold">
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
                <p className="font-display text-xl font-semibold">
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
