import { getContentRepository } from '@/lib/registry';
import { Project } from '@/types/entities';

export async function getAllProjects(): Promise<Project[]> {
  const repo = getContentRepository();
  const all = await repo.getProjects();
  return all.filter(p => p.status === 'Published');
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const repo = getContentRepository();
  const project = await repo.getBySlug('Project', slug);
  return (project as Project) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter(p => p.featured)
    .sort((a, b) => (b.analytics?.featuredScore || 0) - (a.analytics?.featuredScore || 0));
}
