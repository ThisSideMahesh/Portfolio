import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle';
}

export function Skeleton({ variant = 'rect', className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-900',
        {
          'rounded-lg': variant === 'rect',
          'rounded-full': variant === 'circle'
        },
        className
      )}
      {...props}
    />
  );
}

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2 w-full', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', {
            'w-full': i !== lines - 1,
            'w-2/3': i === lines - 1
          })}
        />
      ))}
    </div>
  );
}

export function AvatarSkeleton({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  return (
    <Skeleton
      variant="circle"
      className={cn(
        {
          'w-8 h-8': size === 'sm',
          'w-10 h-10': size === 'md',
          'w-16 h-16': size === 'lg',
          'w-24 h-24': size === 'xl'
        },
        className
      )}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 w-full', className)}>
      <Skeleton className="h-6 w-1/3" />
      <TextSkeleton lines={3} />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton({ className }: { className?: string }) {
  return <CardSkeleton className={className} />;
}

export function BlogCardSkeleton({ className }: { className?: string }) {
  return <CardSkeleton className={className} />;
}

export function TimelineSkeleton({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn('space-y-8 w-full border-l border-zinc-900 pl-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="relative space-y-2">
          {/* Timeline Node Dot */}
          <Skeleton variant="circle" className="absolute -left-[21px] top-1.5 w-2 h-2" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-1/2" />
          <TextSkeleton lines={2} />
        </div>
      ))}
    </div>
  );
}
