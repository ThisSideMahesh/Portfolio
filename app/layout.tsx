import type { Metadata, Viewport } from "next";
import { FeedbackLayer } from "@/components/dev/feedback-layer";
import { DoorSwap } from "@/components/door-page/door-swap";
import { Loader } from "@/components/site/loader";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { RopeLamp } from "@/components/theme/rope-lamp";
import { ThemeScript } from "@/components/theme/theme-script";
import { anek, anekDeva, geist, geistMono } from "@/lib/fonts";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebe7e1" },
    { media: "(prefers-color-scheme: dark)", color: "#171514" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React hydrates.
    <html lang="en" suppressHydrationWarning className={`${anek.variable} ${anekDeva.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Loader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[var(--radius-control)] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <RopeLamp />
        <DoorSwap />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Review comments: development only, never part of the production site. */}
        {process.env.NODE_ENV === "development" ? <FeedbackLayer /> : null}
      </body>
    </html>
  );
}
