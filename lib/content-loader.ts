import fs from 'fs';
import path from 'path';
import { Project, Blog, Publication, Experience, Resource } from '@/types/entities';
import { BaseEntity } from '@/types/base';
import { ContentRepository } from '@/types/base';
import { 
  ProjectSchema, 
  BlogSchema, 
  PublicationSchema, 
  ExperienceSchema, 
  ResourceSchema 
} from './validators';
import { SiteConfig } from '@/config/site';

export class ContentLoader {
  private static dbPath = path.join(process.cwd(), 'public', 'data', 'portfolio.json');

  private static getDatabase(): any {
    try {
      const raw = fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load centralized portfolio.json database', e);
      return {};
    }
  }

  public static getProjects(): Project[] {
    const db = this.getDatabase();
    const items = db.projects || [];
    return items.map((p: any) => {
      const mapped = {
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        summary: p.summary,
        status: 'Published',
        visibility: 'Public',
        featured: p.featured ?? true,
        draft: false,
        archived: false,
        author: 'Mahesh Namdev Khandebharad',
        contributors: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        version: '1.0.0',
        revision: 1,
        changeNotes: ['Centralized sync'],
        tags: p.tags || [],
        categories: p.categories || [],
        gallery: [],
        language: 'en',
        license: 'MIT',
        metadata: {
          githubUrl: p.github,
          liveUrl: p.demo
        }
      };
      return ProjectSchema.parse(mapped) as Project;
    });
  }

  public static getExperiences(): Experience[] {
    const db = this.getDatabase();
    const items = db.experiences || [];
    return items.map((exp: any) => {
      const mapped = {
        id: exp.id,
        slug: exp.slug,
        title: exp.role,
        subtitle: exp.role,
        description: exp.description || (exp.achievements ? exp.achievements.join(' ') : 'Experience'),
        summary: exp.description || (exp.achievements ? exp.achievements[0] || 'Experience' : 'Experience'),
        status: 'Published',
        visibility: 'Public',
        featured: true,
        draft: false,
        archived: false,
        author: 'Mahesh Namdev Khandebharad',
        contributors: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        version: '1.0.0',
        revision: 1,
        changeNotes: ['Centralized sync'],
        tags: [],
        categories: [],
        gallery: [],
        language: 'en',
        license: 'None',
        metadata: {
          company: exp.company,
          role: exp.role,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrent: exp.isCurrent,
          achievements: exp.achievements || []
        }
      };
      return ExperienceSchema.parse(mapped) as Experience;
    });
  }

  public static getPublications(): Publication[] {
    const db = this.getDatabase();
    const items = db.publications || [];
    return items.map((pub: any) => {
      const mapped = {
        id: pub.id,
        slug: pub.slug,
        title: pub.title,
        subtitle: pub.subtitle,
        description: pub.description,
        summary: pub.summary,
        status: 'Published',
        visibility: 'Public',
        featured: pub.featured ?? true,
        draft: false,
        archived: false,
        author: 'Mahesh Namdev Khandebharad',
        contributors: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: pub.publishedAt || new Date().toISOString(),
        version: '1.0.0',
        revision: 1,
        changeNotes: ['Centralized sync'],
        tags: pub.tags || [],
        categories: pub.categories || [],
        gallery: [],
        language: 'en',
        license: 'Creative Commons',
        metadata: {
          publicationType: pub.publicationType,
          downloadUrl: pub.downloadUrl
        }
      };
      return PublicationSchema.parse(mapped) as Publication;
    });
  }

  public static getResources(): Resource[] {
    const db = this.getDatabase();
    const items = db.resources || [];
    return items.map((res: any) => {
      const mapped = {
        id: res.id,
        slug: res.slug,
        title: res.title,
        subtitle: res.subtitle,
        description: res.description,
        summary: res.summary,
        status: 'Published',
        visibility: 'Public',
        featured: res.featured ?? true,
        draft: false,
        archived: false,
        author: 'Mahesh Namdev Khandebharad',
        contributors: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        version: '1.0.0',
        revision: 1,
        changeNotes: ['Centralized sync'],
        tags: res.tags || [],
        categories: res.categories || [],
        gallery: [],
        language: 'en',
        license: 'Creative Commons BY-NC',
        metadata: {
          downloadUrl: res.downloadUrl,
          fileType: res.fileType,
          fileSize: res.fileSize
        }
      };
      return ResourceSchema.parse(mapped) as Resource;
    });
  }

