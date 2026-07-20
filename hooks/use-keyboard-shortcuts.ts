'use client';

import { useEffect } from 'react';

export function useKeyboardShortcuts(onTriggerSearch: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      const isK = event.key.toLowerCase() === 'k';

      if (isCmdOrCtrl && isK) {
        event.preventDefault();
        onTriggerSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTriggerSearch]);
}
