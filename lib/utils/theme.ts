export const ThemeUtils = {
  isSystemLight: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  },
  getStoredTheme: () => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') || 'dark') as 'dark' | 'light';
  },
  setStoredTheme: (theme: 'dark' | 'light') => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }
};
