'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Grid } from '@/components/layout/Grid';

export function SkillsPage() {
  const skillGroups = [
    {
      title: 'Programming Languages',
      skills: ['C', 'C++', 'Java', 'Python', 'JavaScript']
    },
    {
      title: 'Operating Systems',
      skills: ['Windows', 'Linux (RHCSA)', 'macOS']
    },
    {
      title: 'Web Technologies',
      skills: ['HTML', 'CSS', 'React', 'Node.js', 'Express.js']
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'Firebase']
    },
    {
      title: 'Cloud & DevOps',
      skills: ['Linux System Administration', 'Docker', 'Cyber Security Fundamentals', 'Cloud & DevOps Fundamentals', 'Google Cloud (64+ Badges)']
    },
    {
      title: 'Tools & Utilities',
      skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'Microsoft Office', 'Google Workspace', 'Canva', 'Figma']
    },
    {
      title: 'Core Competencies',
      skills: ['IT Support', 'Hardware & Software Troubleshooting', 'Networking Basics', 'Technical Training', 'Looping Prompting', 'LaTeX Code']
    },
    {
      title: 'Teaching Competencies',
      skills: ['Classroom Management', 'Student Mentoring', 'Technical Training', 'Curriculum Delivery', 'Practical Lab Management', 'Assessment & Evaluation', 'Public Speaking', 'Educational Technology']
    }
  ];

  return (
    <PageShell
      title="Technical & Teaching Skills"
      description="Categorized technical proficiencies, tools, systems administration, and teaching competencies extracted from CV credentials."
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
