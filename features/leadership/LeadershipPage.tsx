'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Users, Award, ShieldCheck, Target } from 'lucide-react';

export function LeadershipPage() {
  const roles = [
    {
      title: "President – Training, Placement & Entrepreneurship Cell",
      organization: "MIT CSN",
      period: "Nov 2025 – Present",
      description: "Led a cross-functional student team overseeing placement drives, communication systems, and campus hiring events. Streamlined recruitment workflows, improving execution efficiency across major tech drives.",
      icon: Users
    },
    {
      title: "Student Coordinator – T,P&E Cell",
      organization: "MIT CSN",
      period: "Aug 2025 – Nov 2025",
      description: "Managed official social media handles and communication, scaling digital reach from 93 to 326 followers and generating 25,000+ views with optimized hashtag and content strategies.",
      icon: Target
    },
    {
      title: "AlumniOS Bridge Captain – CSE Department",
      organization: "MIT CSN",
      period: "Jul 2025 – Present",
      description: "Acted as primary liaison between CSE students, faculty, and alumni. Managed alumni engagement and supported departmental mentorship and career guidance programs.",
      icon: ShieldCheck
    },
    {
      title: "Member – MIT CSN U.H.V. Cell",
      organization: "Universal Human Values Cell",
      period: "Oct 2025 – Present",
      description: "Organized ethical awareness workshops, student well-being sessions, and human values events across campus.",
      icon: Award
    }
  ];

  return (
    <PageShell
      title="Leadership & Governance"
      description="Positions of responsibility, student cell administration, and campus initiatives."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <Card key={index} variant="interactive" className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">{role.title}</h3>
                      <p className="text-xs text-amber-500 font-mono">{role.organization}</p>
                    </div>
                  </div>
                  <Badge variant="accent" className="shrink-0">
                    {role.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {role.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
