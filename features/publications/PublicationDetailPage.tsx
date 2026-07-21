'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Badge } from '@/components/ui/badge/Badge';
import { Separator } from '@/components/ui/separator/Separator';
import { Download, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PublicationDetailPageModel } from './service';

interface PublicationDetailPageProps {
  model: PublicationDetailPageModel;
}

export function PublicationDetailPage({ model }: PublicationDetailPageProps) {
  const { title, subtitle, description, tags, publicationType, downloadUrl, language, license, version } = model;

  const breadcrumbs = (
    <Link
      href="/publications"
      className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to Publications</span>
    </Link>
  );

  const actions = (
    <Badge variant="accent" className="capitalize shrink-0">
      {publicationType}
    </Badge>
  );

  return (
    <PageShell
      title={title}
      description={subtitle}
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-200">About the Publication</h2>
            <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Download Info Card */}
        <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 h-fit">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest font-mono">Format Info</h3>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
            <div className="flex justify-between">
              <span className="text-zinc-400">Language</span>
              <span className="text-zinc-200">{language === 'en' ? 'English' : language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">License</span>
              <span className="text-zinc-200">{license}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Version</span>
              <span className="text-zinc-200">{version}</span>
            </div>
          </div>

          <Separator className="my-2" />

          {downloadUrl && (
            <Link
              href={downloadUrl}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border border-transparent bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Publication PDF</span>
            </Link>
          )}
        </div>
      </div>
    </PageShell>
  );
}
