import Image from "next/image";
import { StoryLine } from "@/components/home/story-line";
import { StoryYearMarker } from "@/components/home/story-year";
import storyPhoto from "@/public/images/mahesh-story-cutout.png";
import { story } from "@/lib/data";

/** "My story" timeline: a sticky year on the left that follows the entries on the right. */
export function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="border-t border-line bg-[radial-gradient(60%_45%_at_0%_0%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent)] py-24 md:py-32"
    >
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 id="story-title" className="text-[clamp(2.25rem,5vw,4rem)]">
            <span className="block">My story.</span>
            <span className="block text-muted">Newest first.</span>
          </h2>
          <StoryYearMarker years={story.map((y) => y.year)} />
          <Image
            src={storyPhoto}
            alt="Mahesh standing with his hands in his pockets, in a black hoodie and grey jeans."
            sizes="(min-width: 768px) 18vw, 60vw"
            className="mt-6 hidden w-[min(100%,220px)] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:block"
          />
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
                  <li key={entry.title} className="relative pl-6 md:pl-10">
                    <span aria-hidden="true" data-story-dot className="story-dot absolute top-2 -left-[5px] size-[9px] rounded-full" />
                    <p className="text-sm text-muted">{entry.when}</p>
                    <h3 className="mt-1 text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight">{entry.title}</h3>
                    <p className="mt-1 text-muted">{entry.place}</p>
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
