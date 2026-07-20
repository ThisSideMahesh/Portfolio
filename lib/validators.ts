import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  blurDataURL: z.string().optional()
});

export const SeoMetadataSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().optional(),
  openGraph: z.record(z.string(), z.string()).optional(),
  twitter: z.record(z.string(), z.string()).optional(),
  jsonLd: z.record(z.string(), z.any()).optional(),
  robots: z.string().optional()
});

export const AnalyticsStatsSchema = z.object({
  views: z.number(),
  downloads: z.number(),
  readingTime: z.number().optional(),
  popularity: z.number(),
  featuredScore: z.number()
});

export const RelationshipsSchema = z.object({
  projects: z.array(z.string()).optional(),
  blogs: z.array(z.string()).optional(),
  publications: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  workshops: z.array(z.string()).optional(),
  talks: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
  certificates: z.array(z.string()).optional(),
  timelineEvents: z.array(z.string()).optional()
});

export const BaseEntitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  summary: z.string(),
  status: z.enum(['Draft', 'InReview', 'Published', 'Archived', 'Private', 'Scheduled']),
  visibility: z.enum(['Public', 'Private', 'Password-Protected']),
  featured: z.boolean(),
  draft: z.boolean(),
  archived: z.boolean(),
  author: z.string(),
  contributors: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  lastReviewed: z.string().optional(),
  version: z.string(),
  revision: z.number(),
  changeNotes: z.array(z.string()),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  coverImage: MediaSchema.optional(),
  gallery: z.array(MediaSchema),
  thumbnail: MediaSchema.optional(),
  icon: z.string().optional(),
  readingTime: z.number().optional(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  language: z.string(),
  license: z.string(),
  metadata: z.record(z.string(), z.any()),
  seo: SeoMetadataSchema.optional(),
  analytics: AnalyticsStatsSchema.optional(),
  relationships: RelationshipsSchema.optional()
});

export const ProjectSchema = BaseEntitySchema.extend({
  metadata: z.object({
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    techStackDetails: z.string().optional(),
    role: z.string().optional()
  }).catchall(z.any())
});

export const PublicationSchema = BaseEntitySchema.extend({
  metadata: z.object({
    publicationType: z.enum(['Book', 'Research Paper', 'E-book', 'Workshop Guide', 'Whitepaper', 'Documentation']),
    isbn: z.string().optional(),
    publisher: z.string().optional(),
    pageCount: z.number().optional(),
    downloadUrl: z.string().optional()
  }).catchall(z.any())
});

export const BlogSchema = BaseEntitySchema.extend({
  content: z.string().optional(),
  metadata: z.object({
    wordCount: z.number().optional()
  }).catchall(z.any())
});

export const ExperienceSchema = BaseEntitySchema.extend({
  metadata: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    achievements: z.array(z.string())
  }).catchall(z.any())
});

export const ResourceSchema = BaseEntitySchema.extend({
  metadata: z.object({
    downloadUrl: z.string(),
    fileType: z.string(),
    fileSize: z.string().optional()
  }).catchall(z.any())
});
