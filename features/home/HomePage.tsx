'use client';

import React from 'react';
import { Hero } from '@/components/shared/hero/Hero';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { ProjectCard } from '@/components/shared/cards/ProjectCard';
import { BlogCard } from '@/components/shared/cards/BlogCard';
import { ExperienceCard } from '@/components/shared/cards/ExperienceCard';
import { Timeline } from '@/components/shared/timeline/Timeline';
import { Experience } from '@/types/entities';
import { useRouter } from 'next/navigation';
import { HomePageModel } from './service';

interface HomePageProps {
  model: HomePageModel;
}

export function HomePage({ model }: HomePageProps) {
  const router = useRouter();
  const { featuredProjects, featuredBlogs, experiences } = model;

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <Hero
        onExploreProjects={() => router.push('/projects')}
        onContact={() => router.push('/contact')}
      />

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <Container className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Featured Work</h2>
              <p className="text-sm text-zinc-500">Selected engineering and full-stack solutions.</p>
            </div>
            <button
              onClick={() => router.push('/projects')}
              className="text-xs sm:text-sm font-semibold text-amber-500 hover:underline cursor-pointer"
            >
              All Projects &rarr;
            </button>
          </div>
          <Grid columns={3} gap="md">
            {featuredProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj as any} />
            ))}
          </Grid>
        </Container>
      )}

      {/* Experience Timeline Section */}
      {experiences.length > 0 && (
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Professional Journey</h2>
            <p className="text-sm text-zinc-500">A timeline of student cell coordinates, training workshops, and engineering roles.</p>
          </div>
          <Timeline<Experience>
            items={experiences}
            renderItem={(item) => <ExperienceCard experience={item} />}
          />
        </Container>
      )}

      {/* Featured Blog Posts Section */}
      {featuredBlogs.length > 0 && (
        <Container className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">Recent Publications</h2>
              <p className="text-sm text-zinc-500">Articles, tutorials, and guides about Linux administration and automation.</p>
            </div>
            <button
              onClick={() => router.push('/blog')}
              className="text-xs sm:text-sm font-semibold text-amber-500 hover:underline cursor-pointer"
            >
              Read All &rarr;
            </button>
          </div>
          <Grid columns={2} gap="md">
            {featuredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog as any} />
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}
