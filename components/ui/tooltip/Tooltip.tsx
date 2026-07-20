'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {React.cloneElement(children as React.ReactElement<any>, {
        'aria-describedby': visible ? 'tooltip-content' : undefined
      })}
      
      {visible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className={cn(
            'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 border border-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-200 shadow-md transition-opacity duration-200 pointer-events-none',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
