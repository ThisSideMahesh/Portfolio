import React from 'react';
import { Button } from '@/components/ui/button/Button';

interface HeroCTAProps {
  onExploreProjects: () => void;
  onContact: () => void;
}

export function HeroCTA({ onExploreProjects, onContact }: HeroCTAProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
      <Button variant="primary" size="lg" onClick={onExploreProjects}>
        Explore Projects
      </Button>
      <Button variant="outline" size="lg" onClick={onContact}>
        Get in Touch
      </Button>
    </div>
  );
}
