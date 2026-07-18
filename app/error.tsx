'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/ui/error-state/ErrorState';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled runtime error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-6">
      <ErrorState
        title="Application Error"
        message="An unexpected error occurred during execution of this view. Please try reloading."
        onRetry={() => reset()}
      />
    </div>
  );
}
