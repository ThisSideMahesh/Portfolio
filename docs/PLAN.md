# PLAN: thissidemahesh portfolio

Status: draft for approval · Last updated: 2026-11-10
Rule: one phase at a time. Plan → approval → build → verify → commit. Nothing is copied from the old repository.

## 1. Stack (versions checked on npm, 2026-11-10)

| Package | Version | Why |
|---|---|---|
| next | 16.4.5 | Latest stable; App Router, Turbopack, `next/image`, `next/font` |
| react / react-dom | 19.3.1 | Required by Next 16 |
| typescript | 5.9.3 | Changed on day 1: the official Next 16.4.5 template pins `^5`, so 6.x/7.x are not yet the supported path |
| tailwindcss + @tailwindcss/turbopack | 4.3.5 | CSS-first `@theme` tokens; the Turbopack loader is what the 16.4.5 template uses (no PostCSS) |
| motion | 14.11.1 | `motion/react`; `MotionConfig reducedMotion="user"` |
| @next/mdx, @mdx-js/react | 16.4.5, 3.1.1 | Local MDX content, no CMS |
| zod | 4.6.7 | Frontmatter schema and form validation |
| resend | latest at install | Contact form email |
| sharp | via Next | Image optimisation; used once by the photo script |

Node: 24 LTS on Vercel (`engines` pinned). Package manager: pnpm (installed).

## 2. Repository layout

```
/app                 routes (App Router)
/components          UI (doors, hero, timeline, contact, theme)
/content             *.mdx (public facts only)
/content/source      private inputs — git-ignored, never committed
/lib                 content loading + zod schemas, site config, rate limit
/public/images       processed photo exports only (no originals)
/scripts             check-content.mjs, process-photo.mjs
/docs                PRD.md, DESIGN.md, PLAN.md
```

## 3. Guard rails built into the build

`pnpm build` runs `scripts/check-content.mjs` before `next build` and **fails** on any of:
- `TODO` in `/content`, `/app`, `/components` or `/lib`
- an Indian phone pattern (`+91`, or a 10-digit number starting with 6–9)
- `Red Hat Certified`, `RHCSA certified`, `RHCSA-certified`
- `hackathons won`, `hackathon wins`, `won hackathons`
- `coming soon` (any case)
- `CGPA`, `%` next to an exam name, `date of birth`, `DOB`
- `Institutelevel` anywhere outside `/docs`

The private source folder is checked as well: `git ls-files content/source` must be empty.

## 4. MVP (about 1 week)

| Day | Work | Done when |
|---|---|---|
| 1 | Scaffold Next 16 + TS + Tailwind 4 + MDX + Motion; ESLint; tokens and fonts from DESIGN.md; theme toggle without flash; `check-content.mjs`; `.env.example` | `pnpm typecheck && pnpm lint && pnpm build` pass on an empty shell |
| 1 | `process-photo.mjs`: crop, resize, colour-balance, strip EXIF → `/public/images` | The output has no EXIF (verified with sharp metadata); the original stays ignored |
| 2 | Content: write `/content/*.mdx` from the PRD fact sheet, with a zod frontmatter schema | Every fact traces to the PRD; schema errors fail the build |
| 2–3 | Home: loader, hero with self-typing line, four-door wall (Creator locked, `CREATOR_OPEN=false`), featured work, story timeline, contact chooser | Works at 320, 390, 768, 1024 and 1440 px, by keyboard, and under reduced motion |
| 4 | `/tech`, `/teaching`, `/management`, `/projects`, `/projects/[slug]` | Each page answers "what, proof, contact" in the first screen |
| 5 | `/contact`: prefilled `mailto:` chooser and a form (server action, zod, honeypot, minimum fill time, per-IP rate limit, Resend). `/privacy`. Security headers. | Invalid input shows field errors; the honeypot is silently dropped; the 6th request in 10 min gets a 429 |
| 6 | Create the private GitHub repo (`gh repo create --private`), a new Vercel project, set env vars, deploy | The preview URL loads; env secrets exist only in Vercel |
| 7 | Phase gate and fixes | All checks in §7 pass |

