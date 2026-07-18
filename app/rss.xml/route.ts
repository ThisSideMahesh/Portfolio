import { NextResponse } from 'next/server';
import { generateRssFeed } from '@/lib/seo/rss';

export async function GET() {
  const rssXml = await generateRssFeed();
  
  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
