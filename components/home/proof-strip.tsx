/**
 * Proof in one glance, for recruiters who give the page under a minute: four numbers straight
 * from the approved fact sheet (docs/PRD.md §6), each with the line that explains it. Plain
 * type and hairline dividers, no cards, so it reads as part of the page rather than a widget.
 */
const PROOF = [
  { value: "95+", label: "campus recruitment drives led and coordinated" },
  { value: "125+", label: "qualified admission leads across 5 centres" },
  { value: "25,000+", label: "people reached a month through the T&P cell handle" },
  { value: "1st", label: "place, Cogni-Sphere 2025 HackSphere" },
] as const;

export function ProofStrip() {
  return (
    <section aria-label="Results at a glance" className="wrap">
      <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {PROOF.map((item, i) => (
          <div
            key={item.value}
            className={`py-7 pr-4 md:py-10 md:pr-8 ${i % 2 === 1 ? "border-l border-line pl-5 md:pl-8" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-8" : ""}`}
          >
            <dt className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-semibold tracking-tight">{item.value}</dt>
            <dd className="mt-3 max-w-[24ch] text-sm text-muted">{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
