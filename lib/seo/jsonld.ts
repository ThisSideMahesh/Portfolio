import { SiteConfig } from '@/config/site';
import { SocialConfig } from '@/config/social';

export const JsonLdUtils = {
  person: () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SiteConfig.author,
    url: SiteConfig.url,
    jobTitle: 'Computer Science Engineering Student, IT Support & Technical Trainer',
    description: SiteConfig.description,
    sameAs: [
      SocialConfig.github,
      SocialConfig.linkedin,
      SocialConfig.instagram,
      SocialConfig.twitter
    ]
  }),

  blogPosting: (post: { title: string; summary: string; slug: string; publishedAt?: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: `${SiteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: SiteConfig.author
    }
  }),

  book: (pub: { title: string; summary: string; slug: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: pub.title,
    description: pub.summary,
    url: `${SiteConfig.url}/publications/${pub.slug}`,
    author: {
      '@type': 'Person',
      name: SiteConfig.author
    }
  }),

  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SiteConfig.title,
    url: SiteConfig.url,
    description: SiteConfig.description
  }),

  breadcrumbList: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  })
};
