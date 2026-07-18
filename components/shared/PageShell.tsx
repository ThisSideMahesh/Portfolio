'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator/Separator';

interface PageShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({ title, description, actions, breadcrumbs, children }: PageShellProps) {
  return (
    <Container className="py-12 space-y-8">
      {/* Top Breadcrumb Navigation */}
      {breadcrumbs && <div className="text-zinc-500 font-mono text-xs">{breadcrumbs}</div>}

      {/* Page Header segment */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-zinc-500 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>

      <Separator />

      {/* Main visual page payload */}
      <div className="w-full">{children}</div>
    </Container>
  );
}
