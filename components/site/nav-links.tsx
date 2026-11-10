"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/components/site/site-header";

/** Desktop navigation: a floating pill of tabs. The current page is marked with aria-current and filled in ink. */
export function NavLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="nav-island hidden items-center gap-0.5 lg:flex">
      {links.map((link) => {
        const current = !link.href.includes("#") && link.href === pathname;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`nav-tab inline-flex min-h-10 items-center rounded-full px-4 text-[0.95rem] font-medium ${
              current ? "bg-ink text-bg" : "text-muted hover:bg-bg hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
