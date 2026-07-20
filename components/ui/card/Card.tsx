import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-900 bg-zinc-950/40 transition-all duration-300',
        {
          'bg-zinc-950/40 border-zinc-900': variant === 'default',
          'backdrop-blur-md bg-zinc-950/80 border-zinc-900': variant === 'glass',
          'hover:border-amber-500/20 hover:bg-zinc-950/60 hover:-translate-y-0.5 cursor-pointer':
            variant === 'interactive'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 pt-6 pb-2 flex flex-col gap-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4 text-sm text-zinc-400 leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 pb-6 pt-2 border-t border-zinc-900/30 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}
