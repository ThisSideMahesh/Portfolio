'use client';

import React from 'react';
import { EmptyState } from '@/components/ui/empty-state/EmptyState';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-6">
      <EmptyState
        title="404 — Page Not Found"
        description="The page you are looking for does not exist or has been relocated to another route."
        actionLabel="Go to Home"
        onAction={() => router.push('/')}
      />
    </div>
  );
}
