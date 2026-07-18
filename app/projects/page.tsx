import React from 'react';
import { getProjectsPageModel } from '@/features/projects/service';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Projects',
    description: 'Explore Mahesh\'s engineering, DevOps automation, and college full-stack projects.',
    slug: 'projects'
  });
}

export default async function Page() {
  const model = await getProjectsPageModel();

  return <ProjectsPage model={model} />;
}
