import { getBlogDetailPageModel } from '@/features/blog/service';
import { getAllBlogs } from '@/services/blogs';
import { notFound } from 'next/navigation';
import { BlogDetailPage } from '@/features/blog/BlogDetailPage';
import { getPageMetadata, getEntityJsonLd } from '@/services/seo';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map(b => ({
    slug: b.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = await getBlogDetailPageModel(slug);
  
  if (!model) return {};

  return getPageMetadata({
    title: model.title,
    description: model.description,
    slug: `blog/${slug}`,
    type: 'article'
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const model = await getBlogDetailPageModel(slug);

  if (!model) {
    notFound();
  }

  const jsonLd = getEntityJsonLd('BlogPosting', model);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailPage model={model} />
    </>
  );
}
