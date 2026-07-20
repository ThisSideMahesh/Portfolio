import React from 'react';
import { UsesPage } from '@/features/uses/UsesPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Uses',
    description: 'Hardware, software setup, text editors, and command-line configurations used by Mahesh.',
    slug: 'uses'
  });
}

export default function Page() {
  return <UsesPage />;
}
