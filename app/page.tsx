import React from 'react';
import { getHomePageModel } from '@/features/home/service';
import { HomePage } from '@/features/home/HomePage';
import { getPageMetadata, getEntityJsonLd } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata();
}

export default async function Page() {
  const model = await getHomePageModel();
  const jsonLd = getEntityJsonLd('Person');

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <HomePage model={model} />
    </>
  );
}
