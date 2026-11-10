# DESIGN: thissidemahesh portfolio

Status: approved direction · Last updated: 2026-11-10
Current: style **in the manner of therishithakor.com, built original** · palette **Warm stone and ink** (orange 10%) · photo **A (hero) + B (story), black and white** · Creator label **option 1**.

## 0. Style reference (2026-11-10)

Mahesh asked for the same style as https://therishithakor.com/home, with orange as the 10%. I studied it in the browser and took the **style**, not the work.

| Taken (style) | Not taken (that designer's own work) |
|---|---|
| Warm greige ground, near-black ink, one bold sans voice, huge headings at weight 600 with tight tracking and a muted second line | Code, copy lines, images, exact colours and exact layout |
| Dark pill button with a round arrow, a ghost pill beside it | The flip-calendar role card (we use the self-typing line from the original brief) |
| Local time in the header, a small status line | The illustrated arched wooden doors with brass plates (we draw our own panel doors in CSS) |
| Sticky big year beside a vertical timeline | The pull-cord, the cut-out portrait, the coloured blur blobs |
| A dark contact band that flows into the footer | |

### Behaviours rebuilt from Mahesh's screen recording (2026-11-10, 3 min 46 s, 113 frames reviewed)

| Behaviour in the recording | Our original version |
|---|---|
| Full-screen % loader | `components/site/loader.tsx`: band-coloured screen, counter bottom-left, 1 px orange bar; first visit to `/` only, decided before paint by the head script; ≤ 1.2 s; skipped under reduced motion |
| B&W portrait turns colour on hover | Colour-balanced copy of the same crop cross-fades in (700 ms) |
| Hero bottom strip | Class of 2027 · Jalna · "Scroll to explore" |
| Door hover shows what is behind + "Click to enter" | Tagline swaps for 3 facts; leaf eases 12° ajar; knob turns orange |
| Click opens the door and walks through | Leaf swings to 84°, frame scales 1.06, room goes dark, then route change (700 ms); modified clicks and reduced motion navigate instantly; door resets on return (Activity cleanup) |
| Door page: huge title, stacking cards, "Back to the doors" | `/tech`, `/teaching`, `/management`: CSS-sticky cards offset 1.25 rem each; visuals drawn from facts (architecture stack, framework steps, big numbers, tags); fixed back pill |
| Story year rolls digit by digit, "01 / 06" progress, warm glow | Per-digit 0–9 columns sliding (700 ms, 60 ms stagger), "01 / 04" with orange bar, 9% orange radial wash |
| Nav: all sections + local time and date | Home, Tech, Teaching, Management, My story, Contact; IST time and date; full-screen phone menu portalled to `<body>` |
| "Hire me" multi-step modal | Deferred to the MVP day 5 contact form |
| Trading-card "ability card", illustrated arched doors, poster wall | Not rebuilt: that designer's signature artwork |

### Second pass, on Mahesh's request (2026-11-10)

| Behaviour | Our original version |
|---|---|
| Opening: pills stack while the counter climbs, then scatter | `loader.tsx`: Mahesh's name + four door pills stack at 0/18/42/66/88 %, scatter in five directions at 100, warm orange glow; 1.4–2 s, first visit only |
| Flip calendar of roles under "Hi, I'm … / I am a" | `flip-calendar.tsx`: spiral rings, paper page flips up over the rings (rotateX 105°, 650 ms), offset ink card, stacked edges, "01 / 04"; roles Full-Stack Developer, Technical Trainer, Recruitment Lead, Digital Creator (renamed from Video Editor); no pause control (see PLAN §8 #8); type sized by container query so the longest role fits at 320 px |
| Pull-cord theme switch | `pull-cord.tsx`: drag ≥ 28 px or click/Enter; string stretches and springs back with overshoot; orange bead; View Transitions cross-fade; desktop only (phones keep the header button) |
| Door walk-through with zoom into the doorway | Others dim on hover and drop away on click; leaf swings to 86°; frame zooms ×7 into the doorway; black; next page fades in from black (`walk-in.tsx`, layout effect so no flash) |
| Cut-out portrait | Apple Vision foreground mask, on-device; B&W cut-out with colour reveal on hover; soft ground glow so the black hoodie never melts into dark mode |

### Third pass (2026-11-10)

- **Rope lamp** replaces the pull-cord (`components/theme/rope-lamp.tsx`): black ceiling cap, twisted jute rope with a knot, bronze socket, Edison bulb. Lit in the light theme, off in the dark theme (CSS `--bulb-on`, correct before JS). Pull (rubber-band drag) or click/Enter to switch; rope springs back, lamp swings; the new theme spreads as a circle from the bulb (View Transitions). Hero only, tablet and up; the header button works on every size.
- **Story photo** is now a background-free cut-out too.
- **Calendar** has no visible pause button (Mahesh's choice). WCAG 2.2.2 is still met by: hover pauses, click/tap pauses and resumes, it stops after three rounds, never runs in a hidden tab, and never under reduced motion.
- **Motion system** (improve-animations audit): three easing tokens (`--ease-out`, `--ease-in-out`, `--ease-spring`) and three durations (`--dur-fast` 160 ms, `--dur-ui` 260 ms, `--dur-scene` 700 ms) replace nine hand-typed curves; transform/opacity only (cord height and progress-bar width removed); hover motion gated to real pointers; no ease-in; reduced motion removes movement but keeps fades; hero rises with a 70 ms stagger after the opening.
- **Review tool** (development only): `components/dev/feedback-layer.tsx` + `app/api/feedback` (404 in production). Comments are stored in `.feedback/comments.json` (git-ignored); `pnpm feedback` lists open ones.

### Fourth pass (2026-11-10, from Mahesh's door and bulb recordings)

- **Doors are a carved wooden double door** (photo supplied by Mahesh; licence check on PLAN §8 #7). `pnpm door` cuts the background on-device, shrinks the edge 1 px, and slices it into a hollow frame plus left and right leaves (`public/images/door-*.png`). Each leaf swings on its own outer hinge over a dark doorway; brass name plate on the lintel; Creator dimmed with a brass padlock on the latch and a small "locked" jiggle on hover.
- **Hover (desktop)**: the other doors fade to 8 %, both leaves ease 14° ajar, "Click to enter" shows, and a panel with the door's name, tagline and three facts appears in the space the other doors left (right side for the first two doors, left for the last two). Phones show the tagline under each door.
- **Click**: leaves swing to 104°, the door zooms ×6.5 into the doorway, the room goes black, the page fades in. Hover rules are disabled while opening (they used to out-rank the opening rule and hold the leaves at 14°). Measured on the production build: 60 fps, worst frame 18 ms, no long tasks.
- **Lamp** is now fixed in the right margin on every section (≥1280 px, centred in the gutter so it never covers content). A click or tap plays the pull by itself: 34 px dip in 190 ms, theme switch at the bottom, spring back and swing.
- **Story line**: a track, an orange fill that grows with scroll (scaleY) and a glowing pointer riding its end (translateY); entry dots fill in as the pointer passes. One passive scroll listener, one update per frame.

### Fifth pass (2026-11-10): drawn panel doors

The carved wooden photo door is replaced by a **modern panel door drawn in code** (`components/home/panel-door.tsx`), after the style Mahesh chose: casing and skirting, flat leaf with stepped mouldings, raised panel with a thin brass inlay, brass lever handle on the left, brass hinges on the right. Drawing it instead of using a photo means each door can be unique, scales crisply, works in both themes, and ships no third-party image (the licence question in PLAN §8 #7 is closed).

| Door | Colour | Panel design |
|---|---|---|
| Tech | navy `#1f2c40` | brass circuit traces with solder nodes and a chip |
| Teaching | chalkboard green `#2c4437` | a blackboard with chalk lines on a wooden chalk ledge |
| Management | burgundy `#5a2731` | two stacked panels; brass org chart (one node to three) on top |
| Creator | charcoal `#36322e`, locked | brass ring with a play mark; dimmed, padlock over the handle |

Hover: the handle turns 18°, the leaf eases 16° ajar on its right-hand hinges. Click: the handle turns, the leaf swings to 100°, the door zooms ×6.5 into the doorway, black, page fades in. Headline: "Open a door. / Behind it is my work." (Mahesh's wording, grammar tidied).

### Review round 1 (Mahesh's on-site comments #1–#10, 2026-11-10)

#1 hero strip: "Available for work from 10 December 2026" with an orange dot · #2 "Onsite-first" · #3 header taller (72 px), wordmark 20 px bold, nav 15 px medium, time pill medium · #4 story photo removed · #5 contact label "Available for internships" · #7 footer "Hire me for" · #8 "Digital footprint" (singular, the standard phrase) · #9 footer flower is the 🌸 emoji again (Mahesh's choice) · #10 the four contact pills became one "Hire me" button with a dropdown of the four prefilled-email options. The full name moved to a footer line ("© Mahesh Namdev Khandebharad") so it stays visible.

### Door walk-through, black-screen fix (2026-11-10)

Reported: opening a door could leave a black screen. Cause: the arriving page's cover faded out on `requestAnimationFrame`, which browsers pause or delay when a window is unfocused or busy, so the cover could stay up indefinitely. Fix: the cover fades with a CSS animation (browser-timed) plus a 1.2 s safety timer; the cover now uses the page colour (`--bg`), so there is no black flash in the light theme; routes are prefetched on hover/focus; and if the page has not changed 3 s after navigating, the cover lifts and the browser loads the page directly. Verified with `requestAnimationFrame` disabled: cover gone 1.75 s after the click.

Hero copy now: "Hi, I'm Mahesh." / "I am a" / calendar. "Final-year B.Tech CSE" removed; the full name moved to the hero's bottom strip and the h1's screen-reader text.

**Why not a 1:1 copy:** it is another designer's original work (copyright and credibility), recruiters who have seen it would notice, and the first brief itself said "do not copy its code, text, images, colors or exact layout".

## 1. Direction

**Warm stone and ink, with one orange.** Big, confident type on a calm warm ground; black-and-white photography so orange is the only colour on the page; generous space; pill buttons. It should read like a confident personal site rather than a template, and be scannable in under a minute.

**The one memorable thing:** the four-door wall. Everything else stays quiet so the doors can carry the page.

The minimalist rules below still apply, except where §0 replaces them: pill buttons and a larger radius (24 px) on photos are now part of the style.

### Minimalist rules adopted (from the `minimalist-ui` skill)
- Large vertical spacing between sections (96–128 px on desktop, 64 px on phones); content width max 1120 px, text width max 68 characters.
- Borders are exactly 1 px in `--line`; no drop shadows anywhere (a 2 px lift on hover is the only depth).
- Radius 6 px on buttons and inputs, 12 px max on cards, 0 on doors and the photo frame. No pill shapes on large elements.
- No gradients, glassmorphism, neon, stock art, or icon-font libraries; icons are a few hand-drawn inline SVGs with one stroke width.
- Copy avoids "elevate", "seamless", "unleash", "next-gen", "game-changer" and "delve".

### Where this doc overrides the minimalist skill (and why)
- **No scroll-entry fades.** The skill asks for them, but fades on every block are a common tell of generated pages and slow scanning. Content is visible on arrival.
- **Orange accent instead of black buttons and pastels.** Mahesh chose orange as the 10%.
- **Anek + Hind instead of an editorial serif.** This avoids the cream-plus-serif cliché and keeps Latin and Devanagari in one family.

### Revision note (why the first palettes changed)
The first proposals (O1 walnut, O2 sage) paired a cream ground with a high-contrast serif and a warm orange. That is the most common pattern on generated sites, so it would read as templated. The orange is Mahesh's own choice and stays. The cream ground and the serif were my choices, so I replaced them:
- **Ground:** chalk-white and blackboard green-black instead of cream and brown-black.
- **Type:** Anek (an Indian type family from Ek Type, with a Devanagari companion) instead of Source Serif. One family now carries both the name and श्री स्वामी समर्थ.

O1 and O2 remain available below if Mahesh prefers them.

## 2. Colour: 60 / 30 / 10

Rule: 60% quiet ground, 30% supporting surface, 10% orange (buttons, links, focus, active door, key numbers). Text is neutral and not counted. Status colours sit outside the split.

### Current: Warm stone and ink (from 2026-11-10)

| Token | Role | Light | Dark | Measured contrast (light / dark) |
|---|---|---|---|---|
| `--bg` | 60: page ground | `#ebe7e1` | `#171514` | n/a |
| `--surface` | 30: doors, cards, pills on hover | `#dfd9d1` | `#221f1d` | n/a |
| `--line` | 1 px borders | `#cfc7bd` | `#34302c` | decorative |
| `--ink` | text | `#1c1a19` | `#ece7e1` | 14.1 / 14.8 on bg; 12.4 / 13.3 on surface |
| `--muted` | secondary text, second headline lines | `#5e5852` | `#a39a91` | 5.7 / 6.6 on bg; 5.0 / 5.9 on surface |
| `--accent` | 10: arrow circles, caret, knobs on hover, status dot, focus | `#c44d00` | `#ff7a1a` | 3.9 / 7.0 vs bg (UI ≥ 3) |
| `--on-accent` | arrow on the accent circle | `#ffffff` | `#171514` | 4.8 / 7.0 |
| `--accent-text` | links in text | `#a33f00` | `#ff8f3f` | 5.2 / 8.0 on bg; 4.6 / 7.2 on surface |
| `--band`, `--band-ink`, `--band-muted` | always-dark contact band and footer | `#1c1a19`, `#ece7e1`, `#8f877f` | `#0f0e0d`, same, same | ink 14.1 / 15.7; muted 4.9 / 5.5; orange on band 6.6 / 7.4 |

All pairs pass WCAG AA in both themes.

### Previous: O3 Chalk and blackboard (superseded 2026-11-10)

| Token | Role | Light | Dark | Measured contrast |
|---|---|---|---|---|
| `--bg` | 60: page ground | `#f2f3f0` chalk | `#121815` blackboard | n/a |
| `--surface` | 30: doors, cards, nav, footer | `#dde3e1` slate | `#1c2521` board panel | 1.17 / 1.14 vs bg |
| `--line` | 1 px borders and dividers | `#cfd6d4` | `#2a3530` | decorative, not text |
| `--ink` | body text | `#1b2120` | `#e6ebe6` | 14.7 / 14.9 on bg; 12.6 / 13.0 on surface |
| `--muted` | secondary text | `#525c5a` | `#9aa7a1` | 6.2 / 7.2 on bg; 5.3 / 6.3 on surface |
| `--accent` | 10: button fill, focus ring, active marker | `#c44d00` | `#ff7a1a` | 4.3 / 6.9 vs bg (UI ≥ 3) |
| `--on-accent` | text on an accent fill | `#ffffff` | `#121815` | 4.8 / 6.9 |
| `--accent-text` | links and emphasis in text | `#a33f00` | `#ff8f3f` | 5.8 / 7.9 on bg; 4.9 / 6.9 on surface |
| `--success`, `--danger` | form feedback only | `#1f6b3a`, `#b42318` | `#6fcf8e`, `#ff8a80` | to be verified at build |

All pairs pass WCAG AA. Body text ≥ 4.5:1 everywhere; UI marks ≥ 3:1.

### Alternatives (shown to Mahesh earlier)
- **O1 Paper, walnut and orange:** bg `#f7f3ec` / `#191613`, surface `#ebe3d6` / `#25211c`, accent `#c2410c` / `#ff8a3d`, accent-text `#a8380a`.
- **O2 Paper, sage and orange:** bg `#f5f2ec` / `#141816`, surface `#e3e6dc` / `#1e2420`, accent `#c2410c` / `#ff8a3d`, accent-text `#a8380a`.

### Theme behaviour
- Defaults to the system setting (`prefers-color-scheme`). A toggle in the header stores the override in `localStorage`. A small inline script sets `data-theme` before paint, so the page never flashes the wrong theme.
- Tokens are defined once as CSS custom properties and mapped into Tailwind v4 `@theme`. Components use only semantic names (`bg-bg`, `text-ink`, `bg-accent`), never raw hex.

## 3. Type

| Role | Face | Use |
|---|---|---|
| Display | **Anek Latin**, variable (weight 100–800, width 75–125) | Name, page titles, door names, big numbers |
| Display (Devanagari) | **Anek Devanagari**, same design | Only the dedication line in the footer |
| Text | **Hind**, 400 and 500 (Indian Type Foundry) | Body, labels, buttons, forms |

- Loaded with `next/font/google` and self-hosted at build time, with no runtime request to Google. Subsets: `latin` for all; `devanagari` only for Anek Devanagari.
- **Scale (mobile → desktop, fluid with `clamp`)**, ratio about 1.25: 14 · 16 (body) · 20 · 25 · 31 · 39 · 49 · 61–76 (hero name).
- Body line length is capped at 68 characters; body line height 1.6, headings 1.05–1.15.
- The width axis is the expressive move. The hero name is set **wide (wdth 118, weight 600)**; door names are set **condensed (wdth 82, weight 700)**, so they fit tall, narrow doors. Body copy never uses the width axis.
- **Dedication line:** "Powered by श्री स्वामी समर्थ" followed by a small flower. It sits in the **footer of every page**, centred on its own row, in `--muted`, and nowhere else (not in the hero, not on the doors).
- **The flower is drawn as an inline SVG**, a five-petal blossom in `--accent`, 1em tall, with `aria-hidden`; screen readers read the words only. The emoji 🌸 renders differently on each OS (pink and glossy on Apple, flat on Windows, sometimes a box on old Android) and breaks the one-accent rule. The SVG keeps the meaning and looks the same everywhere. It can be swapped back to the emoji in one line if Mahesh prefers.

### Banned typographic defaults
No all-caps eyebrow labels. No single word picked out in another colour or italic inside a headline. No "A · B · C" meta strings in the UI. No "→" appended to buttons. No monospace label face. No numbered markers (01 / 02) except on the story timeline, which is a real sequence.

## 4. Layout

Mobile first, a 4-column grid on phones, 12 columns from 1024 px up, 16 px side gutter on phones, content left-aligned, max content width 1200 px.

### Home: phone (390 px)
```
┌──────────────────────────┐
│ thissidemahesh    ◐  ☰   │  header: wordmark, theme toggle, menu
├──────────────────────────┤
│ [photo A, 4:5]           │
│ Mahesh Namdev            │  wide display name
│ Khandebharad             │
│ I build full-stack apps▌ │  self-typing line cycles the 3 taglines
│ [Email me] [Résumés]     │  one accent button, one quiet button
├──────────────────────────┤
│ ◄  Tech │ Teaching │ ... ►│  door wall: horizontal scroll-snap
├──────────────────────────┤
│ Featured work (4 cards)  │
│ My story (timeline)      │
│ Get in touch (chooser)   │
│ footer: links, socials   │
│ Powered by श्री स्वामी समर्थ ✿ │  dedication row, every page
└──────────────────────────┘
```

### Home: desktop (1440 px)
```
┌───────────────────────────────────────────────────────────┐
│ thissidemahesh                  Tech Teaching Management ◐ │
├───────────────────────────────────────────────────────────┤
│                                      ┌──────────────┐    │
│ MAHESH NAMDEV                        │              │    │
│ KHANDEBHARAD   (wide, ~72px)         │    photo     │    │
│ I build full-stack apps and fix▌     │              │    │
│ [Email me]  Download résumé          └──────────────┘    │
├───────────────────────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │  TECH  │ │TEACHING│ │ MANAGE │ │CREATOR │  4 tall doors │
│ │        │ │        │ │  MENT  │ │ ▣ lock │  (3:5)        │
│ │ tagline│ │ tagline│ │ tagline│ │ 1 line │               │
│ └────────┘ └────────┘ └────────┘ └────────┘               │
├───────────────────────────────────────────────────────────┤
│ Featured work: 1 large (MediIndex) + 3 small              │
│ My story: horizontal timeline 2020 → 2026, 6–8 stops      │
│ Get in touch: 4 intent buttons → prefilled email, or form │
├───────────────────────────────────────────────────────────┤
│ footer: nav · socials · privacy                            │
│              Powered by श्री स्वामी समर्थ ✿                 │
└───────────────────────────────────────────────────────────┘
```
(The name is shown in capitals in the sketch only for legibility. It is set in sentence case.)

### The doors (updated 10 Nov 2026)
- **The section is a lit hallway.** A warm plaster wall with a ceiling shadow, a small black spotlight above each door casting a warm cone (brighter on hover and focus, opacity only), and a wooden plank floor with a skirting board under the row (md and up). Wall, floor and light have their own light and dark tokens (`--wall`, `--floor`, `--light-glow`, …).
- **Each door is a drawn panel door** (CSS + inline SVG, `components/home/panel-door.tsx`): casing with crown moulding, a lacquered leaf in the door's own colour (tech navy, teaching green, management burgundy, creator charcoal), stepped moulding, a gold motif for the role, a brass name plate, lever handle, hinges, brass kick plate and threshold, and a soft floor shadow.
- Hover or focus: the other doors fade, the handle turns, the leaf eases 16° ajar and a panel says what is behind the door. Click: the leaf swings wide, the view zooms into the doorway, a page-colour cover comes up and the page fades in. Reduced motion and modified clicks navigate normally.
- **Door to door:** on a door page, following a link to another door page (top nav, phone menu, footer) walks there: the hallway appears zoomed into the current doorway, the view steps back, that door closes, the next opens, and the view walks in before the page fades in (`components/door-page/door-swap.tsx`, about 2.7 s). Reduced motion and modified clicks navigate normally.
- **The Digital Creator door** (renamed from "Creator", 10 Nov 2026) stays locked: padlock, a dimmed leaf, a short jiggle on hover, and two strips of yellow-and-black **caution tape** reading "UNDER CONSTRUCTION • DO NOT ENTER". The tape is decorative (`aria-hidden`); screen readers hear "Digital Creator: Locked, for now (under construction)". The words were changed from the requested "under investigation", which on a person's portfolio reads as if *he* is being investigated; caution tape conventionally means a building site.
- Phones: the doors sit in a horizontal `scroll-snap` row with the next door peeking in, and the tagline sits under each door instead of the hover panel. Desktop: all four in one row.

### Role pages (`/tech`, `/teaching`, `/management`)
Door colour band at the top, tagline, then: the proof first (featured case), then roles with dates, then skills or subjects, then a CTA with that door's prefilled email.

## 5. Motion (Motion, formerly Framer Motion)

One orchestrated moment and responsive feedback. Nothing fades in on scroll.
1. **Loader (non-blocking):** a small percentage counter in the header corner plus a 1 px orange line along the top edge, counting 0 → 100 against real font and hero-image readiness. **The page content is visible underneath from the first paint**, so the loader never delays reading or the Largest Contentful Paint. A full-screen loader would cost recruiters time and Lighthouse points. Shown once per session (`sessionStorage`), capped at 1.2 s, skipped under reduced motion.
2. **Hero entrance:** the name, line, photo and buttons arrive in one staggered sequence (≤ 600 ms total).
3. **Self-typing line:** types each door's tagline, holds 2.5 s, erases and moves to the next. It pauses on hover or focus and while the tab is hidden. Screen readers get one static sentence (`aria-live="off"`, with a visually hidden full text).
4. **Doors:** the 2 px lift, handle colour and underline described above.
5. **Contact chooser:** the selected intent expands to show the prefilled subject before opening the email app.

Reduced motion: `MotionConfig reducedMotion="user"`; the loader is skipped; the typing line shows the first tagline in full; doors don't move. Nothing is hidden waiting for an animation.

## 6. Photo (decided: A in the hero, B in the story section, both black and white)

Update 2026-11-10: both exports are black and white (sharp `greyscale()`, a global adjustment; no face or background edits), so orange is the only colour on the page. The frames have a 24 px radius. `pnpm photo` regenerates them.

Chosen after comparing real crops. A keeps the face large enough to read on a phone. B's full figure suits the slower story section. The colour balance is a 40% grey-world correction (blue ×1.15, red ×0.92) that removes the yellow lamp cast without shifting skin tone.

Source: `content/source/photo.jpg` (1086×1448 copy from chat; the original iPhone file is requested). Night, warm lamp light, lit planting behind.

| | A: Editorial crop | B: Full figure |
|---|---|---|
| Hero frame | 4:5, head to chest | 3:4, three-quarter length |
| Story section | B's frame | A's frame |
| Adjustment | Neutralise the yellow lamp cast | Same, plus a slight global desaturation so the plants recede |

Both: crop, resize and global colour balance only. No face edits, no background removal, no generated imagery. EXIF stripped. Exported as AVIF and WebP through `next/image` with explicit sizes, `priority` on the hero only.
Alt text (hero): "Mahesh Namdev Khandebharad smiling in a black hoodie and glasses, standing outdoors at night beside lit plants."
The frame is square-cornered with a 1 px `--surface` border offset 8 px down and right, like a print pinned to a board.

## 7. Components and shape

- Radius scale: 0 (doors, photo frame), 6 px (buttons, inputs), 12 px (cards). Doors deliberately have no radius, so they read as doors rather than cards.
- One button pair: **primary** (accent fill) and **quiet** (text with an underline that draws in on hover). At most one primary per screen.
- Cards use the 30% surface, with no shadows. Separation comes from the surface step and a 1 px line in a darker shade of the 30.
- Icons: simple inline SVG strokes in ink colour (theme toggle, lock, external link, social marks). No emoji icons, no rockets, no purple gradients, no glassmorphism.

## 8. Creator door copy (decided: option 1)

- **Label:** Locked, for now
- **Line:** "Lessons from what I've built, taught and run. It opens with the first episode."

Never "coming soon". Never branded "Institutelevel-boy" on this site.

## 9. Accessibility

- WCAG AA contrast (measured above) in both themes.
- Skip link first in tab order. Visible focus ring: 2 px `--accent` plus 2 px offset in `--bg`.
- Keyboard: doors are reachable in order; the scroll-snap row also scrolls with arrow keys; the menu traps focus while open and closes on Esc.
- Landmarks, one `h1` per page, headings in order, labels on every field, errors announced and shown under their own field.
- Tap targets ≥ 44 px.

## 10. Self-check before each phase review
- Squint test: one calm field, one medium field, a few orange spots.
- Does any screen look like it could belong to anyone else? If so, revise.
- Remove one accessory (Chanel's rule).

## 11. Audit pass, 10 Nov 2026 (opening animation, recruiter proof)
- **Opening:** the pills now wear their door's colour (name in paper white, Tech navy, Teaching green, Management burgundy, Digital Creator orange), and a top-right caption names the three doors, after the reference's structure. Fail-safe: a timer finishes the opening at 2.4 s even if the browser pauses `requestAnimationFrame`, so the cover can never stick.
- **Proof strip** (`components/home/proof-strip.tsx`) sits under the hero: 95+ recruitment drives, 125+ admission leads, 25,000+ monthly reach, 1st place HackSphere 2025. Numbers only from the approved fact sheet. Plain type and hairlines, no cards. Reason: recruiters give the page under a minute, and the numbers are the strongest evidence for the TPO and recruitment roles.
- **Phones** now see the availability line ("Available for work from 10 December 2026"), which was hidden below md.
- No skeleton screens: every page is static, so there is nothing to wait for.
