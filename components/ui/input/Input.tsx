import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        className={cn(
          'flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'border-rose-500/50 focus-visible:ring-rose-500': error
          },
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
