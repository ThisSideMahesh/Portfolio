import { getFeaturedProjects } from '@/services/projects';
import { getFeaturedBlogs } from '@/services/blogs';
import { getContentRepository } from '@/lib/registry';
import { ProjectCardModel } from '../projects/service';
import { BlogCardModel } from '../blog/service';
import { Experience } from '@/types/entities';

export interface HomePageModel {
  featuredProjects: ProjectCardModel[];
  featuredBlogs: BlogCardModel[];
  experiences: Experience[];
}

export async function getHomePageModel(): Promise<HomePageModel> {
  const [projects, blogs, experiences] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedBlogs(),
    getContentRepository().getExperiences()
  ]);

  return {
    featuredProjects: projects.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      summary: p.summary,
      slug: p.slug,
      tags: p.tags,
      githubUrl: p.metadata?.githubUrl,
      liveUrl: p.metadata?.liveUrl
    })),
    featuredBlogs: blogs.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      summary: b.summary,
      slug: b.slug,
      tags: b.tags,
      publishedAt: b.publishedAt,
      readingTime: b.readingTime
    })),
    experiences: experiences.filter(e => e.status === 'Published')
  };
}
