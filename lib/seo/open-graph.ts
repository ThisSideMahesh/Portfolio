import { SiteConfig } from '@/config/site';

export function getOpenGraphDefaults() {
  return {
    type: 'website',
    locale: SiteConfig.language,
    url: SiteConfig.url,
    siteName: SiteConfig.title,
    images: [
      {
        url: `${SiteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SiteConfig.title
      }
    ]
  };
}
