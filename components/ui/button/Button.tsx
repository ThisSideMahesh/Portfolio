import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 outline-none select-none active:scale-[0.98] disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          {
            // Variants
            'bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500':
              variant === 'primary',
            'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-700':
              variant === 'secondary',
            'bg-transparent hover:bg-zinc-900 text-zinc-200 border border-zinc-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-700':
              variant === 'outline',
            'bg-transparent hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-zinc-700':
              variant === 'ghost',
            'bg-rose-600 hover:bg-rose-700 text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500':
              variant === 'destructive',
            'bg-transparent text-amber-500 hover:underline p-0 active:scale-100':
              variant === 'link'
          },
          {
            // Sizes
            'px-2.5 py-1 text-xs': size === 'xs',
            'px-3 py-1.5 text-xs sm:text-sm': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-5 py-2.5 text-base': size === 'lg',
            'px-6 py-3 text-lg': size === 'xl'
          },
          className
        )}
        aria-busy={isLoading ? 'true' : undefined}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="mr-2 text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
