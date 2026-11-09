import Link from "next/link";
import { doors, type Door } from "@/lib/data";

/**
 * The four-door wall (DESIGN.md §4). Doors are drawn here in CSS: a recessed two-panel door
 * with a name plate and a round knob that turns orange on hover and focus.
 * Phones get a horizontal scroll-snap row; desktop shows all four.
 */
export function DoorWall() {
  return (
    <section id="doors" aria-labelledby="doors-title" className="py-24 md:py-32">
      <div className="wrap">
        <h2 id="doors-title" className="text-[clamp(2.25rem,5.5vw,4.5rem)]">
          <span className="block">Pick a door.</span>
          <span className="block text-muted">Each one is a side of my work.</span>
        </h2>
      </div>

      <ul className="wrap mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
        {doors.map((door) => (
          <li key={door.id} className="w-[72vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
            {door.locked ? <LockedDoor door={door} /> : <OpenDoor door={door} />}
          </li>
        ))}
      </ul>
    </section>
  );
}

function OpenDoor({ door }: { door: Extract<Door, { locked: false }> }) {
  return (
    <Link href={door.href} className="group block rounded-[4px] focus-visible:outline-offset-4">
      <DoorShape name={door.name} />
      <h3 className="mt-5 text-2xl underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-accent group-focus-visible:decoration-accent">
        {door.name}
      </h3>
      <p className="mt-2 text-muted">{door.tagline}</p>
    </Link>
  );
}

function LockedDoor({ door }: { door: Extract<Door, { locked: true }> }) {
  return (
    <div aria-disabled="true" className="cursor-default">
      <DoorShape name={door.name} locked />
      <h3 className="mt-5 text-2xl">
        {door.name}
        <span className="ml-3 align-middle text-sm font-normal text-muted">Locked, for now</span>
      </h3>
      <p className="mt-2 text-muted">{door.tagline}</p>
    </div>
  );
}

function DoorShape({ name, locked = false }: { name: string; locked?: boolean }) {
  return (
    <div
      className={`relative aspect-[3/5] rounded-t-[6px] border border-line p-[11%] transition-transform duration-200 ${
        locked ? "bg-line/60" : "bg-surface group-hover:-translate-y-0.5"
      }`}
    >
      <div className="flex h-full flex-col gap-[9%]">
        <div className="h-[40%] rounded-[3px] border border-line" />
        <div className="flex-1 rounded-[3px] border border-line" />
      </div>

      <span className="absolute top-[7%] left-1/2 -translate-x-1/2 rounded-[3px] border border-line bg-bg px-3 py-1 text-xs font-medium tracking-wide">
        {name}
      </span>

      {locked ? (
        <svg
          viewBox="0 0 24 28"
          aria-hidden="true"
          className="absolute top-[52%] right-[9%] h-7 w-6 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M7 12V8a5 5 0 0 1 10 0v4" strokeLinecap="round" />
          <rect x="3.5" y="12" width="17" height="13" rx="2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18" r="1.6" fill="var(--bg)" stroke="none" />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="absolute top-[55%] right-[10%] size-3.5 rounded-full bg-muted transition-colors group-hover:bg-accent group-focus-visible:bg-accent"
        />
      )}

      <span aria-hidden="true" className="absolute inset-x-[-6%] -bottom-px h-1 rounded-full bg-ink/80" />
    </div>
  );
}
