/**
 * Runs before first paint so a stored theme choice never flashes the wrong colours.
 * Without a stored choice nothing is set and CSS follows prefers-color-scheme.
 * Kept byte-stable on purpose: the CSP will allow it by SHA-256 hash (PLAN.md §4).
 */
export const THEME_STORAGE_KEY = "theme";

export const themeScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
