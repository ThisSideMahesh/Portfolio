'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';

export function AboutPage() {
  const skills = [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'Linux Administration',
    'Bash Shell Scripting', 'Red Hat Enterprise Linux (RHEL)', 'Ansible'
  ];

  const certifications = [
    { name: 'Red Hat Certified System Administrator (RHCSA)', id: '240-230-001', date: '2025' }
  ];

  return (
    <PageShell
      title="About Mahesh"
      description="Computer Science Engineering Student, Technical Trainer, and Systems Administrator."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            Hello! I am Mahesh Namdev Khandebharad, a passionate Computer Science Engineering student based in Pune, India. 
            I focus on full-stack web applications development, Linux system administration, and systems automation.
          </p>
          <p>
            As a student cell lead, I coordinate student developer committees and host hands-on workshops on Git, GitHub, 
            and Linux CLI configurations to help peers bridge the gap between academic theory and practical software engineering.
          </p>
          <p>
            I am a certified Red Hat Certified System Administrator (RHCSA). I love working with the command line interface, 
            debugging complex server environments, writing automation shell scripts, and exploring open-source software technologies.
          </p>
        </div>

        <div className="space-y-6">
          {/* Tech Stack card */}
          <Card>
            <CardHeader>
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest font-mono">Tech Stack</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-2">
              {skills.map(s => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Certifications card */}
          {certifications.map(cert => (
            <Card key={cert.name} className="border-amber-500/25 bg-amber-500/5">
              <CardHeader>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider font-mono">Certification</span>
                <h4 className="text-sm font-bold text-zinc-100">{cert.name}</h4>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 font-mono space-y-1">
                <div>Verify ID: {cert.id}</div>
                <div>Issued: {cert.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
