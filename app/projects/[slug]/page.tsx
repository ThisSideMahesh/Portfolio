import { getProjectDetailPageModel } from '@/features/projects/service';
import { getAllProjects } from '@/services/projects';
import { notFound } from 'next/navigation';
import { ProjectDetailPage } from '@/features/projects/ProjectDetailPage';
import { getPageMetadata, getEntityJsonLd } from '@/services/seo';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(p => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = await getProjectDetailPageModel(slug);
  
  if (!model) return {};

  return getPageMetadata({
    title: model.title,
    description: model.description,
    slug: `projects/${slug}`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const model = await getProjectDetailPageModel(slug);

  if (!model) {
    notFound();
  }

  const jsonLd = getEntityJsonLd('WebSite');

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProjectDetailPage model={model} />
    </>
  );
}
