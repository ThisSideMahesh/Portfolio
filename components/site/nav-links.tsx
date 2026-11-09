"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/components/site/site-header";

/** Desktop navigation. The current page is marked with aria-current and shown in ink with an orange underline. */
export function NavLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {links.map((link) => {
        const current = !link.href.includes("#") && link.href === pathname;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium transition-colors hover:bg-surface hover:text-ink ${
              current ? "text-ink after:absolute after:inset-x-3.5 after:bottom-2 after:h-0.5 after:rounded-full after:bg-accent" : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
