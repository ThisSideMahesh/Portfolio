'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Grid } from '@/components/layout/Grid';

export function SkillsPage() {
  const skillGroups = [
    {
      title: 'Languages & Core',
      skills: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bash Scripting', 'SQL']
    },
    {
      title: 'Frameworks & Runtimes',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'TailwindCSS']
    },
    {
      title: 'Database & Storage',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite']
    },
    {
      title: 'Systems & DevOps',
      skills: ['Linux Admin (RHEL/Debian)', 'Git', 'GitHub', 'Docker', 'Ansible']
    }
  ];

  return (
    <PageShell
      title="Skills & Technologies"
      description="A structured inventory of technical skills across software engineering, systems hosting, and automation."
    >
      <Grid columns={2} gap="md">
        {skillGroups.map(group => (
          <Card key={group.title}>
            <CardHeader>
              <h3 className="text-base font-bold text-zinc-100">{group.title}</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-2">
              {group.skills.map(s => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </PageShell>
  );
}
