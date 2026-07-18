import React from 'react';
import { getPublicationsPageModel } from '@/features/publications/service';
import { PublicationsPage } from '@/features/publications/PublicationsPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Publications',
    description: 'Browse reference manuals, books, research writeups, and whitepapers.',
    slug: 'publications'
  });
}

export default async function Page() {
  const model = await getPublicationsPageModel();

  return <PublicationsPage model={model} />;
}
