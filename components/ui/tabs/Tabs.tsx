'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function Tabs({ items, defaultTabId, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId || items[0]?.id);

  return (
    <div className={cn('w-full flex flex-col gap-6', className)}>
      
      {/* Tabs Header trigger buttons */}
      <div
        role="tablist"
        aria-label="Active category selection"
        className="flex gap-2 border-b border-zinc-900 overflow-x-auto pb-px"
      >
        {items.map(item => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent transition-all outline-none focus-visible:text-amber-500 cursor-pointer whitespace-nowrap',
                { 'text-amber-500 border-amber-500 font-semibold': isActive }
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Panel Contents */}
      {items.map(item => {
        const isActive = activeId === item.id;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`tabpanel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            hidden={!isActive}
            className={cn('focus-visible:outline-none', {
              'block': isActive,
              'hidden': !isActive
            })}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
