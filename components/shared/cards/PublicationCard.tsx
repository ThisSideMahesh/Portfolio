import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Publication } from '@/types/entities';
import { BookOpen, Download } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const { title, subtitle, summary, slug } = publication;
  const publicationType = publication.metadata?.publicationType ?? (publication as any).publicationType ?? 'Book';
  const downloadUrl = publication.metadata?.downloadUrl ?? (publication as any).downloadUrl;

  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Link href={`/publications/${slug}`} className="hover:text-amber-500 transition-colors">
              <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
            </Link>
            {subtitle && <p className="text-xs text-zinc-500 font-medium font-mono">{subtitle}</p>}
          </div>
          <Badge variant="accent" className="capitalize">
            {publicationType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{summary}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Link href={`/publications/${slug}`} className="text-xs text-amber-500 font-semibold hover:underline flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Publication</span>
        </Link>
        {downloadUrl && (
          <Link 
            href={downloadUrl} 
            target="_blank" 
            className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 flex items-center gap-1.5 text-xs px-2.5 font-medium"
            aria-label="Download Publication PDF"
          >
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
