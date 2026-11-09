import { site, taglines } from "@/lib/site";

/** Day-1 shell: real approved content only. The full home (loader, hero, doors, story, contact) lands on days 2–3. */
export default function HomePage() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
      <h1 className="font-display text-[clamp(2.25rem,9.5vw,4.75rem)] font-semibold [font-variation-settings:'wdth'_118]">
        {site.name}
      </h1>
      <ul className="mt-8 max-w-[68ch] space-y-2 text-lg text-muted">
        <li>{taglines.tech}</li>
        <li>{taglines.teaching}</li>
        <li>{taglines.management}</li>
      </ul>
    </section>
  );
}
