'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Grid } from '@/components/layout/Grid';
import { ResourceCard } from '@/components/shared/cards/ResourceCard';
import { Resource } from '@/types/entities';

interface ResourcesPageProps {
  resources: Resource[];
}

export function ResourcesPage({ resources }: ResourcesPageProps) {
  return (
    <PageShell
      title="Resources & Downloads"
      description="Downloadable cheatsheets, curriculum guides, CVs, and technical resources."
    >
      {/* Featured CV & Resume Download Cards */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-zinc-100 font-sans">Curriculum Vitae & Resumes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Software & DevOps CV */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                Software & DevOps
              </span>
              <h3 className="text-lg font-bold text-zinc-100">Software Engineering CV</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full-stack web development, Linux administration, Docker, CI/CD pipelines, and cloud systems.
              </p>
            </div>
            <a
              href="/assets/Mahesh_Software_CV.pdf"
              download="Mahesh_Software_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs transition-all"
            >
              Download Software CV (PDF)
            </a>
          </div>

          {/* Teaching & Trainer CV */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                Teaching & Training
              </span>
              <h3 className="text-lg font-bold text-zinc-100">Teaching & Trainer CV</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                MS-CIT trainer, technical workshop coordination, hackathons, and computer fundamentals teaching.
              </p>
            </div>
            <a
              href="/assets/Mahesh_Teaching_CV.pdf"
              download="Mahesh_Teaching_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs transition-all"
            >
              Download Teaching CV (PDF)
            </a>
          </div>

        </div>
      </div>

      <Grid columns={3} gap="md">
        {resources.map(res => (
          <ResourceCard key={res.id} resource={res} />
        ))}
      </Grid>
    </PageShell>
  );
}
