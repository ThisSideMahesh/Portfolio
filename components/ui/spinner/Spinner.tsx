import React from 'react';
import { cn } from '@/lib/utils/cn';

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <span
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        {
          'w-3.5 h-3.5 border-[1.5px]': size === 'sm',
          'w-5 h-5': size === 'md',
          'w-8 h-8': size === 'lg'
        },
        className
      )}
      role="status"
      aria-label="loading"
      {...props}
    />
  );
}
