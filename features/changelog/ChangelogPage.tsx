'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { GitCommit, Tag, Sparkles, ShieldCheck } from 'lucide-react';

export function ChangelogPage() {
  const releases = [
    {
      version: "v1.0.0",
      date: "July 2026",
      tag: "Stable Release",
      summary: "Official Production Release of the Mahesh Namdev Khandebharad Portfolio Platform.",
      changes: [
        "100/100 Lighthouse score across Performance, Accessibility, Best Practices, and SEO.",
        "Dual CV integration (Software Engineering & DevOps CV + Teaching & Trainer CV).",
        "Strict Content Security Policy (CSP) enforcement headers.",
        "RSC asset route handlers eliminating 404 prefetch issues.",
        "WCAG AA text contrast color audit compliance."
      ]
    },
    {
      version: "v1.0.0-rc.1",
      date: "July 2026",
      tag: "Release Candidate 1",
      summary: "Release candidate deployment with automated CI/CD pipeline.",
      changes: [
        "Configured GitHub Actions workflow (.github/workflows/verify.yml).",
        "Framer Motion animation system with reduced-motion accessibility enforcement.",
        "Structured data schemas (Person, WebSite, JSON-LD), RSS, sitemap, and robots.txt.",
        "Feature-Sliced Design (FSD) architecture transition."
      ]
    }
  ];

  return (
    <PageShell
      title="Platform Changelog"
      description="Release history, version tracking, and ongoing platform enhancements."
    >
      <div className="grid grid-cols-1 gap-6">
        {releases.map((release, index) => (
          <Card key={index} variant="interactive">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Tag size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">{release.version}</h3>
                    <p className="text-xs text-amber-500 font-mono">{release.tag}</p>
                  </div>
                </div>
                <Badge variant="accent" className="self-start sm:self-auto">
                  {release.date}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                {release.summary}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 border-t border-zinc-900 pt-3">
                {release.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <GitCommit className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
