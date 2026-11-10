import { RevealHeading } from "@/components/ui/reveal-heading";
import { StoryLine } from "@/components/home/story-line";
import { StoryYearMarker } from "@/components/home/story-year";
import { story } from "@/lib/data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/**
 * Month of an entry, from its date text. Where a range crosses a year ("Nov 2024 – Jan 2025"),
 * the month in the entry's own year wins, so the month never disagrees with the year beside it.
 * Falls back to the last month named; -1 if there is none.
 */
function monthOf(when: string, year: number) {
  const dated = [...when.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})\b/g)];
  const inYear = dated.filter((m) => Number(m[2]) === year).at(-1);
  const any = inYear ?? [...when.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g)].at(-1);
  return any ? MONTHS.indexOf(any[1] as (typeof MONTHS)[number]) : -1;
}

/** "My story" timeline: a sticky year and month on the left that follow the entries on the right. */
export function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="border-t border-line bg-[radial-gradient(60%_45%_at_0%_0%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent)] py-24 md:py-32"
    >
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <RevealHeading
            id="story-title"
            className="text-[clamp(2.25rem,5vw,4rem)]"
            lines={[{ text: "My story." }, { text: "Newest first.", className: "text-muted" }]}
          />
          <StoryYearMarker years={story.map((y) => y.year)} />
        </div>

        <div className="relative">
          <StoryLine />
          <ol>
          {story.map((year) => (
            <li key={year.year} data-story-year={year.year} className="pb-6">
              <p className="mb-6 pl-6 font-display text-xl font-semibold md:hidden">
                {year.year}
              </p>
              <ul className="space-y-10">
                {year.entries.map((entry) => (
                  <li key={entry.title} data-story-month={monthOf(entry.when, year.year)} className="relative pl-6 md:pl-10">
                    <span aria-hidden="true" data-story-dot className="story-dot absolute top-2 -left-[5px] size-[9px] rounded-full" />
                    <p className="text-sm font-medium text-muted tabular-nums">{entry.when}</p>
                    <h3 className="mt-1 text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight">{entry.title}</h3>
                    <p className="mt-1 font-medium text-muted">{entry.place}</p>
                    <p className="mt-3 max-w-[60ch]">{entry.detail}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
