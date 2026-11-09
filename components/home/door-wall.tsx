import { DoorCard } from "@/components/home/door-card";
import { PanelDoor } from "@/components/home/panel-door";
import { doors, type Door } from "@/lib/data";

/**
 * The four-door wall. Each door is a drawn panel door with its own colour and panel design
 * (PanelDoor). On desktop,
 * hovering or focusing a door fades the others away and shows a panel in the space they
 * leave: on the right for the first two doors, on the left for the last two. Phones get a
 * horizontal scroll-snap row with the tagline under each door.
 */
export function DoorWall() {
  return (
    <section id="doors" aria-labelledby="doors-title" className="py-24 md:py-32">
      <div className="wrap">
        <h2 id="doors-title" className="text-[clamp(2.25rem,5.5vw,4.5rem)]">
          <span className="block">Open a door.</span>
          <span className="block text-muted">Behind it is my work.</span>
        </h2>
      </div>

      <div className="door-stage wrap relative mt-14">
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0">
          {doors.map((door) => (
            <li key={door.id} data-door={door.id} className="w-[64vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none">
              {door.locked ? <LockedDoor door={door} /> : <DoorCard door={door} />}
            </li>
          ))}
        </ul>

        {/* Hover panels (desktop): decorative duplicates of the link text, hidden from screen readers. */}
        {doors.map((door, index) => (
          <div
            key={door.id}
            aria-hidden="true"
            data-for={door.id}
            className={`door-panel pointer-events-none absolute top-1/2 hidden w-[44%] -translate-y-1/2 md:block ${index < 2 ? "right-8" : "left-8"}`}
          >
            <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-semibold tracking-tight">{door.name}</p>
            <p className="mt-3 max-w-[38ch] text-lg text-muted">{door.tagline}</p>
            {door.locked ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm">Locked, for now</p>
            ) : (
              <ul className="mt-5 space-y-2">
                {door.behind.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function LockedDoor({ door }: { door: Extract<Door, { locked: true }> }) {
  return (
    <div aria-disabled="true" tabIndex={0} className="door locked group block cursor-not-allowed rounded-sm focus-visible:outline-offset-4">
      <PanelDoor variant="creator" name={door.name} locked />
      <span className="sr-only">{door.name}: Locked, for now. {door.tagline}</span>
      <p aria-hidden="true" className="mt-4 text-muted md:hidden">
        Locked, for now. {door.tagline}
      </p>
    </div>
  );
}
