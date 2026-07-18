'use client';

import React from 'react';
import Link from 'next/link';
import { AppConfig } from '@/config/app';
import { SocialConfig } from '@/config/social';
import { NavigationConfig } from '@/config/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950/30 py-12 text-zinc-500" aria-label="Footer Navigation">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Brand Legal & Copyright */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-semibold text-zinc-300">{AppConfig.legalName}</span>
            <span className="text-xs">
              © {currentYear} {AppConfig.name}. All rights reserved. Version {AppConfig.version}
            </span>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {NavigationConfig.footer.map(link => (
              <Link key={link.path} href={link.path} className="hover:text-zinc-300 transition-colors">
                {link.title}
              </Link>
            ))}
            <Link href="/changelog" className="hover:text-zinc-300 transition-colors">
              Changelog
            </Link>
            <Link href="/rss.xml" className="hover:text-zinc-300 transition-colors">
              RSS
            </Link>
          </div>
        </div>

        {/* Elegant Centered Signature - Guided by User Guidelines */}
        <div className="mt-8 border-t border-zinc-900/50 pt-8 text-center text-xs tracking-wider flex flex-col gap-2">
          <p className="font-mono text-zinc-400">
            Built with Discipline.<br />
            Guided by Faith.
          </p>
          <p className="font-sans text-zinc-500 text-sm font-medium pt-1">
            श्री स्वामी समर्थ
          </p>
        </div>
      </div>
    </footer>
  );
}
