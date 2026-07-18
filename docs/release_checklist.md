# Release Checklist

This checklist documents the exact step-by-step verification pipeline required before any version tag is promoted to production.

---

## 1. Local Code Sanitization
*   [ ] Execute `npx tsc --noEmit` and confirm 0 errors.
*   [ ] Execute `npm run lint` and confirm 0 errors/warnings.
*   [ ] Confirm no hardcoded secrets or developer API keys exist in git tracking.

## 2. Local Production Build Test
*   [ ] Execute `npm run build` locally.
*   [ ] Verify sitemaps, robots.txt, and RSS XML feeds build successfully.
*   [ ] Verify dynamic routes build parameters are correctly mapped.

## 3. SEO & Structured Data Audits
*   [ ] Verify JSON-LD structured script injections compile cleanly on home, projects, and blogs pages.
*   [ ] Verify canonical URLs match the primary domain target.

## 4. Accessibility Checks
*   [ ] Confirm `prefers-reduced-motion` suppresses transitions completely.
*   [ ] Confirm ⌘K/Ctrl+K keyboard overlays open search dialogs correctly.
*   [ ] Confirm Escape key dismisses open dialogues.
