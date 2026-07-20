'use client';

import React from 'react';
import { LoadingOverlay } from '@/components/ui/loading-overlay/LoadingOverlay';

export default function Loading() {
  return <LoadingOverlay message="Loading platform content..." isAbsolute={false} />;
}
