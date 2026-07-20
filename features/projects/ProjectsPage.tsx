'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Grid } from '@/components/layout/Grid';
import { ProjectCard } from '@/components/shared/cards/ProjectCard';
import { ProjectsPageModel } from './service';

interface ProjectsPageProps {
  model: ProjectsPageModel;
}

export function ProjectsPage({ model }: ProjectsPageProps) {
  const { projects } = model;

  return (
    <PageShell
      title="Engineering Projects"
      description="A showcase of full-stack medical reporting portals, student cell management tools, and Linux sysadmin automation configurations."
    >
      <Grid columns={3} gap="md">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project as any} />
        ))}
      </Grid>
    </PageShell>
  );
}
