/**
 * Runs before first paint so a stored theme choice never flashes the wrong colours.
 * Without a stored choice nothing is set and CSS follows prefers-color-scheme.
 * Kept byte-stable on purpose: the CSP will allow it by SHA-256 hash (PLAN.md §4).
 */
export const THEME_STORAGE_KEY = "theme";

export const LOADER_SEEN_KEY = "loader-seen";

/*
 * Also decides, before paint, whether the first-visit loader shows (home page only, once per
 * session, never under reduced motion). Without JavaScript nothing runs and no loader appears.
 */
export const themeScript = `(function(d){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}try{if(location.pathname==="/"&&!sessionStorage.getItem("${LOADER_SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("is-loading")}catch(e){}})(document.documentElement)`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