**Rate-limit note:** an in-memory limiter only protects one serverless instance. For the MVP that is acceptable with the honeypot and fill-time checks. Phase 2 can move it to Upstash Redis (free tier) if spam appears.

**Security headers (in `next.config.ts`):** `X-Content-Type-Options: nosniff`; `X-Frame-Options: DENY` plus CSP `frame-ancestors 'none'`; `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (production only); `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy` that turns off camera, microphone and geolocation; a CSP with no `unsafe-eval`, `img-src 'self' data: blob:`, `connect-src 'self'`. **Decision to make on day 5:** per-request nonces force every page to render dynamically, which conflicts with the fully static pages Cache Components gives us today. The preferred option is a hash-based `script-src` (the theme script is byte-stable for this reason), checked against Next's current CSP guide in `node_modules/next/dist/docs`.

## 5. Phase 1

1. MDX writing section (`/writing`, `/writing/[slug]`), with an RSS feed.
2. Public-safe resume downloads. **Ask Mahesh before creating them.** Generate them from the PRD fact sheet without phone, address, date of birth or scores; check the PDF text for those patterns before publishing.
3. Open Graph images per page (`opengraph-image.tsx`), in the chosen palette and fonts.
4. `/creator` built from the approved label and line; it returns `notFound()` while `CREATOR_OPEN` is not `true`. A unit check confirms the 404.

## 6. Phase 2

1. Motion polish (loader timing, door hinge, typing cadence) with a reduced-motion pass.
2. SEO: metadata per route, JSON-LD `Person` and `WebSite`, `sitemap.ts`, `robots.ts`, canonical from `NEXT_PUBLIC_SITE_URL`.
3. Custom domain: buy **thissidemahesh.`<TLD>`** at Hostinger, add it on Vercel → Project → Settings → Domains, and copy the exact A / CNAME records Vercel shows into Hostinger DNS. Step-by-step instructions are written at that time from Vercel's Domains page. The old site stays up until the new domain resolves with HTTPS.
4. Analytics with cookie consent. Decision at that point: Vercel Web Analytics is cookie-free, so it may not need a banner. Any cookie-based tool gets a consent banner, and the privacy page is updated.
5. Security, performance and launch checklists; then make the old repo private or clean the phone number from its history.

## 7. Gate at the end of every phase

```
pnpm typecheck        # next typegen && tsc --noEmit (typegen creates the global route types)
pnpm lint             # eslint
pnpm build            # check-content.mjs && next build
pnpm lighthouse       # Lighthouse CLI, mobile preset, against `next start`
```
Pass = all four commands exit 0, Lighthouse mobile ≥ 90 in Performance, Accessibility, Best Practices and SEO on `/`, `/tech`, `/teaching`, `/management` and `/contact`, plus a manual keyboard pass and a check in both themes. Results are reported with real output; nothing is marked passed unless it ran.

Commit only after the gate passes, with a conventional message.

## 8. Open decisions

| # | Decision | Status |
|---|---|---|
| 1 | Palette | Closed: O3 chalk and blackboard |
| 2 | Photo treatment | Closed: A in the hero, B in the story section. The original iPhone file would still improve sharpness |
| 3 | Creator label | Closed: option 1, "Locked, for now" |
| 4 | Social URLs | Closed: recorded in PRD §8 |
| 5 | Style | Closed: Minimalist Professional |
| 6 | TLD for thissidemahesh | Open, needed in Phase 2 |
| 7 | Door photo licence | Closed 2026-11-10: the doors are now drawn in code (components/home/panel-door.tsx); no door photo ships with the site |

Standing instruction from Mahesh: if any of his choices causes a problem (accessibility, speed, consistency, legal), change it to the better option and tell him why. Don't keep a weak decision just because he made it.
