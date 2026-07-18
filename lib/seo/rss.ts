import { SiteConfig } from '@/config/site';
import { getContentRepository } from '@/lib/registry';

export async function generateRssFeed(): Promise<string> {
  const repo = getContentRepository();
  const blogs = await repo.getBlogs();

  // Sort blogs by publishedAt desc
  const publishedBlogs = blogs
    .filter(b => b.status === 'Published')
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

  const itemsXml = publishedBlogs
    .map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${SiteConfig.url}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${SiteConfig.url}/blog/${blog.slug}</guid>
      <pubDate>${blog.publishedAt ? new Date(blog.publishedAt).toUTCString() : ''}</pubDate>
      <description><![CDATA[${blog.summary}]]></description>
    </item>
    `).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SiteConfig.title}]]></title>
    <link>${SiteConfig.url}</link>
    <description><![CDATA[${SiteConfig.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SiteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;
}
