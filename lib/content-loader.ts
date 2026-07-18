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
  private static contentRoot = path.join(process.cwd(), 'content');

  public static loadJsonFiles<T>(subDir: string, validator: (data: unknown) => T): T[] {
    const dirPath = path.join(this.contentRoot, subDir);

    if (!fs.existsSync(dirPath)) {
      return [];
    }

    try {
      const files = fs.readdirSync(dirPath);
      const results: T[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(dirPath, file);
          const rawContent = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(rawContent);
          
          // Validate schema
          const validated = validator(parsed);
          results.push(validated);
        }
      }

      return results;
    } catch (error) {
      console.error(`Error loading content from directory: ${dirPath}`, error);
      return [];
    }
  }

  public static loadMarkdownFiles<T>(subDir: string, validator: (data: unknown) => T): T[] {
    const dirPath = path.join(this.contentRoot, subDir);

    if (!fs.existsSync(dirPath)) {
      return [];
    }

    try {
      const files = fs.readdirSync(dirPath);
      const results: T[] = [];

      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(dirPath, file);
          const rawContent = fs.readFileSync(filePath, 'utf-8');
          
          const frontmatter = this.parseFrontmatter(rawContent);
          const validated = validator(frontmatter);
          results.push(validated);
        }
      }

      return results;
    } catch (error) {
      console.error(`Error loading markdown from directory: ${dirPath}`, error);
      return [];
    }
  }

  private static parseFrontmatter(rawContent: string): Record<string, any> {
    const lines = rawContent.split('\n');
    const metadata: Record<string, any> = {};
    let isFrontmatter = false;
    let frontmatterLines: string[] = [];

    for (const line of lines) {
      if (line.trim() === '---') {
        if (isFrontmatter) {
          break;
        }
        isFrontmatter = true;
        continue;
      }
      if (isFrontmatter) {
        frontmatterLines.push(line);
      }
    }

    for (const line of frontmatterLines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
        
        if (value === 'true') metadata[key] = true;
        else if (value === 'false') metadata[key] = false;
        else if (!isNaN(Number(value))) metadata[key] = Number(value);
        else if (value.startsWith('[') && value.endsWith(']')) {
          metadata[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        } else {
          metadata[key] = value;
        }
      }
    }

    return metadata;
  }
}

export class LocalContentRepository implements ContentRepository {
  public async getProjects(): Promise<Project[]> {
    const raw = ContentLoader.loadJsonFiles<Project>('projects', (data) => ProjectSchema.parse(data));
    return raw.map(p => this.normalizeEntity(p, 'projects')) as Project[];
  }

  public async getBlogs(): Promise<Blog[]> {
    const raw = ContentLoader.loadJsonFiles<Blog>('blog', (data) => BlogSchema.parse(data));
    const mdx = ContentLoader.loadMarkdownFiles<Blog>('blog', (data) => BlogSchema.parse(data));
    
    // Combine and normalize
    const all = [...raw, ...mdx];
    return all.map(b => this.normalizeEntity(b, 'blog')) as Blog[];
  }

  public async getPublications(): Promise<Publication[]> {
    const raw = ContentLoader.loadJsonFiles<Publication>('publications', (data) => PublicationSchema.parse(data));
    return raw.map(pb => this.normalizeEntity(pb, 'publications')) as Publication[];
  }

  public async getExperiences(): Promise<Experience[]> {
    const raw = ContentLoader.loadJsonFiles<Experience>('experience', (data) => ExperienceSchema.parse(data));
    return raw.map(exp => this.normalizeEntity(exp, 'experience')) as Experience[];
  }

  public async getResources(): Promise<Resource[]> {
    const raw = ContentLoader.loadJsonFiles<Resource>('resources', (data) => ResourceSchema.parse(data));
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
    // Generate slug from title if missing
    if (!entity.slug && entity.title) {
      entity.slug = entity.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Set canonicalUrl
    entity.canonicalUrl = `${SiteConfig.url}/${routeSegment}/${entity.slug}`;

    // Normalize dates to ISO format
    if (entity.publishedAt) {
      entity.publishedAt = new Date(entity.publishedAt).toISOString();
    }

    // Add reading time to blogs if absent
    if (routeSegment === 'blog' && !entity.readingTime && entity.summary) {
      // rough reading time: 200 words per minute
      const wordCount = entity.summary.split(/\s+/).length;
      entity.readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    return entity;
  }
}
