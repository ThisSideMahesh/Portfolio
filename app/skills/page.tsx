import React from 'react';
import { SkillsPage } from '@/features/skills/SkillsPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Skills',
    description: 'Browse Mahesh\'s skills inventory including frontend, backend, devops, and training skills.',
    slug: 'skills'
  });
}

export default function Page() {
  return <SkillsPage />;
}
