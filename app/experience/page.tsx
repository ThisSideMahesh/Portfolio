import React from 'react';
import { getContentRepository } from '@/lib/registry';
import { ExperiencePage } from '@/features/experience/ExperiencePage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Experience',
    description: 'Browse Mahesh\'s engineering timeline, student organization leads, and workshops coordinate achievements.',
    slug: 'experience'
  });
}

export default async function Page() {
  const repo = getContentRepository();
  const experiences = await repo.getExperiences();
  const published = experiences.filter(e => e.status === 'Published');

  return <ExperiencePage experiences={published} />;
}
