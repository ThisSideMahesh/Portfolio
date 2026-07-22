'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import portfolio from '@/public/data/portfolio.json';

export function AboutPage() {
  // Flatten skills for display
  const techStack = [
    ...portfolio.skills.programming,
    ...portfolio.skills.webTechnologies,
    ...portfolio.skills.operatingSystems,
    ...portfolio.skills.tools
  ];

  return (
    <PageShell
      title={`About ${portfolio.personal.name}`}
      description={`${portfolio.personal.role} | Systems Support & Technical Trainer`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            Hello! I am <strong>{portfolio.personal.name}</strong>, a computer science engineering undergraduate student, IT support technician, and technical trainer based in {portfolio.personal.location}.
          </p>
          <p>
            My engineering journey is driven by a focus on full-stack application development, Linux system administration, and DevOps automation. I specialize in building robust solutions using React, Node.js, Express, and PostgreSQL, while orchestrating server automation scripts with Bash and Ansible.
          </p>
          <p>
            As a student leader, I serve as the <strong>President of the Training, Placement & Entrepreneurship Cell</strong> at MIT CSN. In this role, I manage placement drives, coordinate outreach, and bridge student connections with alumni networks. Passionate about knowledge sharing, I host hands-on workshops on Git, GitHub, and command line basics, helping hundreds of students build digital literacy.
          </p>
          <p>
            I am a certified <strong>Red Hat Certified System Administrator (RHCSA)</strong> and hold multiple credentials across Google Cloud, digital forensics, and software engineering. I love debugging complex system architectures, automating server setups, and competing in national hackathons to build software that makes a real-world difference.
          </p>
        </div>

        <div className="space-y-6">
          {/* Tech Stack card */}
          <Card>
            <CardHeader>
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest font-mono">Tech Stack</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-2">
              {techStack.slice(0, 15).map(s => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Certifications card */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Top Certifications</h3>
            {portfolio.certifications.slice(0, 3).map(cert => (
              <Card key={cert.title} className="border-amber-500/25 bg-amber-500/5">
                <CardHeader>
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider font-mono">Verified Certificate</span>
                  <h4 className="text-sm font-bold text-zinc-100">{cert.title}</h4>
                </CardHeader>
                <CardContent className="text-xs text-zinc-400 font-mono space-y-1">
                  <div>Issued by: {cert.issuer}</div>
                  <div>Year: {cert.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
