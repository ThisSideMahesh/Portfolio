import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent' | 'success';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-medium',
        {
          'bg-zinc-800 text-zinc-300 border border-zinc-700': variant === 'default',
          'bg-transparent text-zinc-400 border border-zinc-800': variant === 'outline',
          'bg-amber-500/10 text-amber-500 border border-amber-500/25': variant === 'accent',
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': variant === 'success'
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
