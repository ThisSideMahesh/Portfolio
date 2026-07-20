'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Grid } from '@/components/layout/Grid';
import { PublicationCard } from '@/components/shared/cards/PublicationCard';
import { PublicationsPageModel } from './service';

interface PublicationsPageProps {
  model: PublicationsPageModel;
}

export function PublicationsPage({ model }: PublicationsPageProps) {
  const { publications } = model;

  return (
    <PageShell
      title="Technical Publications"
      description="Books, research whitepapers, and guides designed for technical training, system engineering, and student coordination cell resources."
    >
      <Grid columns={3} gap="md">
        {publications.map(pub => (
          <PublicationCard key={pub.id} publication={pub as any} />
        ))}
      </Grid>
    </PageShell>
  );
}
