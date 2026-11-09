import { Flower } from "@/components/site/flower";
import { site, socials } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center self-start text-accent-text underline underline-offset-4"
          >
            {site.email}
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-muted">
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
