import React from 'react';

interface HeroHeadlineProps {
  title: string;
  subtitle?: string;
  description: string;
}

export function HeroHeadline({ title, subtitle, description }: HeroHeadlineProps) {
  return (
    <div className="space-y-6 text-center max-w-3xl mx-auto">
      {subtitle && (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 text-amber-500 text-xs font-mono font-medium tracking-wide">
          {subtitle}
        </span>
      )}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-100 font-sans leading-none">
        {title}
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
