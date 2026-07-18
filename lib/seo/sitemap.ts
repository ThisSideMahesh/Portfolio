import { MetadataRoute } from 'next';
import { SiteConfig } from '@/config/site';
import { getContentRepository } from '@/lib/registry';

export async function generateSitemapUrls(): Promise<MetadataRoute.Sitemap> {
  const repo = getContentRepository();

  // Fetch all entities to include in the sitemap
  const projects = await repo.getProjects();
  const blogs = await repo.getBlogs();
  const publications = await repo.getPublications();

  const staticRoutes = [
    '',
    '/about',
    '/experience',
    '/skills',
    '/projects',
    '/publications',
    '/blog',
    '/resources',
    '/contact'
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add static routes
  for (const route of staticRoutes) {
    sitemap.push({
      url: `${SiteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8
    });
  }

  // Add dynamic project routes
  for (const project of projects) {
    sitemap.push({
      url: `${SiteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  // Add dynamic blog routes
  for (const blog of blogs) {
    sitemap.push({
      url: `${SiteConfig.url}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.6
    });
  }

  // Add dynamic publication routes
  for (const pub of publications) {
    sitemap.push({
      url: `${SiteConfig.url}/publications/${pub.slug}`,
      lastModified: new Date(pub.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6
    });
  }

  return sitemap;
}
