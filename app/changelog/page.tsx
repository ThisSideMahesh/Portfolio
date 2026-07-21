import { Metadata } from 'next';
import { ChangelogPage } from '@/features/changelog/ChangelogPage';
import { getPageMetadata } from '@/services/seo';

export const metadata: Metadata = getPageMetadata({
  title: 'Platform Changelog',
  description: 'Release history, version tracking, and ongoing platform enhancements for the portfolio platform.'
});

export default function Page() {
  return <ChangelogPage />;
}
