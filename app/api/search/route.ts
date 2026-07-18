import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/services/search';

export async function GET() {
  try {
    const index = await getSearchIndex();
    return NextResponse.json(index, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Failed to get search index:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
