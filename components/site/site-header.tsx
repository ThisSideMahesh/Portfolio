import Image from "next/image";
import Link from "next/link";
import { LocalDate, LocalTime } from "@/components/site/local-time";
import { MobileMenu } from "@/components/site/mobile-menu";
import { NavLinks } from "@/components/site/nav-links";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/site";

export type NavLink = { href: string; label: string };

const links: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/tech", label: "Tech" },
  { href: "/teaching", label: "Teaching" },
  { href: "/management", label: "Management" },
  { href: "/#story", label: "My story" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-sm">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" translate="no" className="inline-flex min-h-11 items-center gap-3 font-display text-xl font-bold tracking-tight">
          <Image src="/images/logo-badge.webp" alt="" width={36} height={36} className="size-9 shrink-0 rounded-full" />
          {site.username}
        </Link>

        <NavLinks links={links} />

        <div className="flex items-center gap-1">
          {/* The clock steps aside between 896px and 1024px, where the tabs need the room (a phone in desktop mode is about 980px wide). */}
          <p className="hidden items-center gap-3 rounded-full border border-line px-4 py-2 text-[0.95rem] font-medium sm:inline-flex min-[56rem]:hidden min-[64rem]:inline-flex">
            <span className="text-muted">Local time</span>
            <LocalTime />
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <LocalDate />
          </p>
          {/* The rope lamp switches the theme from 1280px up (xl), so this button is only needed below that. */}
          <ThemeToggle className="xl:hidden" />
          <div className="min-[56rem]:hidden">
            <MobileMenu links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
