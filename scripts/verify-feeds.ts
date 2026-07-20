import { generateRssFeed } from '../lib/seo/rss';
import { generateSitemapUrls } from '../lib/seo/sitemap';
import { registerContentRepository } from '../lib/registry';
import { LocalContentRepository } from '../lib/content-loader';

async function main() {
  console.log('--- Verifying Sitemap and RSS Feeds Generators ---');

  // Register the repository
  registerContentRepository(new LocalContentRepository());

  try {
    const sitemap = await generateSitemapUrls();
    console.log(`✅ Sitemap generator success! Created ${sitemap.length} routes.`);
    console.log('Sample Sitemap Entry:', sitemap[0]);

    const rss = await generateRssFeed();
    console.log('✅ RSS generator success! XML size:', rss.length, 'characters.');
    console.log('Sample RSS header:\n', rss.substring(0, 300));
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

main();
