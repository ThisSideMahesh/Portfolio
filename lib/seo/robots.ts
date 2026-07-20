import { MetadataRoute } from 'next';
import { SiteConfig } from '@/config/site';

export function getRobotsConfig(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/'
    },
    sitemap: `${SiteConfig.url}/sitemap.xml`
  };
}
