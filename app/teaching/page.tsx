import { Metadata } from 'next';
import { TeachingPage } from '@/features/teaching/TeachingPage';
import { getPageMetadata } from '@/services/seo';

export const metadata: Metadata = getPageMetadata({
  title: 'Teaching & Technical Training',
  description: 'Workshops, MS-CIT curriculum delivery, and student mentoring initiatives led by Mahesh Namdev Khandebharad.'
});

export default function Page() {
  return <TeachingPage />;
}
