import { getPublicationDetailPageModel } from '@/features/publications/service';
import { getAllPublications } from '@/services/publications';
import { notFound } from 'next/navigation';
import { PublicationDetailPage } from '@/features/publications/PublicationDetailPage';
import { getPageMetadata, getEntityJsonLd } from '@/services/seo';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pubs = await getAllPublications();
  return pubs.map(p => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = await getPublicationDetailPageModel(slug);
  
  if (!model) return {};

  return getPageMetadata({
    title: model.title,
    description: model.description,
    slug: `publications/${slug}`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const model = await getPublicationDetailPageModel(slug);

  if (!model) {
    notFound();
  }

  const jsonLd = getEntityJsonLd('Book', model);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PublicationDetailPage model={model} />
    </>
  );
}
