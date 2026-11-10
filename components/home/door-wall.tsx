import type { CSSProperties } from "react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { DoorCard } from "@/components/home/door-card";
import { PanelDoor } from "@/components/home/panel-door";
import { WallPortrait } from "@/components/home/wall-portrait";
import { doors, type Door, type OpenDoorData } from "@/lib/data";

/**
 * The four-door wall, staged as a lit hallway: plaster wall with a ceiling shadow, a spotlight
 * above each door that brightens on hover, a skirting board and a wooden floor the doors stand
 * on. Each door is a drawn panel door with its own colour and panel design (PanelDoor). On desktop,
 * hovering or focusing a door fades the others away and shows a panel in the space they
 * leave: on the right for the first two doors, on the left for the last two. Phones get a
 * horizontal scroll-snap row with the tagline under each door.
 */
export function DoorWall() {
  return (
    <section id="doors" aria-labelledby="doors-title" className="door-room relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-0">
      <div className="wrap grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
        <RevealHeading
          id="doors-title"
          className="text-[clamp(2.25rem,5.5vw,4.5rem)]"
          lines={[{ text: "Step inside." }, { text: "Discover the work behind it.", className: "text-muted" }]}
        />
        <div className="mx-auto md:mx-0 md:justify-self-end md:pr-[2vw]">
          <WallPortrait />
        </div>
      </div>

      <div className="door-stage wrap relative mt-14">
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0">
          {doors.map((door) => (
            <li key={door.id} data-door={door.id} className="relative w-[64vw] max-w-[280px] shrink-0 snap-start pt-14 md:w-auto md:max-w-none">
              <span aria-hidden="true" className="door-light">
                <span className="door-light-fixture" />
                <span className="door-light-cone" />
              </span>
              {door.locked ? <LockedDoor door={door} /> : <DoorCard door={door} />}
              {door.locked ? null : <PhoneOffer door={door} />}
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
            <div className="door-panel-shell">
              <div className="door-panel-core">
                <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-semibold tracking-tight">{door.name}</p>
                {door.locked ? (
                  <>
                    <p className="mt-3 max-w-[38ch] text-muted">{door.tagline}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium">Locked, for now: under construction</p>
                  </>
                ) : (
                  <>
                    <p className="door-eyebrow reveal mt-3" style={{ "--i": 0 } as CSSProperties}>
                      {door.sub}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {door.offer.map((item, i) => (
                        <li key={item} className="reveal flex gap-3 font-medium" style={{ "--i": i + 1 } as CSSProperties}>
                          <Tick />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skirting board and wooden floor the doors stand on (desktop; phones scroll the doors). */}
      <div aria-hidden="true" className="door-floor hidden md:block" />
    </section>
  );
}

/** Phones have no hover, so the same points sit under the door, in a smaller size. */
function PhoneOffer({ door }: { door: OpenDoorData }) {
  return (
    <div aria-hidden="true" className="mt-4 md:hidden">
      <p className="door-eyebrow">{door.sub}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {door.offer.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Tick />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="var(--accent-text)" strokeWidth="1.8" className="mt-[0.2em] shrink-0">
      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockedDoor({ door }: { door: Extract<Door, { locked: true }> }) {
  return (
    <div aria-disabled="true" tabIndex={0} className="door locked group block cursor-not-allowed rounded-sm focus-visible:outline-offset-4">
      <PanelDoor variant="creator" name={door.name} locked />
      <span className="sr-only">{door.name}: Locked, for now (under construction). {door.tagline}</span>
      <p aria-hidden="true" className="mt-4 text-muted md:hidden">
        Locked, for now. {door.tagline}
      </p>
    </div>
  );
}
