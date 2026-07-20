import React from 'react';
import { getContentRepository } from '@/lib/registry';
import { ResourcesPage } from '@/features/resources/ResourcesPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Resources',
    description: 'Download cheat sheets, guides, training templates, and press assets.',
    slug: 'resources'
  });
}

export default async function Page() {
  const repo = getContentRepository();
  const resources = await repo.getResources();
  const published = resources.filter(r => r.status === 'Published');

  return <ResourcesPage resources={published} />;
}
