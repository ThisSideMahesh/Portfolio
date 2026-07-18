import React from 'react';
import clsx from 'clsx';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'prose' | 'wide' | 'full';
  children: React.ReactNode;
}

export function Container({ variant = 'default', children, className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full',
        {
          'max-w-5xl': variant === 'default',
          'max-w-3xl': variant === 'prose',
          'max-w-7xl': variant === 'wide',
          'max-w-full': variant === 'full'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
