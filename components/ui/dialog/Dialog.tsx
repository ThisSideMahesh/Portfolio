'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/cn';
import { trapFocus, restoreFocus } from '@/lib/utils/focus';
import { KeyboardUtils } from '@/lib/utils/keyboard';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, description, children, className }: DialogProps) {
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (triggerRef.current) {
        restoreFocus(triggerRef.current);
      }
      document.body.style.overflow = '';
      return;
    }

    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const container = containerRef.current;
    if (container) {
      const focusable = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (KeyboardUtils.isEscape(event)) {
        onClose();
      }
      if (containerRef.current) {
        trapFocus(event, containerRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby={description ? 'dialog-description' : undefined}
        >
          {/* Backdrop Layer */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog Frame Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'relative w-full max-w-lg rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl flex flex-col gap-4 z-10',
              className
            )}
          >
            {/* Close Button Trigger */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Headings */}
            <div className="flex flex-col gap-1 pr-6">
              <h2 id="dialog-title" className="text-xl font-bold text-zinc-100">
                {title}
              </h2>
              {description && (
                <p id="dialog-description" className="text-sm text-zinc-400">
                  {description}
                </p>
              )}
            </div>

            {/* Modal Contents */}
            <div className="flex-1 text-sm text-zinc-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
