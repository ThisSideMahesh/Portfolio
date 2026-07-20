'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Grid } from '@/components/layout/Grid';
import { BlogCard } from '@/components/shared/cards/BlogCard';
import { BlogPageModel } from './service';

interface BlogPageProps {
  model: BlogPageModel;
}

export function BlogPage({ model }: BlogPageProps) {
  const { blogs } = model;

  return (
    <PageShell
      title="Technical Publication Blog"
      description="Guides, thoughts, and walkthroughs detailing Red Hat Linux server administrations, command shell configurations, and DevOps."
    >
      <Grid columns={2} gap="md">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog as any} />
        ))}
      </Grid>
    </PageShell>
  );
}
