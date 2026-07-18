import { createMetadata } from '@/lib/seo/metadata';
import { JsonLdUtils } from '@/lib/seo/jsonld';
import { BaseEntity } from '@/types/base';
import { Metadata } from 'next';

interface SeoServiceProps {
  title?: string;
  description?: string;
  slug?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function getPageMetadata(options?: SeoServiceProps): Metadata {
  return createMetadata(options);
}

export function getEntityJsonLd(
  type: 'Person' | 'BlogPosting' | 'Book' | 'WebSite',
  entity?: any
) {
  switch (type) {
    case 'Person':
      return JsonLdUtils.person();
    case 'BlogPosting':
      return JsonLdUtils.blogPosting(entity);
    case 'Book':
      return JsonLdUtils.book(entity);
    case 'WebSite':
      return JsonLdUtils.website();
    default:
      return null;
  }
}
