import { getContentRepository } from '@/lib/registry';
import { Publication } from '@/types/entities';

export async function getAllPublications(): Promise<Publication[]> {
  const repo = getContentRepository();
  const all = await repo.getPublications();
  return all.filter(p => p.status === 'Published');
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const repo = getContentRepository();
  const pub = await repo.getBySlug('Publication', slug);
  return (pub as Publication) || null;
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  const all = await getAllPublications();
  return all.filter(p => p.featured);
}