  public static getBlogs(): Blog[] {
    const db = this.getDatabase();
    const items = db.blogs || [];
    return items.map((b: any) => {
      const mapped = {
        id: b.id,
        slug: b.slug,
        title: b.title,
        subtitle: b.subtitle,
        description: b.description,
        summary: b.summary,
        status: 'Published',
        visibility: 'Public',
        featured: b.featured ?? true,
        draft: false,
        archived: false,
        author: 'Mahesh Namdev Khandebharad',
        contributors: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: b.publishedAt || new Date().toISOString(),
        version: '1.0.0',
        revision: 1,
        changeNotes: ['Centralized sync'],
        tags: b.tags || [],
        categories: b.categories || [],
        gallery: [],
        language: 'en',
        license: 'MIT',
        metadata: {}
      };
      return BlogSchema.parse(mapped) as Blog;
    });
  }
}

export class LocalContentRepository implements ContentRepository {
  public async getProjects(): Promise<Project[]> {
    const raw = ContentLoader.getProjects();
    return raw.map(p => this.normalizeEntity(p, 'projects')) as Project[];
  }

  public async getBlogs(): Promise<Blog[]> {
    const raw = ContentLoader.getBlogs();
    return raw.map(b => this.normalizeEntity(b, 'blog')) as Blog[];
  }

  public async getPublications(): Promise<Publication[]> {
    const raw = ContentLoader.getPublications();
    return raw.map(pb => this.normalizeEntity(pb, 'publications')) as Publication[];
  }

  public async getExperiences(): Promise<Experience[]> {
    const raw = ContentLoader.getExperiences();
    return raw.map(exp => this.normalizeEntity(exp, 'experience')) as Experience[];
  }

  public async getResources(): Promise<Resource[]> {
    const raw = ContentLoader.getResources();
    return raw.map(r => this.normalizeEntity(r, 'resources')) as Resource[];
  }

  public async getBySlug(
    type: 'Project' | 'Blog' | 'Publication' | 'Experience' | 'Resource',
    slug: string
  ): Promise<BaseEntity | null> {
    let items: BaseEntity[] = [];

    switch (type) {
      case 'Project':
        items = await this.getProjects();
        break;
      case 'Blog':
        items = await this.getBlogs();
        break;
      case 'Publication':
        items = await this.getPublications();
        break;
      case 'Experience':
        items = await this.getExperiences();
        break;
      case 'Resource':
        items = await this.getResources();
        break;
    }

    return items.find(item => item.slug === slug) || null;
  }

  public async getFeatured(): Promise<BaseEntity[]> {
    const all = [
      ...(await this.getProjects()),
      ...(await this.getBlogs()),
      ...(await this.getPublications())
    ];

    return all
      .filter(item => item.featured && item.status === 'Published')
      .sort((a, b) => {
        const scoreA = a.analytics?.featuredScore || 0;
        const scoreB = b.analytics?.featuredScore || 0;
        return scoreB - scoreA;
      });
  }

  private normalizeEntity(entity: any, routeSegment: string): any {
    if (!entity.slug && entity.title) {
      entity.slug = entity.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    entity.canonicalUrl = `${SiteConfig.url}/${routeSegment}/${entity.slug}`;

    if (entity.publishedAt) {
      entity.publishedAt = new Date(entity.publishedAt).toISOString();
    }

    if (routeSegment === 'blog' && !entity.readingTime && entity.summary) {
      const wordCount = entity.summary.split(/\s+/).length;
      entity.readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    return entity;
  }
}
