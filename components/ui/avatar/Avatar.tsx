'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, alt, fallback, size = 'md', className, ...props }: AvatarProps) {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 select-none items-center justify-center font-semibold text-zinc-300 font-sans',
        {
          'w-8 h-8 text-xs': size === 'sm',
          'w-10 h-10 text-sm': size === 'md',
          'w-16 h-16 text-xl': size === 'lg',
          'w-24 h-24 text-3xl': size === 'xl'
        },
        className
      )}
      {...props}
    >
      {src && !error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{fallback.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
