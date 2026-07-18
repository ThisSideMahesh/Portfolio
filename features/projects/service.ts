import { getAllProjects, getProjectBySlug } from '@/services/projects';

export interface ProjectCardModel {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  slug: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ProjectsPageModel {
  projects: ProjectCardModel[];
}

export interface ProjectDetailPageModel {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  author: string;
  version: string;
}

export async function getProjectsPageModel(): Promise<ProjectsPageModel> {
  const projects = await getAllProjects();
  return {
    projects: projects.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      summary: p.summary,
      slug: p.slug,
      tags: p.tags,
      githubUrl: p.metadata?.githubUrl,
      liveUrl: p.metadata?.liveUrl
    }))
  };
}

export async function getProjectDetailPageModel(slug: string): Promise<ProjectDetailPageModel | null> {
  const p = await getProjectBySlug(slug);
  if (!p) return null;
  return {
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    tags: p.tags,
    githubUrl: p.metadata?.githubUrl,
    liveUrl: p.metadata?.liveUrl,
    author: p.author,
    version: p.version
  };
}
