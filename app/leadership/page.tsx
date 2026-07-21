import { Metadata } from 'next';
import { LeadershipPage } from '@/features/leadership/LeadershipPage';
import { getPageMetadata } from '@/services/seo';

export const metadata: Metadata = getPageMetadata({
  title: 'Leadership & Governance',
  description: 'Positions of responsibility, student cell administration, and campus initiatives led by Mahesh Namdev Khandebharad.'
});

export default function Page() {
  return <LeadershipPage />;
}
