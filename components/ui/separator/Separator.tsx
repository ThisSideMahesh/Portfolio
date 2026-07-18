import React from 'react';
import { cn } from '@/lib/utils/cn';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'bg-zinc-800 shrink-0',
        {
          'h-[1px] w-full': orientation === 'horizontal',
          'w-[1px] h-full': orientation === 'vertical'
        },
        className
      )}
      {...props}
    />
  );
}
