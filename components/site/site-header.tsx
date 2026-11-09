import Link from "next/link";
import { LocalTime } from "@/components/site/local-time";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/site";

const links = [
  { href: "/#doors", label: "Work" },
  { href: "/#story", label: "My story" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg font-semibold tracking-tight">
          {site.username}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <p className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm sm:inline-flex">
            <span className="text-muted">Jalna</span>
            <LocalTime />
          </p>
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-muted hover:text-ink md:hidden"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
