export const KeyboardUtils = {
  isEscape: (event: KeyboardEvent) => event.key === 'Escape',
  isEnter: (event: KeyboardEvent) => event.key === 'Enter',
  isSpace: (event: KeyboardEvent) => event.key === ' ',
  isArrowUp: (event: KeyboardEvent) => event.key === 'ArrowUp',
  isArrowDown: (event: KeyboardEvent) => event.key === 'ArrowDown',
  isTab: (event: KeyboardEvent) => event.key === 'Tab',
  
  // Checks if the user triggered ⌘K / Ctrl + K shortcuts
  isCommandK: (event: KeyboardEvent) => {
    const isCmdOrCtrl = event.metaKey || event.ctrlKey;
    const isK = event.key.toLowerCase() === 'k';
    return isCmdOrCtrl && isK;
  }
};
