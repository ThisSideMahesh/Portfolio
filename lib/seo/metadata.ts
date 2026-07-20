import { Metadata } from 'next';
import { SiteConfig } from '@/config/site';

interface MetadataProps {
  title?: string;
  description?: string;
  slug?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function createMetadata({
  title,
  description,
  slug,
  image,
  type = 'website'
}: MetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${SiteConfig.author}` : SiteConfig.title;
  const metaDescription = description || SiteConfig.description;
  const canonicalUrl = slug ? `${SiteConfig.url}/${slug}` : SiteConfig.url;
  const ogImage = image || `${SiteConfig.url}/og-image.jpg`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SiteConfig.title,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
