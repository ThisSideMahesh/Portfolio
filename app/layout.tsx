import type { Metadata, Viewport } from "next";
import { Loader } from "@/components/site/loader";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeScript } from "@/components/theme/theme-script";
import { anek, anekDeva, hind } from "@/lib/fonts";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3f0" },
    { media: "(prefers-color-scheme: dark)", color: "#121815" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React hydrates.
    <html lang="en" suppressHydrationWarning className={`${anek.variable} ${anekDeva.variable} ${hind.variable}`}>
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
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
