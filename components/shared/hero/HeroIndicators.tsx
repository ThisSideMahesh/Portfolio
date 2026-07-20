import React from 'react';
import { ArrowDown } from 'lucide-react';

export function HeroIndicators() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 select-none animate-bounce">
      <span className="text-[10px] uppercase tracking-widest font-mono font-medium">Scroll Down</span>
      <ArrowDown className="w-4 h-4 text-zinc-400" />
    </div>
  );
}
