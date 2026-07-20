import React from 'react';
import { ContactPage } from '@/features/contact/ContactPage';
import { getPageMetadata } from '@/services/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    title: 'Contact',
    description: 'Get in touch with Mahesh for training sessions, speaking invitations, or projects collaborations.',
    slug: 'contact'
  });
}

export default function Page() {
  return <ContactPage />;
}
