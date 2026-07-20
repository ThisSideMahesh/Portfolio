'use client';

import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { SearchProvider } from '@/providers/SearchProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { MotionConfig } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SearchProvider>
        <ToastProvider>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </ToastProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}
