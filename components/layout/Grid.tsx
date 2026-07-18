import React from 'react';
import clsx from 'clsx';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 'auto-fit';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Grid({ columns = 'auto-fit', gap = 'md', children, className, ...props }: GridProps) {
  return (
    <div
      className={clsx(
        'grid w-full',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': columns === 4,
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': columns === 'auto-fit'
        },
        {
          'gap-2': gap === 'sm',
          'gap-4 sm:gap-6': gap === 'md',
          'gap-6 sm:gap-8': gap === 'lg',
          'gap-8 sm:gap-12': gap === 'xl'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
