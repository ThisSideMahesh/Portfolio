'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@/components/ui/dialog/Dialog';
import { Input } from '@/components/ui/input/Input';
import { useSearch } from '@/providers/SearchProvider';
import { Search, FileText } from 'lucide-react';
import { SearchIndexItem } from '@/services/search';

export function SearchOverlay() {
  const { isOpen, setIsOpen, query, setQuery } = useSearch();
  const [index, setIndex] = useState<SearchIndexItem[]>([]);
  const [filtered, setFiltered] = useState<SearchIndexItem[]>([]);

  // Load search index when the modal opens
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIndex(data);
        }
      })
      .catch(err => console.error('Error loading search index:', err));
  }, [isOpen]);

  // Filter items on query changes
  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = index.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
    );
    setFiltered(matches);
  }, [query, index]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Search Platform"
      description="Quickly find projects, blog posts, publications, and command actions."
      className="max-w-lg"
    >
      <div className="space-y-4">
        {/* Search Input Box */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search query..."
            className="pl-10"
            autoFocus
          />
        </div>

        {/* Search results list */}
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {query && filtered.length > 0 ? (
            filtered.map(item => (
              <Link
                key={`${item.type}-${item.slug}`}
                href={item.pathname}
                onClick={handleClose}
                className="flex flex-col gap-1 p-3 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/50 hover:border-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-200">{item.title}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{item.summary}</p>
              </Link>
            ))
          ) : query ? (
            <div className="min-h-[150px] flex flex-col items-center justify-center text-center p-4 border border-dashed border-zinc-800 rounded-lg bg-zinc-950/40 gap-2">
              <FileText className="w-8 h-8 text-zinc-600" />
              <p className="text-sm font-medium text-zinc-400">No matches found for "{query}"</p>
              <p className="text-xs text-zinc-600">Try adjusting your keywords.</p>
            </div>
          ) : (
            <div className="min-h-[150px] flex flex-col items-center justify-center text-center p-4 border border-dashed border-zinc-800 rounded-lg bg-zinc-950/40 gap-2">
              <FileText className="w-8 h-8 text-zinc-600" />
              <p className="text-sm font-medium text-zinc-400">Start typing to search...</p>
              <p className="text-xs text-zinc-600">Content collections, publications, and projects are indexed.</p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
