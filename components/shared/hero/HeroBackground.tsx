import React from 'react';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-zinc-950">
      {/* Background Gradients Spotlights */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-zinc-900/40 blur-[130px] pointer-events-none" />
      
      {/* Minimal grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />
    </div>
  );
}
