import { BaseEntity } from './base';

export interface Project extends BaseEntity {
  metadata: {
    githubUrl?: string;
    liveUrl?: string;
    techStackDetails?: string;
    role?: string;
    [key: string]: any;
  };
}

export interface Publication extends BaseEntity {
  metadata: {
    publicationType: 'Book' | 'Research Paper' | 'E-book' | 'Workshop Guide' | 'Whitepaper' | 'Documentation';
    isbn?: string;
    publisher?: string;
    pageCount?: number;
    downloadUrl?: string;
    [key: string]: any;
  };
}

export interface Blog extends BaseEntity {
  content?: string; // Markdown or raw text
  metadata: {
    wordCount?: number;
    [key: string]: any;
  };
}

export interface Experience extends BaseEntity {
  metadata: {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate?: string; // undefined/empty means present
    isCurrent: boolean;
    achievements: string[];
    [key: string]: any;
  };
}

export interface Resource extends BaseEntity {
  metadata: {
    downloadUrl: string;
    fileType: string;
    fileSize?: string;
    [key: string]: any;
  };
}
