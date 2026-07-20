'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog/Dialog';
import { useSearch } from '@/providers/SearchProvider';
import { NavigationConfig } from '@/config/navigation';
import { Terminal, Command } from 'lucide-react';

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useSearch();
  const [activeIndex, setActiveIndex] = useState(0);

  const shortcuts = [
    { title: 'Go to Home', path: '/' },
    { title: 'Go to About', path: '/about' },
    { title: 'Go to Projects', path: '/projects' },
    { title: 'Go to Publications', path: '/publications' },
    { title: 'Go to Blog', path: '/blog' },
    { title: 'Go to Resources', path: '/resources' },
    { title: 'Download Resume', path: NavigationConfig.resumeUrl }
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % shortcuts.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + shortcuts.length) % shortcuts.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = shortcuts[activeIndex];
        if (selected) {
          setIsOpen(false);
          router.push(selected.path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, router, setIsOpen]);

  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Command Console"
      description="Use arrow keys [↑↓] to navigate and [Enter] to run command actions."
      className="max-w-lg"
    >
      <div className="space-y-4">
        {/* Command shortcut lists */}
        <div className="flex flex-col gap-1 border border-zinc-900 rounded-lg overflow-hidden bg-zinc-950/20">
          {shortcuts.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.path}
                onClick={() => {
                  setIsOpen(false);
                  router.push(item.path);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors border-l-2 ${
                  isActive
                    ? 'border-amber-500 bg-zinc-900/50 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:bg-zinc-900/20 hover:text-zinc-200'
                }`}
              >
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span>{item.title}</span>
                <span className="ml-auto text-xs text-zinc-600 font-mono">{item.path}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard instructions footer */}
        <div className="flex justify-between items-center text-[10px] text-zinc-600 font-mono pt-2">
          <span>[↑↓] Navigate</span>
          <span>[Enter] Select</span>
          <span>[Esc] Close</span>
        </div>
      </div>
    </Dialog>
  );
}
