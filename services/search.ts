import { getContentRepository } from '@/lib/registry';

export interface SearchIndexItem {
  title: string;
  summary: string;
  type: 'Project' | 'Blog' | 'Publication' | 'Experience' | 'Resource';
  slug: string;
  pathname: string;
  tags: string[];
}

export async function getSearchIndex(): Promise<SearchIndexItem[]> {
  const repo = getContentRepository();

  const [projects, blogs, publications, experiences, resources] = await Promise.all([
    repo.getProjects(),
    repo.getBlogs(),
    repo.getPublications(),
    repo.getExperiences(),
    repo.getResources()
  ]);

  const items: SearchIndexItem[] = [];

  // Map Projects
  projects
    .filter(p => p.status === 'Published')
    .forEach(p => {
      items.push({
        title: p.title,
        summary: p.summary,
        type: 'Project',
        slug: p.slug,
        pathname: `/projects/${p.slug}`,
        tags: p.tags || []
      });
    });

  // Map Blogs
  blogs
    .filter(b => b.status === 'Published')
    .forEach(b => {
      items.push({
        title: b.title,
        summary: b.summary,
        type: 'Blog',
        slug: b.slug,
        pathname: `/blog/${b.slug}`,
        tags: b.tags || []
      });
    });

  // Map Publications
  publications
    .filter(pb => pb.status === 'Published')
    .forEach(pb => {
      items.push({
        title: pb.title,
        summary: pb.summary,
        type: 'Publication',
        slug: pb.slug,
        pathname: `/publications/${pb.slug}`,
        tags: pb.tags || []
      });
    });

  // Map Experiences
  experiences
    .filter(e => e.status === 'Published')
    .forEach(e => {
      items.push({
        title: e.title,
        summary: e.summary,
        type: 'Experience',
        slug: e.slug,
        pathname: `/experience`,
        tags: e.tags || []
      });
    });

  // Map Resources
  resources
    .filter(r => r.status === 'Published')
    .forEach(r => {
      items.push({
        title: r.title,
        summary: r.summary,
        type: 'Resource',
        slug: r.slug,
        pathname: `/resources`,
        tags: r.tags || []
      });
    });

  return items;
}
