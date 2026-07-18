import React from 'react';
import { cn } from '@/lib/utils/cn';

interface TimelineProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function Timeline<T>({ items, renderItem, className, ...props }: TimelineProps<T>) {
  return (
    <div 
      className={cn('relative border-l border-zinc-900 ml-4 pl-6 space-y-12 py-4', className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="relative group">
          {/* Timeline node node indicator */}
          <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-zinc-900 bg-zinc-950 group-hover:border-amber-500 transition-colors duration-200" />
          
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
