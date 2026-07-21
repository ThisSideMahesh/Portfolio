'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppConfig } from '@/config/app';
import { NavigationConfig } from '@/config/navigation';
import { useSearch } from '@/providers/SearchProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useToast } from '@/providers/ToastProvider';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { setIsOpen } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerSearch = () => {
    setIsOpen(true);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    addToast(`Theme toggled to ${theme === 'dark' ? 'light' : 'dark'} mode`, 'info');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-sans font-bold text-lg text-zinc-100 hover:text-amber-500 transition-colors">
              {AppConfig.name}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {NavigationConfig.header.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-zinc-200 ${
                    isActive ? 'text-amber-500 font-semibold' : 'text-zinc-400'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={triggerSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs transition-all"
              aria-label="Search or trigger command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 text-[10px]">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:text-zinc-100 text-zinc-400 transition-all"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume CTA */}
            <Link
              href={NavigationConfig.resumeUrl}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs transition-all"
            >
              {NavigationConfig.resumeLabel}
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={triggerSearch}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/30 text-zinc-400"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/30 text-zinc-400"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950/95 py-4 px-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NavigationConfig.header.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1 ${
                    isActive ? 'text-amber-500 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleToggleTheme();
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-300"
            >
              <span>Theme Mode</span>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href={NavigationConfig.resumeUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm"
            >
              Download {NavigationConfig.resumeLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
