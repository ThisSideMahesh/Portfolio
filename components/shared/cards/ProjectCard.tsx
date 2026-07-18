import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { Project } from '@/types/entities';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, subtitle, summary, tags, slug } = project;
  const githubUrl = project.metadata?.githubUrl ?? (project as any).githubUrl;
  const liveUrl = project.metadata?.liveUrl ?? (project as any).liveUrl;

  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader>
        <div className="space-y-1">
          <Link href={`/projects/${slug}`} className="hover:text-amber-500 transition-colors">
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          </Link>
          {subtitle && <p className="text-xs text-zinc-500 font-medium font-mono">{subtitle}</p>}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Link href={`/projects/${slug}`} className="text-xs text-amber-500 font-semibold hover:underline">
          View Details
        </Link>
        <div className="flex items-center gap-2">
          {githubUrl && (
            <Link 
              href={githubUrl} 
              target="_blank" 
              className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              aria-label="View Github Repository"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Link>
          )}
          {liveUrl && (
            <Link 
              href={liveUrl} 
              target="_blank" 
              className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              aria-label="Launch Live Project"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
