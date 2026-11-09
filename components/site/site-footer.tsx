import Link from "next/link";
import { Flower } from "@/components/site/flower";
import { site, socials } from "@/lib/site";

/** Continues the dark contact band; the dedication line sits at the very bottom of every page. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-band text-band-ink">
      <div className="wrap border-t border-band-line py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-sans text-xs font-medium tracking-wide text-band-muted">Doors</h2>
            <ul className="mt-3 space-y-1">
              {(["tech", "teaching", "management"] as const).map((id) => (
                <li key={id}>
                  <Link href={`/${id}`} className="inline-flex min-h-11 items-center capitalize hover:underline underline-offset-4">
                    {id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-medium tracking-wide text-band-muted">Elsewhere</h2>
            <ul className="mt-3 space-y-1">
              {socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} rel="me noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center hover:underline underline-offset-4">
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-medium tracking-wide text-band-muted">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-11 items-center underline underline-offset-4">
              {site.email}
            </a>
          </div>
        </div>

        <p className="mt-12 flex items-center justify-center gap-2 border-t border-band-line pt-8 text-sm text-band-muted">
          <span>
            Powered by{" "}
            <span lang="mr" className="font-deva">
              श्री स्वामी समर्थ
            </span>
          </span>
          <Flower className="size-4 text-accent" />
        </p>
      </div>
    </footer>
  );
}
