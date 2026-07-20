'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className={cn('w-full border-t border-zinc-900', className)}>
      {items.map(item => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-zinc-900">
            <h3>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-section-${item.id}`}
                id={`accordion-trigger-${item.id}`}
                className="flex w-full items-center justify-between py-4 text-left font-medium text-zinc-200 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:text-amber-500 cursor-pointer"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-zinc-500 transition-transform duration-200',
                    { 'rotate-180 text-amber-500': isOpen }
                  )}
                />
              </button>
            </h3>
            <div
              id={`accordion-section-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className={cn(
                'overflow-hidden transition-all duration-200 text-sm text-zinc-400 pb-4',
                { 'block': isOpen, 'hidden': !isOpen }
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
