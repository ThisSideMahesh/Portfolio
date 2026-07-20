'use client';

import React, { useEffect, useState } from 'react';

export function HeroScrollSequence() {
  const sequence = [
    "Hello.",
    "I'm Mahesh.",
    "Software Engineer",
    "Linux & DevOps Enthusiast",
    "Technical Trainer",
    "Open Source Explorer",
    "Building Technology That Matters."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % sequence.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [sequence.length]);

  return (
    <div className="h-20 flex items-center justify-center">
      <p 
        className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-amber-500 tracking-tight transition-all duration-500 transform opacity-100 translate-y-0"
        key={sequence[index]}
      >
        {sequence[index]}
      </p>
    </div>
  );
}
