import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

/** 404 in the site's own style: a closed, unlabelled door and a way back to the real ones. */
export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
      <p className="text-sm font-medium text-accent-text">Error 404</p>
      <h1 className="text-[clamp(2.5rem,7vw,5.5rem)]">
        <span className="block">This door leads nowhere.</span>
        <span className="block text-muted">The page you tried does not exist.</span>
      </h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/#doors" className="pill pill-solid">
          Back to the doors
          <span className="pill-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/" className="pill pill-ghost">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
