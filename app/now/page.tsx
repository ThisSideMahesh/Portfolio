import React from 'react';
import { NowPage } from '@/features/now/NowPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Now',
    description: 'What Mahesh is currently focusing on, current study targets, and active projects.',
    slug: 'now'
  });
}

export default function Page() {
  return <NowPage />;
}
