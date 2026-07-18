'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';

export function NowPage() {
  return (
    <PageShell
      title="What I'm Doing Now"
      description="A snapshot of my current studies, professional focus areas, and active engineering work."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-zinc-100">Current Studies</h3>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 space-y-2 leading-relaxed">
            <p>
              I am currently wrapping up my final semesters of Computer Science Engineering studies. My academic focus is 
              distributed database systems, networks engineering, and virtualization models.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-zinc-100">Linux & DevOps</h3>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 space-y-2 leading-relaxed">
            <p>
              Following my Red Hat Certified System Administrator (RHCSA) certification, I am deep-diving into server 
              automation using Ansible playbooks, hosting services within secure Docker containers, and setting up centralized 
              monitoring telemetry with Prometheus and Grafana.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-zinc-100">Student Cell Leadership</h3>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 space-y-2 leading-relaxed">
            <p>
              I am coordinating Git, GitHub, and Linux CLI workshops for student engineering cohorts at college, creating 
              learning roadmaps, and managing collaborative student events.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
