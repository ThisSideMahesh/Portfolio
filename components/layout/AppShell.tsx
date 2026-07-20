'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSearch } from '@/providers/SearchProvider';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { CommandPalette } from '@/components/shared/command/CommandPalette';
import { SearchOverlay } from '@/components/shared/search/SearchOverlay';
import { AskMahesh } from '@/components/shared/ai/AskMahesh';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion/variants';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { setIsOpen } = useSearch();

  // Bind ⌘K trigger globally
  useKeyboardShortcuts(() => {
    setIsOpen(true);
  });

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-500">
      
      {/* Skip to Content Landmark for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-zinc-950 focus:font-bold focus:rounded-lg focus:outline-none"
      >
        Skip to Content
      </a>

      {/* Navigation Header Chrome */}
      <Navbar />

      {/* Central Page Landmark Container */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer chrome */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CommandPalette />
      <SearchOverlay />
      <AskMahesh />
    </div>
  );
}
