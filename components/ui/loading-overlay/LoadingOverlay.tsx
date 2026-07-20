import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Spinner } from '../spinner/Spinner';

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  isAbsolute?: boolean;
}

export function LoadingOverlay({ message, isAbsolute = true, className, ...props }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'z-40 flex flex-col items-center justify-center gap-3 bg-zinc-950/70 backdrop-blur-sm p-4 w-full h-full',
        {
          'absolute inset-0': isAbsolute,
          'fixed inset-0': !isAbsolute
        },
        className
      )}
      {...props}
    >
      <Spinner size="lg" className="text-amber-500" />
      {message && <p className="text-sm font-medium text-zinc-400 font-mono animate-pulse">{message}</p>}
    </div>
  );
}
