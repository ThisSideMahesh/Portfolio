import { generateSitemapUrls } from '@/lib/seo/sitemap';

export default async function sitemap() {
  return generateSitemapUrls();
}
