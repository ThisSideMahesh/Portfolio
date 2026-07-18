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
      description="Downloadable cheatsheets, training manuals, slides, and press kits."
    >
      <Grid columns={3} gap="md">
        {resources.map(res => (
          <ResourceCard key={res.id} resource={res} />
        ))}
      </Grid>
    </PageShell>
  );
}
