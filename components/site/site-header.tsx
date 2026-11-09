import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg font-medium tracking-tight">
          {site.username}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
