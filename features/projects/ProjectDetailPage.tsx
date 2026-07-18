'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Badge } from '@/components/ui/badge/Badge';
import { Separator } from '@/components/ui/separator/Separator';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProjectDetailPageModel } from './service';

interface ProjectDetailPageProps {
  model: ProjectDetailPageModel;
}

export function ProjectDetailPage({ model }: ProjectDetailPageProps) {
  const { title, subtitle, description, tags, githubUrl, liveUrl, author, version } = model;

  const breadcrumbs = (
    <Link
      href="/projects"
      className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to Projects</span>
    </Link>
  );

  return (
    <PageShell
      title={title}
      description={subtitle}
      breadcrumbs={breadcrumbs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-200">About the Project</h2>
            <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map(tag => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Details and Links Card */}
        <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest font-mono">Project Info</h3>
          <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
            <div className="flex justify-between">
              <span className="text-zinc-500">Status</span>
              <span className="text-zinc-200">Published</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Author</span>
              <span className="text-zinc-200">{author}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Version</span>
              <span className="text-zinc-200">{version}</span>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Links */}
          <div className="flex flex-col gap-2 pt-2">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-4 h-4 text-zinc-500" />
              </Link>
            )}
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-4 h-4 text-zinc-500" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
