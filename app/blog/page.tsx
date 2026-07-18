import React from 'react';
import { getBlogPageModel } from '@/features/blog/service';
import { BlogPage } from '@/features/blog/BlogPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Blog',
    description: 'Read articles, guides, and administration handbooks authored by Mahesh.',
    slug: 'blog'
  });
}

export default async function Page() {
  const model = await getBlogPageModel();

  return <BlogPage model={model} />;
}
