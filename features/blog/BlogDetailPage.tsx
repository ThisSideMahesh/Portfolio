'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Badge } from '@/components/ui/badge/Badge';
import { Separator } from '@/components/ui/separator/Separator';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BlogDetailPageModel } from './service';
import { MDXComponents } from '@/components/shared/MDXComponents';

interface BlogDetailPageProps {
  model: BlogDetailPageModel;
}

export function BlogDetailPage({ model }: BlogDetailPageProps) {
  const { title, subtitle, description, tags, publishedAt, readingTime } = model;

  const breadcrumbs = (
    <Link
      href="/blog"
      className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to Blog</span>
    </Link>
  );

  const actions = (
    <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-zinc-600" />
        <span suppressHydrationWarning>{publishedAt ? new Date(publishedAt).toISOString().split('T')[0] : 'Draft'}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-zinc-600" />
        <span>{readingTime} min read</span>
      </div>
    </div>
  );

  return (
    <PageShell
      title={title}
      description={subtitle}
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Render markdown using pre-styled MDX overrides */}
        <article className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p>{description}</p>
        </article>

        <Separator />

        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.map(tag => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
