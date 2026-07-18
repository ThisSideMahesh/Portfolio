# Testing Strategy

This document details the test pyramid, automation tools, and coverage boundaries.

---

## 1. Testing Pyramid
```
            E2E (Playwright)
          (Critical user flows)

        Integration & Services Tests
        (Feeds, Search, Repositories)

            Unit Tests (Jest)
          (Primitives & utilities)
```

## 2. Key User Journeys (Playwright)
*   **Recruiter Flow:** Landing &rarr; Projects &rarr; Project Details &rarr; Contact.
*   **Student Flow:** Landing &rarr; Blogs &rarr; Publications &rarr; Resources.
*   **Speaker Flow:** Landing &rarr; Experience &rarr; Contact.

---

## 3. CI/CD Quality Automation Pipeline
Every Pull Request to the `main` or `master` branch triggers the GitHub Actions verification workflow (`.github/workflows/verify.yml`):
1.  **Environment Sync:** Bootstraps Node 20 environment and installs cached dependencies via `npm ci`.
2.  **Lint & Types Validation:** Executes ESLint checks (`npm run lint`) and strict TypeScript compiling (`npx tsc --noEmit`).
3.  **Unit Tests Validation:** Executes Jest/Vitest runner checks.
4.  **Static Prerendering Validation:** Compiles sitemaps and route parameters (`npm run build`).
5.  **E2E Validation:** Launches Playwright user journey checks.
