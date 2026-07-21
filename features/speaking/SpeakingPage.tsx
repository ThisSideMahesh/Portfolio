'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Mic, Calendar, MapPin, Users } from 'lucide-react';

export function SpeakingPage() {
  const talks = [
    {
      title: "Hackathon Hacked 2K26 – From Idea to Execution",
      event: "TECHNOPHILIA 2K26 | MIT CSN",
      date: "April 2026",
      location: "Chhatrapati Sambhajinagar, India",
      audience: "100+ Engineering Students",
      description: "Interactive session covering AI tools, rapid prototyping, problem decomposition, and strategy for winning national hackathons.",
      topics: ["Hackathons", "AI Tools", "Rapid Prototyping", "Career Planning"]
    },
    {
      title: "Linux CLI & Git Administration Masterclass",
      event: "CSE Student Association Workshops",
      date: "August 2025",
      location: "Jalna & Sambhajinagar, India",
      audience: "150+ Students",
      description: "Hands-on workshop teaching terminal commands, version control workflows, repository hygiene, and Linux system administration fundamentals.",
      topics: ["Linux", "Git", "DevOps", "Open Source"]
    }
  ];

  return (
    <PageShell
      title="Speaking & Workshops"
      description="Public keynotes, hackathon workshops, and technical seminars."
    >
      <div className="grid grid-cols-1 gap-6">
        {talks.map((talk, index) => (
          <Card key={index} variant="interactive">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Mic size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">{talk.title}</h3>
                    <p className="text-xs text-amber-500 font-mono mt-0.5">{talk.event}</p>
                  </div>
                </div>
                <Badge variant="accent" className="shrink-0 self-start md:self-auto">
                  {talk.date}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                {talk.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-mono pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{talk.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{talk.audience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {talk.topics.map(topic => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
