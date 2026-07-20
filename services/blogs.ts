import { getContentRepository } from '@/lib/registry';
import { Blog } from '@/types/entities';

export async function getAllBlogs(): Promise<Blog[]> {
  const repo = getContentRepository();
  const all = await repo.getBlogs();
  
  // Return published blogs sorted by date desc
  return all
    .filter(b => b.status === 'Published')
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const repo = getContentRepository();
  const blog = await repo.getBySlug('Blog', slug);
  return (blog as Blog) || null;
}

export async function getFeaturedBlogs(): Promise<Blog[]> {
  const all = await getAllBlogs();
  return all.filter(b => b.featured);
}
