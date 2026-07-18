import { getAllBlogs, getBlogBySlug } from '@/services/blogs';

export interface BlogCardModel {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  slug: string;
  tags: string[];
  publishedAt?: string;
  readingTime?: number;
}

export interface BlogPageModel {
  blogs: BlogCardModel[];
}

export interface BlogDetailPageModel {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  publishedAt?: string;
  readingTime?: number;
}

export async function getBlogPageModel(): Promise<BlogPageModel> {
  const blogs = await getAllBlogs();
  return {
    blogs: blogs.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      summary: b.summary,
      slug: b.slug,
      tags: b.tags,
      publishedAt: b.publishedAt,
      readingTime: b.readingTime
    }))
  };
}

export async function getBlogDetailPageModel(slug: string): Promise<BlogDetailPageModel | null> {
  const b = await getBlogBySlug(slug);
  if (!b) return null;
  return {
    title: b.title,
    subtitle: b.subtitle,
    description: b.description,
    tags: b.tags,
    publishedAt: b.publishedAt,
    readingTime: b.readingTime
  };
}
