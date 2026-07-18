import React from 'react';
import { AboutPage } from '@/features/about/AboutPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'About',
    description: 'Learn about Mahesh\'s computer science studies, Linux RHCSA certification, and workshops training.',
    slug: 'about'
  });
}

export default function Page() {
  return <AboutPage />;
}
