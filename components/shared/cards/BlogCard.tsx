import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Blog } from '@/types/entities';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const { title, subtitle, summary, tags, slug, publishedAt, readingTime } = blog;

  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader>
        <div className="space-y-1">
          <Link href={`/blog/${slug}`} className="hover:text-amber-500 transition-colors">
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          </Link>
          {subtitle && <p className="text-xs text-zinc-400 font-medium font-mono">{subtitle}</p>}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-900/30">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span suppressHydrationWarning>{publishedAt ? new Date(publishedAt).toISOString().split('T')[0] : 'Draft'}</span>
        </div>
        {readingTime && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{readingTime} min read</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
