import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { SiteConfig } from '@/config/site';
import { Providers } from '@/app/providers';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap' 
});

export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: `%s | ${SiteConfig.author}`
  },
  description: SiteConfig.description,
  keywords: [
    "Mahesh Namdev Khandebharad",
    "thissidemahesh",
    "Computer Science Student",
    "Technical Trainer",
    "Linux Administrator",
    "DevOps Enthusiast",
    "RHCSA",
    "Chhatrapati Sambhajinagar",
    "Maharashtra"
  ],
  authors: [{ name: SiteConfig.author }],
  creator: SiteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SiteConfig.url,
    title: SiteConfig.title,
    description: SiteConfig.description,
    siteName: SiteConfig.title
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${inter.variable} font-sans bg-zinc-950 text-zinc-100 antialiased`}>
        <Providers>
          <AppShell>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
