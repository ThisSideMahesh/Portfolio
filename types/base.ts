export interface Media {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: Record<string, string>;
  twitter?: Record<string, string>;
  jsonLd?: Record<string, any>;
  robots?: string;
}

export interface AnalyticsStats {
  views: number;
  downloads: number;
  readingTime?: number;
  popularity: number;
  featuredScore: number;
}

export interface Relationships {
  projects?: string[];      // slug references
  blogs?: string[];
  publications?: string[];
  resources?: string[];
  workshops?: string[];
  talks?: string[];
  achievements?: string[];
  gallery?: string[];
  certificates?: string[];
  timelineEvents?: string[];
}

export interface BaseEntity {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  summary: string;
  status: 'Draft' | 'InReview' | 'Published' | 'Archived' | 'Private' | 'Scheduled';
  visibility: 'Public' | 'Private' | 'Password-Protected';
  featured: boolean;
  draft: boolean;
  archived: boolean;
  author: string;
  contributors: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  lastReviewed?: string;
  version: string;
  revision: number;
  changeNotes: string[];
  tags: string[];
  categories: string[];
  coverImage?: Media;
  gallery: Media[];
  thumbnail?: Media;
  icon?: string;
  readingTime?: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  license: string;
  metadata: Record<string, any>;
  seo?: SeoMetadata;
  analytics?: AnalyticsStats;
  relationships?: Relationships;
}

export interface ContentRepository {
  getProjects(): Promise<any[]>;
  getBlogs(): Promise<any[]>;
  getPublications(): Promise<any[]>;
  getExperiences(): Promise<any[]>;
  getResources(): Promise<any[]>;
  getBySlug(
    type: 'Project' | 'Blog' | 'Publication' | 'Experience' | 'Resource',
    slug: string
  ): Promise<BaseEntity | null>;
  getFeatured(): Promise<BaseEntity[]>;
}
