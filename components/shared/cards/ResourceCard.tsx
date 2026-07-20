import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Resource } from '@/types/entities';
import { FileText, Download } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { title, subtitle, summary } = resource;
  const downloadUrl = resource.metadata?.downloadUrl ?? (resource as any).downloadUrl;
  const fileType = resource.metadata?.fileType ?? (resource as any).fileType ?? 'pdf';
  const fileSize = resource.metadata?.fileSize ?? (resource as any).fileSize;

  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
            {subtitle && <p className="text-xs text-zinc-400 font-medium font-mono">{subtitle}</p>}
          </div>
          <Badge variant="default" className="uppercase">
            {fileType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{summary}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-mono">
          {fileSize || 'Unknown Size'}
        </span>
        <Link 
          href={downloadUrl} 
          target="_blank" 
          className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 flex items-center gap-1.5 text-xs px-3 font-medium"
          aria-label="Download Resource"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
