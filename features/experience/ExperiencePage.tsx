'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Timeline } from '@/components/shared/timeline/Timeline';
import { ExperienceCard } from '@/components/shared/cards/ExperienceCard';
import { Experience } from '@/types/entities';

interface ExperiencePageProps {
  experiences: Experience[];
}

export function ExperiencePage({ experiences }: ExperiencePageProps) {
  return (
    <PageShell
      title="Experience"
      description="A history of student organization leadership, workshop hosting, and software engineering roles."
    >
      <div className="max-w-4xl mx-auto">
        <Timeline<Experience>
          items={experiences}
          renderItem={(item) => <ExperienceCard experience={item} />}
        />
      </div>
    </PageShell>
  );
}
