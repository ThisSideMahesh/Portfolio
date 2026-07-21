import { Metadata } from 'next';
import { SpeakingPage } from '@/features/speaking/SpeakingPage';
import { getPageMetadata } from '@/services/seo';

export const metadata: Metadata = getPageMetadata({
  title: 'Speaking & Workshops',
  description: 'Public keynotes, hackathon workshops, and technical seminars delivered by Mahesh Namdev Khandebharad.'
});

export default function Page() {
  return <SpeakingPage />;
}
