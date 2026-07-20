import { getAllPublications, getPublicationBySlug } from '@/services/publications';

export interface PublicationCardModel {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  slug: string;
  tags: string[];
  publicationType: string;
  downloadUrl?: string;
}

export interface PublicationsPageModel {
  publications: PublicationCardModel[];
}

export interface PublicationDetailPageModel {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  publicationType: string;
  downloadUrl?: string;
  language: string;
  license: string;
  version: string;
}

export async function getPublicationsPageModel(): Promise<PublicationsPageModel> {
  const pubs = await getAllPublications();
  return {
    publications: pubs.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      summary: p.summary,
      slug: p.slug,
      tags: p.tags,
      publicationType: p.metadata?.publicationType || 'Book',
      downloadUrl: p.metadata?.downloadUrl
    }))
  };
}

export async function getPublicationDetailPageModel(slug: string): Promise<PublicationDetailPageModel | null> {
  const p = await getPublicationBySlug(slug);
  if (!p) return null;
  return {
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    tags: p.tags,
    publicationType: p.metadata?.publicationType || 'Book',
    downloadUrl: p.metadata?.downloadUrl,
    language: p.language,
    license: p.license,
    version: p.version
  };
}
