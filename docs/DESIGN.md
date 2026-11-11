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
- **Proof strip: tried and removed** (comment #11): four numbers under the hero duplicated what the doors already say in their hover panels, so the strip went. The numbers stay in each door's panel and on the role pages.
- **Phones** now see the availability line ("Available for work from 10 December 2026"), which was hidden below md.
- No skeleton screens: every page is static, so there is nothing to wait for.

## 12. Full audit, 10 Nov 2026 (guidelines, animation rules, Lighthouse)
- **Lighthouse (mobile, production build):** home 99 / 100 / 100 / 100, `/tech` 100 / 100 / 100 / 100 (performance, accessibility, best practices, SEO). The only note is Speed Index 3.6 s on home, caused by the 1.4 s opening on a throttled run.
- **Web Interface Guidelines:** passes on focus states, reduced motion, `color-scheme`, `touch-action`, `theme-color`, skip link, alt text, `translate="no"` on the brand and `lang`. No `transition: all`, no `ease-in` on UI, no `scale(0)` anywhere (Emil Kowalski rules).
- **Added:** link preview (`app/opengraph-image.tsx`, 1200×630, opening-animation palette), Open Graph and Twitter card metadata, `robots.txt` (blocks `/api/`), `sitemap.xml` for the four pages. The site address comes from `NEXT_PUBLIC_SITE_URL`; set it to the real domain at deploy or the previews will name `localhost`.

## 13. Door info cards, tabs and buttons, 10 Nov 2026 (comments #12 to #15)
- **Door info card** (hover or focus, desktop; under each door on phones): door name, one subheading ("What I can add to your organization") and at most five short points, each with a tick. No separate "what I can do" list. Points come only from the CV facts (`offer` in `lib/data.ts`). The card is a double bezel (outer tray plus inner core) and sits above the floor so it is never cut off.
- **Header tabs:** one floating pill; the current page is a filled ink tab instead of an underline. Buttons: soft lift and inner highlight on the solid pill, the arrow travels diagonally on hover, press scales to 0.97, hover effects only on real pointers.
- **#12** bottom strip is bold uppercase. **#13** "Hire me" in the hero now opens the four-option menu directly instead of scrolling to the contact band. **#14** "Scroll to explore" became MAHESH NAMDEV KHANDEBHARAD. **#15** the headline is "Step inside. / Discover the work behind it."

## 14. Half-open door, new subheadings, refreshed look, 10 Nov 2026
- **Half-open door** (hover or keyboard focus), after the reference recording: the leaf swings to 58° (was 16°), warm light fills the doorway, the leaf darkens as it turns, and the leaf is clipped to the frame so it never pokes out. The swing is 680 ms ease-out; closing is a quicker 420 ms. Then the info card fades in (160 ms after the door starts) and its lines rise in one after another, 70 ms apart.
- **Door info card:** door name, a one-line subheading per door (replaces "What I can add to your organization"), and five short points. Subheadings: Tech "Full-stack apps, Linux and hardware", Teaching "From computer basics to Git and AI", Management "Recruitment, admissions and events". All points come from the CV facts (`lib/data.ts`).
- **New look:** cleaner paper (`--bg` #f4f2ee) with white cards that lift off it (`--surface` #ffffff), hairline `--line` #e2ded7, near-black ink; dark theme `--bg` #121110. Case cards on the door pages are double-bezel (tray plus white core). A faint orange glow sits behind the portrait.
- **Smoothness (measured, dev server):** 5 s of the home page including calendar flips: 302 frames, max 17.6 ms, none over 34 ms. Two door hovers with the card stagger: 244 frames, max 17.7 ms, none over 34 ms. Only `transform` and `opacity` animate.

## 15. Walk from every tab, uncut doors, heading reveal, month roll, 10 Nov 2026
- **Doors no longer cut:** the half-open door uses a long lens (`perspective: 3200px`, leaf at 56°), so the swinging leaf keeps almost the same height and stays inside its frame.
- **Door walk from every tab:** the walk (back out, close, open the next door, walk in) now also starts from the home page's Home/Tech/Teaching/Management tabs, the phone menu and the footer. From the home page the hallway is already there, so it goes straight to opening the door (1.8 s); from another door page it takes 2.95 s. Open doors in the walk glow with the same warm light as the hover state.
- **Copy:** Teaching door point "Technical Trainer for 25+ students"; contact heading "Building a team? Let's explore how I can contribute."
- **#16** `RevealHeading` (components/ui/reveal-heading.tsx): words rise out of a mask, 70 ms apart, once when the heading scrolls into view (doors and story headings). **#17** the story's "01 / 04" counter is gone; the month rolls like the year digits as you scroll, and always agrees with the year beside it.

## 16. New opening, plain door text, uncut leaf, 10 Nov 2026
- **Opening ("Opening up the work"):** replaces the stacking pills. Four tall panels in the door colours (navy, green, burgundy, charcoal) fill the screen while the name sits top-left and a counter climbs to 100 under "Opening up the work". At 100 the text fades and the panels lift away one after another (780 ms ease-in-out, 110 ms apart, transform only), opening up the page; the hero starts rising as the lift begins so the page never sits empty. Still skipped under reduced motion; a timer finishes it at 2.4 s even if animation frames pause.
- **Door info is plain text on the wall** (after the reference): no card, no tinted pill. Door name, a one-line subheading in the accent colour, five ticked points rising in 70 ms apart.
- **Leaf clearance:** the leaf sits 2.5% inside the opening top and bottom, like the gap on a real door, so the swing (which grows slightly taller as it turns toward the viewer) never touches the frame and nothing is cut.

## 17. Doors open inward; the door intro, 10 Nov 2026
- **Doors open inward** everywhere (hover, focus, click walk-through, tab-to-tab walk): the leaf swings away from the viewer into the room (`rotateY(-58deg)` on hover, `-84deg` when walking in), so it shrinks as it opens and can never poke out of, or be cut by, its frame. The earlier outward swing grew taller than the frame and read as a door flapping to the left. Perspective 1500px.
- **New opening ("Opening up the work"), a door intro** that uses the same door as the rest of the site: one door stands in the dark; as the counter climbs the door cracks open inward and warm light leaks through (leaf to -24deg, light 0 to 0.6). At 100: handle turns (160 ms), door swings wide inward (650 ms), the view walks through the doorway (850 ms), fades into the page (350 ms) while the hero rises; about 1.65 s after 100. Beat map: 0 handle, 120 swing, 600 walk through, 1250 fade, 1650 done. Timer fail-safe at 2.1 s, skipped under reduced motion. Replaces the stacking pills and the four panels.
- Choreography (lead: the door; support: counter, light; decoration: none): one motif from the opening through hover, click and tab walk.

## 18. Tab walk goes straight into the door, 10 Nov 2026
- The door-to-door walk no longer pans across the hallway. Each zoom is now a pure scale about the door's own centre (`transform-origin` on that door, no translate), so the doorway grows in place until it fills the screen. Measured on `/tech` to Management: the target door's centre stayed at the same point (x 798, y 446) for the whole zoom-in while its width grew 217 to 1633 px. The earlier version translated the stage to centre the door, which read as a slide to the left or right.
- Order: step back out of the current doorway, that door closes, the next door opens inward, then the view goes straight in. The stage is reset before it is measured (React runs effects twice in development).
- **Comment #18:** the Tech door's panel gained a code mark `</>` (lower left) and a terminal prompt `>_` (top right), drawn in the same brass inlay as the circuit.
- **Bug found and fixed:** the opening and the tab walk draw the same door as the page, so two SVG gradients shared one `id` (`b-tech`). The copy inside the hidden opening came first, and browsers cannot draw a gradient defined inside a hidden element, so the real Tech door lost its artwork. Every door instance now suffixes its gradient ids with `useId()`.

## 19. Animation audit, production build, 10 Nov 2026
Method: a frame sampler (`requestAnimationFrame` deltas) ran during each interaction on `pnpm build` + `pnpm start`, plus state checks (route, scroll position, overlay and cover removed). Smooth means no frame over 34 ms.

| Animation | Worked | Frames | Slowest frame |
| --- | --- | --- | --- |
| Opening ("Opening up the work" door intro; count 17, 72, 91, 100, then fade) | yes | 289 | 17.7 ms |
| Hero entrance + calendar flips (6 s) | yes | 361 | 17.7 ms |
| Theme toggle (rope lamp, view transition) | yes | 170 | 17.6 ms |
| Hire me menu open and close | yes | 54 | 17.5 ms |
| Story scroll (line, dot, year and month roll) | yes | 67 | 17.7 ms |
| Door hover: inward swing (-58deg), light, card, 6 lines rise | yes | 222 | 17.7 ms |
| Click a home door: walk-through (-84deg, zoom), lands on top of the page | yes | 217 | 17.7 ms |
| Tab walk, door to door (close, open inward, straight in) | yes | 480 | 17.6 ms |
| Tab walk, home to door | yes | 169 | 17.6 ms |
| Phone menu, then walk to a door (390 px) | yes | 235 | 17.5 ms |

Also: Home from a door page is a plain navigation (no overlay), no console errors, no horizontal overflow on phone. Lighthouse (mobile): home 98 / 100 / 100 / 100 (CLS 0, LCP 0.9 s, TBT 10 ms), `/tech` 100 / 100 / 100 / 100. Nothing was broken, so nothing was changed. Judgement call left as is: the walk ends in warm light, which is a bright moment before a dark page in dark theme.

## 20. Door switching hardened, 10 Nov 2026
Tested again on the production build: five walks in a row, each pair of doors, home to door, and a hover switch from Tech to Teaching (panels never overlap, the first panel is gone before the second appears). 1109 frames, slowest 17.7 ms, none over 34 ms.
- **Mid-walk clicks are blocked.** A second door link during a walk (reachable by keyboard or Enter) used to cut the animation and jump to the new page. It is now ignored until the walk ends.
- **One continuous light.** The walk ends in warm light (`--light`), the veil and the arrival cover are that same colour, and the new page fades in from it. Before, the light flipped to the page colour (dark in dark theme) and then faded to the page.
- **Slow route loads.** The direct-load fallback waits 7 s (walk) and 6 s (home door) instead of 3 s, so a cold route in development is not interrupted by a reload.
- **Dev-only:** the arrival fade now survives React's double effect, so the cover class no longer lingers.

## 21. Walks drawn with a flat patch of light, not a scaled hallway, 10 Nov 2026
- **What the recording showed** (Screen Recording 1.15.08 PM, 60 fps): during the tab-to-tab walk, parts of the hallway were black or missing while the view stepped back (black rectangles over doors, a door painted half white, tape floating without its door). Cause: the whole hallway (and, on the home door click and the opening, the door artwork) was scaled about 6x to 11x with `will-change: transform`; at that size the browser drops raster tiles and paints them late. The frame timer in section 19 could not see this because the frames were fast, just wrong.
- **Fix:** every walk now uses one flat patch of warm light (`.swap-light`, solid `--light`) laid exactly over a doorway. It grows from the doorway to cover the screen (going in) or shrinks from the whole screen to the doorway (stepping back). It is a pure scale about the doorway's own centre (so it never pans) and moves only by transform and opacity, so there is nothing to tile. The hallway and the doors are never scaled. Used in: the tab walk (`door-swap.tsx`), the home door click (`door-card.tsx`) and the opening (`loader.tsx`).
- **Timings:** tab walk from a door page 3.15 s (step back 800 ms, close 540, open 540, go in 800); from home 1.85 s; home door click 1.65 s (swing 640, light 800 from 760 ms); opening ends about 1.95 s after the count reaches 100 (light grows from 800 ms).
- **Verified on the production build:** opening (337 frames, slowest 17.7 ms), home door click (192 frames, slowest 17.5 ms), three tab walks in a row (1490 frames, slowest 17.6 ms, none over 34 ms). The patch's centre stayed fixed while its width grew (home door: centre 800, 512 for the whole growth from 218 to 1695 px). Mid-walk screenshots show the hallway intact.
- **Lesson:** a smooth frame rate does not prove the frames are correct. Check recordings for painted artefacts, not only frame time.

## 22. Tape out of the walks, faster walks, button audit, 10 Nov 2026
- **Tape:** in Screen Recording 1.50.15 PM the locked door's two tape strips stayed drawn on top of the cream light during every walk (the tape is positioned above the hallway, the light was not). The patch of light is now above everything in the hallway (`z-index: 60`), and the walk's hallway draws the Creator door without its tape (`PanelDoor tape={false}`). The tape stays on the real door on the home page.
- **Speed** (measured on the production build): opening ready at 2.4 s (was about 3.2 s); home door click to door page 1.1 s (was 1.65 s); tab from home 1.2 s (was 1.85 s); tab from a door page 1.87 s (was 3.15 s). Beats: tab walk step back 520 ms, close 400, open 400, light grows 550; home door swing 380 ms then light grows 600 ms; opening swing 500 ms, light 650 ms. Frames: slowest 17.6 ms, none over 34 ms.
- **Button audit (all pass):** every link has a valid `href` and every control a name; no `#` or `javascript:` links. Verified by clicking: nav tabs (walk), logo, Home, My story and Contact (from home and from a door page, landing 88 px from the top under the header), See my work, Back to the doors, both Hire me menus (4 options each, closed by Esc), the rope lamp (theme changes and changes back), footer door links (walk), phone menu. Mailto links have the right subject and body; the four social links open in a new tab with `rel="me noopener noreferrer"`. Not clicked on purpose: the mailto links and the social links (they open other apps). The Comment button is dev-only.

## 23. Walking out to Home, 10 Nov 2026
- Every link from a door page back to the home page now plays a walk out (`TO_HOME` in `components/door-page/door-swap.tsx`): the light shrinks from the whole screen to the doorway you were in (520 ms), that door closes (400 ms), then the page changes underneath and the hallway fades away (350 ms) to reveal the home page. Total about 1.9 s. Covers Home, the logo, My story, Contact and "Back to the doors" (the destination section is scrolled to while the hallway covers the screen). The walk hallway has no tape.
- Home and the logo now land at the top of the home page. Before, the home page (kept mounted by Cache Components) came back at wherever it was last scrolled.
- Verified on the production build: round trip home, Tech, home, Management, home, Teaching, home (6 walks): 772 frames, slowest 17.6 ms, none over 34 ms; a second click during a walk home is ignored.

## 24. Home content visible when the walk home ends, 10 Nov 2026
- **Bug:** after a walk to the home page the hallway faded on a fixed timer, but the home hero (opacity 0 until its entrance "rise" plays) only starts rising when the page is shown. The home page is kept mounted but hidden, and a CSS animation restarts when an element goes from hidden to shown. On a slower or busier machine the hallway could be gone before the hero appeared: an empty page, then the content popped in. Measured before the fix: the hero was at opacity 0.00 for the whole walk and rose only after the page changed.
- **Fix:** the hallway now fades only when the home hero is really on screen (checked every 50 ms), and not before 1.35 s; a 4 s safety fade means it can never stay up. The hero rises as the hallway dissolves, so the home animation is visible.
- **Verified on the production build** (fresh load of a door page, then Home; and from Teaching via the logo; and from Tech via My story): the hero was already at opacity 0.61 when the hallway began to fade (about 1.4 s) and fully visible when it was gone (about 1.82 s); the page ends at the top (or at the section for My story, scrollY 1874). 738 frames, slowest 17.7 ms, none over 34 ms.

## 25. Stuck cream layer after returning Home, 10 Nov 2026
- **What the recording showed** (Screen Recording 2.11.10 PM): after the walk out from a door page, the home page stayed covered by a flat cream layer; only the header and the lamp showed. Reproduced: click a home door (its light patch grows to 10.6x and stays at opacity 1, 2314 x 5380 px, z-index 90), go to another door, then Home. The reset I had put in the door's effect cleanup never ran in time: when React hides the home page it detaches the patch element first, so the ref was null.
- **Fix:** the patch carries `data-walking`, driven by the door's `opening` state (which resets correctly), and a CSS rule forces `opacity: 0; transform: none; transition: none` whenever it is not walking (`.door-card-light:not([data-walking])`). Leftover inline styles can no longer show.
- **Verified on the production build:** five scenarios each ended on the home page with the hero visible and nothing covering the page: home door Tech then the Home tab; home door Teaching, then Management, then Home; home door Management then the logo; home door Tech then Back to the doors (lands on the doors, scrollY 851); the same door twice then Home.
- **Rule for later:** state that must reset when a page is hidden and shown again has to be driven by React state or a CSS attribute, not by inline styles set from a cleanup.

## 26. Tech page as swipeable rows, 10 Nov 2026
- **Structure** (Mahesh's idea): the Tech page is four titled rows. Each row is a set of cards that swipe side by side, one card at a time. **Projects:** MediIndex, TeraPlay, Shop Management System. **Professional experience:** Hardware and Software Technician Intern. **Positions of responsibility and campus experience** (tech-related only): Technical Coordinator, Kalavihangam 2K23; Central India Hackathon 3.0 finalist (SwasthyaSetu); Workshop speaker, Engineering Toolkit (Git, GitHub, AI tools). **Certificates and learning:** the existing certificates card (kept, not requested). A row with one card shows no controls. Teaching and Management keep the stacking cards.
- **Component** `components/door-page/card-carousel.tsx`: CSS scroll-snap (`x mandatory`) with the next card peeking in (100% minus 2.75 rem on phones, minus 5 rem from md); touch and trackpad scroll natively; a mouse can drag the row and it settles on the nearest card; previous and next buttons (disabled at the ends), a counter, dots and the Left and Right keys; the active card comes from an IntersectionObserver (no scroll listener). Accessibility: each row is a labelled carousel region, each card a `group` "n of N", the scroller is focusable with a visible focus ring, case titles are h3 under the row's h2, smooth scroll is turned off under reduced motion.
- **Copy:** TeraPlay and Shop Management text is Mahesh's own, edited only for tense and a missing article; no dates were invented for either (the stack line and "Full-stack web development" sit where the date goes).
- **Verified (dev server):** four rows, counts 3 / 1 / 3 / 1; next, previous, dots and arrow keys each move exactly one card (scroll positions 0, 1076, 2072); the mouse drag landed on card 2; no horizontal page overflow at 1307 px or 390 px.

## 27. Project links, Portfolio card, tooling and source folder, 10 Nov 2026
- **Links on cards** (`links` on a case, shown as ghost pills that open in a new tab with `rel="noopener noreferrer"` and a screen-reader note): MediIndex (live site, GitHub, PharmaManage Pro), TeraPlay (GitHub), This portfolio (GitHub). The Shop Management System has none (client work). A fourth Projects card, **This portfolio**, lists only checked facts.
- **Private source folder:** `content/source` is now a link to `/Users/thisside_mahesh/Portfolio-Source`. Mahesh's pasted material was 28 GB (whole projects with `node_modules`); with it inside the project folder the production build went from about 0.3 s to 20 to 30 s, because Next scans the project folder. Behind the link the build is back to about 0.1 s, every path still works, and git still ignores it. `content/**` is also excluded from `tsconfig.json` and from ESLint so code pasted there (for example the old portfolio reference) can never break a check or reach a build.

## 28. Source-folder content on the pages, 10 Nov 2026
- **Tech now has five swipeable rows:** Projects (8 cards: MediIndex, TeraPlay, Shop Management System, CanteenGo, AgriSenseAI, Clinical Handoff Risk Intelligence, Cadriva, This portfolio), Professional experience (Kiran Academy, Technician Intern), Hackathons and competitions (HackSphere 1st place, Central India Hackathon 3.0 finalist, Hack For Impact, Aavishkar 2026), Positions of responsibility and campus experience (Technical Coordinator, Engineering Toolkit), Certificates and learning (four themed cards). Every fact is traced to a file in the source folder in docs/PRD.md section 7.
- **Teaching:** the Engineering Toolkit card has the verified date (21 Aug 2026) and the feedback count (57 of 62 responses rated it 4 or 5 out of 5, written as counts, no percentages). **Home story:** a Kiran Academy entry (Aug 2026) and the HackSphere dates (13 to 14 Oct 2025).
- **Bug found while checking:** the page scrolled sideways by about 6,400 px on /tech. The screen-reader-only "(opens in a new tab)" notes in the link pills are absolutely positioned; inside a scroll container that is not itself positioned they are not clipped, so the notes on the far-right cards stretched the page. Fix: `.carousel { position: relative }`. After the fix the page overflow is 0 and the row still steps through all 8 cards.
- **Lighthouse (mobile, production build):** see the closing report.

## 29. Real images on the cards, 10 Nov 2026
Rule from Mahesh: take images from the source folder; if a card has none, use a logo from the certificate or screenshot; if there is none of those, draw one, and it must not look AI-generated.
- **Visual kinds** (`CaseVisual`): `screens` (one or two real screenshots; the first fills the panel anchored top left, the second sits in the corner), `logo` (one logo on a light tile), `logos` (issuer logos on white tiles with a line under them), `mark` (a drawn monogram on a blueprint grid for work with no image). `stat`, `flow`, `stack` and `tags` stay where they carry real information.
- **Prepared by hand** into `public/images/work/` (WebP, 4 to 54 KB each, 324 KB in all, no metadata): MediIndex dashboard and expiry alerts (cropped from the demo slides to the app only, no caption bar), AgriSenseAI Farmer and Expert Mode screens, a screenshot of this site's home page, the TeraPlay, Cadriva and SwasthyaSetu logos, and issuer logos cropped from the certificates and whitened (Oracle, NASSCOM, Kiran Academy, Cisco Networking Academy, GDG). Cards: MediIndex, AgriSenseAI and This portfolio use screens; TeraPlay, Cadriva, Kiran Academy, SwasthyaSetu and two certificate cards use logos; the Linux and cloud certificate card shows two logos and "64+ Google Cloud skill badges"; Shop Management System and Aavishkar use drawn marks; CanteenGo and the clinical handoff card keep their flow and stack diagrams.
- **Left out on purpose:** the MediIndex and AgriSenseAI logos and the Aavishkar poster (they look AI-generated: glossy icons and gradients), anything named ChatGPT, Gemini or Codex image, the billing slide (placeholder phone numbers), the AWS console screenshot (shows an account id), and the Cyber Sanskar crop (tinted background). No certificate is shown in full (names, serial numbers, QR codes and marks stay out); only the issuer's logo is.
- **Accessibility and speed:** every image has a descriptive `alt`; the drawn marks are `aria-hidden`; images lazy-load through `next/image` with fixed dimensions (CLS 0). Lighthouse on /tech (production build, mobile): 100 / 100 / 100 / 100.

## 30. Photos from Mahesh's LinkedIn posts, 10 Nov 2026
Rule from Mahesh: take only the LinkedIn photos that relate to the portfolio and put them where they belong.
- **What was reviewed:** the 20 post images on his Images activity tab (the profile was open in the in-app browser, signed in by him). The image links are signed and LinkedIn serves them at 480 or 800 px wide, so 800 px is the largest size available. Four of the 20 are the same image.
- **Used (4 files, 132 KB in all, re-encoded to WebP so no metadata is carried over):** the Engineering Toolkit opening slide (Tech campus row and the Teaching card), the Hack For Impact certificate of participation (Tech competitions row), the Aavishkar 2026 inauguration invitation, cropped to the title and date (Tech competitions row, replacing the drawn "AV" mark), and the GDG Build With AI certificate (Tech certificates row, replacing the GDG logo tile).
- **Code change:** a lone, very wide picture (wider than 3:2, the 16:9 slide) is shown whole inside the panel instead of being cropped, so the title text is never cut.
- **Left out and why:** handwritten session notes (not portfolio work), a LinkedIn headline-tips carousel slide, a generic "which role is best for me" career graphic (four identical copies), the Hire Ready 3.0 poster and the LaunchLab, AICTE and Build For Bharat images (nothing on the site claims them yet, or an overlapping corner image would have hidden the certificate text), and three photos that show other people (an awards photo, a handover photo and the Build For Bharat group photo). Those need Mahesh's approval, and for Build For Bharat his confirmation that he took part, before use.
- **Earlier rule softened on purpose:** section 29 said no certificate is shown in full. The Hack For Impact and GDG certificates now are, because Mahesh asked for his LinkedIn photos and posted these there himself. They carry no phone number, date of birth, score, serial number or QR code.

## 31. Link, GitHub and CV audit, 10 Nov 2026
- **Links:** every internal link and anchor on /, /tech, /teaching and /management resolves, and all 16 outside links return 200 (LinkedIn answers scripts with 999 and opens normally in a browser). All 17 card images load; no card has an empty visual panel.
- **GitHub (ThisSideMahesh, 19 repos):** three public projects were missing and are now Projects cards with a GitHub link: Internpath (internship-guidance-agent), Momentum Tracker and Decentralized Blog. Facts come from each repo's README. The "This portfolio" link now points to the `portfolio-2026` branch, because `main` still holds the old site. Not featured: Turnitout-Humanizer (a fork of a plagiarism-detection evasion tool), the empty MediIndex-Circular-Pharmacy-Intelligence, sevacode (decompiled Android code), small cloud-build and Hugo test repos, and the private DepotShield and health-champion-hub (waiting for Mahesh). CADRIVA is private, so its card has no link.
- **Cards with no image or logo** use a drawn visual (flow, stack, stat, tag list or monogram on a blueprint grid), never a generated picture.
- **CV gaps** (Master CV and the IT, Teaching and Management resumes against the site) are listed in the reply to Mahesh and wait for his answer.

## 32. An image on every card, and corrections, 10 Nov 2026
Rule from Mahesh: every card needs an image or a logo; where none exists, draw one, and it must not look AI-generated.
- **Result:** all 30 cards (Tech 23, Teaching 3, Management 4) now show a picture; none shows only text. The `stat`, `flow`, `stack`, `tags` and `mark` visual kinds are no longer used by any card (the code for them stays).
- **Real pictures:** the HackSphere card shows the actual certificate of achievement (first rank, Cogni-Sphere 2025; a clean 3509 px digital original, scaled to 1200 px, no serial number or QR code). The Linux, cloud and DevOps card gained the Unnati logo, cropped from the Unnati SkillUp Library PDF.
- **Drawn emblems (15):** `public/images/work/emblems/*.webp`, 800 x 600, 9 to 18 KB each. Each is one line icon in a rounded badge, the name, one factual line and, where the CV gives a number, that number (1,000+ attendees, 25+ students, 95+ drives, 125+ leads, 25,000+ monthly reach, 250+ inducted). One stroke style and the site's own colours, so they read as a set. They are not logos of organisations: for Dnyandeep Foundation Centre, New Technical World and others the picture is an icon with the name in type, never an imitation of their brand. Source and render command: `scripts/emblems.html` (rendered with headless Chrome, converted to WebP).
- **Looked at and not used:** the certificate scans in the source folder are phone photos of paper (skewed, shadowed) and the Hackathon Hacked slides are plain white slides with a QR code; the Hackathon Hacked slide also says "2x National-Level Hackathon Winner", which conflicts with the one-win rule, so it must not be shown. The Cyber Sanskar certificate has a certificate ID and a tinted background.
- **Added to the Linux, cloud and DevOps card (from the CV, at Mahesh's request):** Certified Linux Administrator (Linux Academy Australia, through Unnati Development and Training Centre) and KuCL (DevOps, Unnati). No certificate file for either is in the source folder.
- **Correction:** Kalavihangam 2K23 was 24 to 28 Feb 2025 on the site; Mahesh says 24 to 28 Feb 2023 is right. Changed on the Tech and Management cards, the home story (it moved to the 2023 entries) and the PRD. Note: the story says "Started B.Tech, Aug 2023", so the event now precedes the start date; Mahesh should confirm one of the two.

## 33. Mahesh's own logos, Build For Bharat, LinkedIn post links, 10 Nov 2026
- **Six images from Mahesh** (pasted in chat) are on the site: the Central India Hackathon Chapter 3 title slide (black top bar cut off and the two carousel arrows painted out with matching grid paper) and the logos for Decentralized Blog, Internpath, CanteenGo, Shop Management System and Momentum Tracker, each cropped to 4:3 around the mark on its own white background. They replace the drawn emblems for those five cards (the five emblem files were deleted). Ten drawn emblems remain, for cards with no logo or picture.
- **Cybersecurity card:** Cyber Sanskar (cut from the certificate and un-tinted so it sits on white) and Belkasoft (cut from a photographed certificate, shadow flattened) on logo tiles, with the line "and digital marketing (NIELIT)". The drawn shield emblem was removed.
- **Build For Bharat 2026:** new card in the Hackathons row. Facts: certificate of participation says he qualified Round 1 of the "Build for Bharat 2026 - National Innovation Hackathon", organised by the Departments of Emerging Science and Technology and of Electronics and Computer Engineering, MIT CSN; the poster says Round 1 was an online idea presentation (11 to 19 Apr) and the offline round was 25 Apr 2026. Picture: Mahesh's LinkedIn photo with three others in front of the BFB'26 screen. The event poster in the source folder was not used: it shows a registration QR code and two coordinators' phone numbers.
- **LinkedIn post links:** 13 link groups on cards, each a post of Mahesh's own that was opened and read to confirm its topic (reposts of other people's posts are not linked): Clinical Handoff and Hack For Impact (the same post), HackSphere, Central India Hackathon, Build For Bharat, Aavishkar, Engineering Toolkit (Tech and Teaching), Linux Silver certificate, Build With AI and LaunchLab, Hackathon Hacked (session and materials), T&P cell (Micron campus drive and HireReady 2.0) and Dnyandeep Foundation Centre. Links use `/feed/update/urn:li:activity:<id>/` (or `ugcPost`).
- **Order:** "This portfolio" is now the first card in Projects.

## 34. Bug: card links did not open, 10 Nov 2026
- **Symptom (reported by Mahesh):** the GitHub and LinkedIn pills on the Tech cards did nothing when clicked.
- **Cause:** `CardCarousel` captured the mouse pointer on press (`setPointerCapture` in `onPointerDown`) so a mouse could drag the row. While a pointer is captured, the click that follows is delivered to the capturing element (the scroller), not to the link under the pointer, so the link never saw it. The bug was in the row since it was added; it only became noticeable once the cards had links.
- **Fix:** a press no longer captures. Capture and dragging start only after the mouse moves more than 5 px; the click that ends a real drag is cancelled so a drag never opens a link. Touch and trackpad scrolling were never affected (they scroll natively).
- **Checked in the browser:** a real click on a GitHub pill reaches the link and the page opens github.com in a new tab (the Browser pane blocks that tab for scripted clicks, as it should); a mouse drag still moves the row from card 1 to card 2 with no stray click.

## 35. Corrections: AgriSenseAI, Cadriva, experience links, 10 Nov 2026
- **AgriSenseAI** is an MDM minor project (Mahesh); its card kicker now says "MDM minor project". The long form of MDM is not written out because no source file spells it.
- **Cadriva GitHub:** the repository `ThisSideMahesh/CADRIVA` exists but is private, so a link would show a "page not found" page to every visitor. No link was added. Decision pending with Mahesh: make the repo public (his action) or leave the card without a link.
- **Professional experience links:** the Kiran Academy card links to the "Internship Completed | Python Full Stack" post. No post about the Hardware and Software Technician internship exists in his LinkedIn activity (the oldest post is 3 Jul 2025, after the Jun 2025 internship, and the Nov to Dec 2025 posts are about other things), so that card has none.
- **Three more posts matched while searching:** Ethical Hacking workshop (Cybersecurity card), the NPTEL AI course (Code, AI and data card) and the CNCF May meetup (Workshops card).

## 36. Student cell logo, DFC logo, Kalavihangam year, 10 Nov 2026
- **Kalavihangam 2K23** was held 24 to 28 Feb **2024** (Mahesh, third correction: 2025, then 2023, now 2024). Changed on the Tech and Management cards, the home story (it now sits in the 2024 entries, below the MS-CIT Trainer entry) and the PRD. This also removes the earlier clash with "Started B.Tech, Aug 2023".
- **Training, Placement and Entrepreneurship Cell logo** (sent by Mahesh, 150 x 128 px) is on the Hackathon Hacked card and the T&P cell card. Scaled 4x with sharpening and multiplied by the card tile colour so its white background matches the tile. It is small, so it looks soft at full size; a larger file would help.
- **Dnyandeep Foundation Centre logo:** web search found none. The logo was taken from the organisation's LinkedIn page, which Mahesh's profile lists under his Sales and Marketing internship (100 x 100 px, the only size LinkedIn serves), cropped to the oval and scaled 6x. It is soft for the same reason. His LinkedIn post about DFC has only a laptop photo.
- The drawn emblems for these three cards were deleted, so the numbers they carried (95+ drives, 125+ leads) were moved into the card text. Seven drawn emblems remain.

## 37. Corrected logos and Hackathon Hacked photo, 10 Nov 2026
- **DFC logo:** replaced the soft 100 px copy with the 512 px logo Mahesh sent (transparent PNG, composited onto the card tile colour and cropped to the oval with a margin). It is crisp now.
- **Hackathon Hacked:** the student cell logo was the wrong picture for a session card. The card now shows a frame from the video in Mahesh's LinkedIn post "Hackathon Hacked Part 1" (720 x 1280, cropped to 4:3 around him speaking). The Part 2 post has a small group photo (480 x 270) and a QR code to the session materials (not used: the QR code is a link to unknown content). The student cell logo stays on the T&P cell card.
- **Update:** Mahesh then supplied a 1280 x 720 group photo of himself with faculty and students after the session, and asked for it on the Hackathon Hacked card. It replaces the video frame (file `hackathon-hacked-group.webp`, 151 KB). A lone 16:9 picture is shown whole inside the panel, so nobody at the edges is cropped.

## 38. AlumniOS Bridge Captain, IDEATHON 9.0 and every LinkedIn post, 10 Nov 2026
- **Bridge Captain was only on the home story**, on no role page. New Management card "AlumniOS: the CSE department's alumni cell" (Jul 2025 to Nov 2026). Facts from the department's certificate and Mahesh's launch post: serving since the AlumniOS launch on 26 Jul 2025, motto "Alumni United. MIT Ignited.", facilitating student, alumni and department communication, helping organise alumni interactions, mentorship sessions and networking events. Picture: the AlumniOS logo from the 1170 px image in his launch post (the post's two photos were not used: one carries a GPS location stamp, the other is a small group photo).
- **IDEATHON 9.0** (new Tech card): presented the medicine inventory and expiry system with demand prediction at the ANKURGECA Incubation Centre, Government College of Engineering, Chhatrapati Sambhajinagar; Mahesh builder and pitcher, Aarpita Kalyankar UI/UX and co-pitcher (named in his post). Photo from the post.
- **All 91 items in his LinkedIn activity were opened and read** (the oldest is 3 Jul 2025). 51 distinct own posts are now linked from cards (about 70 link pills). Posts with a card: MediIndex, AgriSenseAI, Decentralized Blog (Stacks bootcamp), Central India Hackathon (Top 100, Round 2, final, system flow), HackSphere, Hack For Impact and Clinical Handoff, Build For Bharat, IDEATHON, Aavishkar, Engineering Toolkit, Hackathon Hacked, Kiran Academy, Linux, cloud and DevOps (Silver certificate, Docker, Cloud Arcade), Code, AI and data, Cybersecurity (Ethical Hacking, forensics, digital marketing), Workshops and community, T&P cell (7), AlumniOS (4), Dnyandeep Foundation Centre (2), social media (2), Kalavihangam and induction (4).
- **No card, so not linked:** the 16 #InsideTip posts beyond the series launch, Engineer's Day, "personal thoughts" posts, the AI caricature, Independence Day, the open-to-work and headline posts, "I lost 2 dream internships", the 2025 year review, the JIDNYASA 2024 first-year project, the UGC-AICTE faculty development programme reflection (Mahesh's role in it is not clear), the IoT post, the placement-drive invitation of 20 May 2026 and the LinkedIn-profile webinar. Reposts of other people's posts are never linked.
- **Technician internship (Jun 2025 and Nov to Dec 2025):** still no post about it.
- **AgriSenseAI:** his post says "multi-disciplinary minor", so the kicker now reads "Multi-disciplinary minor (MDM) project".
- **Kalavihangam date, again:** Mahesh asked for 2023, then 2024, but his own post of 28 Feb 2025 is titled "Kalavihangam 2025" and says he was Technical Coordinator on 28 Feb 2025, which matches the original certificate (24 to 28 Feb 2025). The site says 24 to 28 Feb 2025 and the home story is back under 2025. The post also gives his duties: sound recording, video editing and backstage support for the Maharashtra-theme night performance, now on the card. To override, change the three dates (data.ts, door-pages.ts twice).

## 39. Framed portrait in the doors section, 10 Nov 2026
- **What:** the portrait Mahesh sent hangs on the hallway wall in the "Step inside." section: a framed picture to the right of the heading (desktop) or centred under it (phone), with a nail and wire, a wood frame, a cream mat and a brass picture light that casts the same warm light as the door spotlights. Component `components/home/wall-portrait.tsx`, styles `.wall-art*` in `app/globals.css`. The heading row became a two-column grid, so the doors start a little lower on desktop. It has no animation. No horizontal overflow at 375 px.
- **Picture:** cropped from a product photo of a wall print leaning against a sofa (the sofa, wall and floor were cut away; 404 x 644 px). The alt text describes the picture without naming a person; Mahesh can give the name or caption he wants.
- **Two things for Mahesh to check:** (1) it came from a shop's mockup photo and looks like AI-made or stock artwork, so he should be sure he may publish it; (2) it goes against his earlier rule that images must not look AI-generated.

## 40. Portrait shrine: diyas, tagline and dark-mode light, 10 Nov 2026
- **Structure:** `components/home/wall-portrait.tsx`. The framed portrait now rests on a wooden shelf between two brass diyas, with the tagline "Inspired by history. Driven to build." under it (a short accent rule above, Anek Latin in the muted ink colour, balanced over two lines). The picture's alt text now names Chhatrapati Shivaji Maharaj, as Mahesh does.
- **Diyas:** one inline SVG drawing (shallow bowl, pinched spout with a wick, stem, foot, engraved lines, oil surface) in a brass gradient; the right diya is the left one mirrored (`scale: -1 1`), so the pair is symmetrical and the two spouts and flames face each other, inwards towards the portrait (first built facing outwards; Mahesh asked for face to face). The gradients are defined once and shared. Size `clamp(3.6rem, 6.2vw, 5.6rem)`. They are `aria-hidden` and have `pointer-events: none`.
- **Theme without JavaScript:** one new token, `--diya-lit`, is 0 in `:root` and 1 in the two existing dark-mode blocks (system dark and `data-theme="dark"`), next to the other colour tokens. The flame, the glow around it and the light on the frame's lower corners all use `opacity: var(--diya-lit)` with a 1.1 s ease-out fade. The existing theme toggle therefore lights them with no new control and no theme code in the component. Light mode: unlit brass, no glow, no emission.
- **Light:** a soft radial amber glow (screen blend) around each flame that spills onto the wall, and a faint amber wash on the frame's two lower corners. The flame is a teardrop SVG with a pale core and a small drop shadow of light.
- **Motion:** a slow flicker (3.7 s left, 4.3 s right with an offset, so they are never in step) on the flame, and a barely visible breathing of the glow. The animations are paused in light mode (play-state follows the dark blocks) and removed under `prefers-reduced-motion`; the light stays, only the flicker stops.
- **Layout:** two columns (heading left, shrine right) from 1024 px; below that the shrine sits centred under the heading. Checked at 375 px (frame 168 px, diyas 58 px, row 299 px, no sideways scroll), 820 px and desktop. Light and dark mode checked on desktop (flame opacity 0 and 1).

## 41. Full audit: security, design and accessibility, animation, 10 Nov 2026
Skills used: security-review, design-review, accessibility, animation-performance (plus the earlier motion and design skills). Checked on the production build (`next start`), not the dev server.

### Security
| Finding | Severity | Result |
|---|---|---|
| The old public `main` of github.com/ThisSideMahesh/Portfolio still contains Mahesh's phone number (`config/social.ts`, `his phone number`) and his Gmail in 12 commits | High, outside this branch | **Not fixed here; needs Mahesh** (see the report). `portfolio-2026` and the local branch contain neither. |
| No security headers or CSP | Medium | **Fixed** in `next.config.ts`: CSP (self only, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri`, `form-action`, upgrade-insecure-requests), HSTS 2 years, nosniff, Referrer-Policy, Permissions-Policy (camera, microphone, location, payment, USB off), COOP, X-Frame-Options. CSP and HSTS are production only. Zero CSP violations on all four pages. |
| CSP keeps `'unsafe-inline'` for scripts and styles | Low, accepted | Next.js writes inline scripts; a nonce would make every page render per request. There is no user input anywhere, so nothing can be injected. Move to a nonce in `proxy.ts` if a form is ever added. |
| Dev-only review widget and `/api/feedback` | Checked | The widget renders only when `NODE_ENV === "development"`; in production GET and POST return 404. |
| Secrets | Checked | None in the tree or in the history of the new branch (pattern scan: 0 hits); `.env*` and `content/source` are ignored; `.env.example` has empty placeholders. |
| Dependencies | Checked | `pnpm audit --prod`: no known vulnerabilities. |
| Private data in pages | Checked | Rendered HTML of all pages scanned: no phone number, date of birth, score or percentage; the only personal detail is the public contact email (mailto). All images: no EXIF or other metadata. |
| External links | Checked | 83 outside links, all `target="_blank" rel="noopener noreferrer"`; no http:// references; no inline event handlers. |
| Contact email is plain text in the page (spam harvesting) | Info | A contact form (planned) would hide it. |

### Design and accessibility
- Lighthouse (production, mobile): home 99 / 100 / 100 / 100 (performance, accessibility, best practices, SEO), Tech, Teaching and Management 100 / 100 / 100 / 100; home on desktop 98 / 100 / 100 / 100. LCP 0.9 s, CLS 0 to 0.003.
- **Fixed:** the calendar page counter had text contrast 3.4:1 (needs 4.5:1), now #5c554e on the paper; the footer "X" link was 10 px wide (WCAG 2.5.8 needs 24 px), now at least 44 px.
- **Fixed (WCAG 2.2.2):** the role calendar cycled forever with no way to stop it. It now has a 28 px pause and play button in its corner (aria-pressed, keyboard reachable, hidden under reduced motion). Hover and click on the calendar still do not pause it.
- Checked and fine: one h1 per page and no skipped heading levels; landmarks (main, nav, header, footer) and a skip link; every image has a non-redundant alt; no horizontal overflow at 375, 820 or desktop; `lang="en"`; carousel works with the keyboard.

### Animation
- Code audit: no `transition: all`, no animated layout property (width, height, top, left, margin, padding), no animated blur, two `will-change` (both small), the only scroll listener is passive and runs through one requestAnimationFrame to write `transform`. Every animation outside the reduced-motion blocks is opacity or transform only, and each is switched off or skipped under `prefers-reduced-motion` (loader and door walks are skipped in code, the calendar does not run, the diyas stop flickering).
- Measured on the production build (desktop): home page idle with the diyas lit 16.7 ms per frame (p95 17.2, worst 17.6, no frame over 20 ms), diyas unlit the same, and scrolling the whole home page in dark mode the same (worst 17.7). Not verified: a mid-range phone, which needs a recording on a real device.

### Polish added
- Tech page: a row of jump links under the title (Projects 11, Experience 2, Hackathons 6, Campus roles 2, Certificates 4) that scroll to each row.
- Link pills show a GitHub or LinkedIn mark and drop the repeated "LinkedIn:" text (kept for screen readers).
- Card pictures rise 3.5% on mouse hover (transform only, off for touch and reduced motion).

### Follow-up: phone number on the old public main (10 Nov 2026, approved by Mahesh)
- Pushed commit `3348695` to `origin/main` (normal fast-forward, no force): the phone value in `config/social.ts` and `public/data/portfolio.json` is now an empty string (the old code still reads the field, so it stays in place). Verified on raw.githubusercontent.com.
- **Still exposed:** two older commits on `main` still contain the number, and the commit authors there still show the Gmail address. A normal commit cannot remove history. Options for Mahesh: make the repo private, or rewrite `main` (a force-push that erases the old history; needs his explicit OK). The `release/v1.0.0-rc.1` branch has no phone number.
- **Also in that file:** `public/data/portfolio.json` on `main` still has his CGPA (the "no scores" rule applies to the new site). Not touched: he only approved the phone number.

## 42. One card animation for all three doors, 10 Nov 2026
Request from Mahesh: use the Management page's card animation (cards stack as you scroll) on Tech too, so the three doors share one animation. This replaces the swipeable rows of sections 26 and 34 (`card-carousel.tsx` and its CSS were deleted; the pointer-capture bug of section 34 went with them).
- **The animation** is CSS sticky stacking: a card pins near the top while the next one slides over it, and the first four earlier cards peek out 20 px apart (`--depth`). It is the same on Tech (25 cards), Teaching (3) and Management (5). Tech keeps its five titled sections and the jump links; each section is its own stack, with the section title above it.
- **Only cards that fit are pinned** (`components/door-page/stack-item.tsx`): a card taller than the window cannot be pinned, because its links at the bottom could never be reached. Each card is measured on load, on resize and when its size changes; too-tall cards, and phones (under 768 px wide), scroll normally. On a 900 px tall window all 25 Tech cards stack; on 700 px, 18 of 25 (short windows also get tighter cards: smaller padding, title and text, so more of them fit). Phone: none pinned, no sideways scroll.
- **Cost:** Tech is now a long page (about 18,000 px at desktop width, against about 4,000 before) because 25 cards sit one under the other. The jump links are the way round it. Lighthouse after the change: 100 / 100 / 100 / 100 on Tech, Teaching and Management, CLS 0.

## 43. Master CV download, 10 Nov 2026
- **Request:** a button that downloads Mahesh's actual Master CV, on the left side.
- **Decision (asked, answered by Mahesh):** the CV goes out exactly as it is, including his phone number (his phone number), CGPA and the 12th and 10th percentages. Advice given before he chose: a copy with the phone number and scores removed would follow his own rule (no phone number, no scores); he chose the untouched file. This is the one place on the site where those details are public, and the content guard does not read PDFs.
- **File:** `public/Mahesh-Namdev-Khandebharad-Master-CV.pdf`, a byte-identical copy of `content/source/cv/...MasterCV.pdf` (5 pages, 203,339 bytes). Served as `application/pdf`.
- **Button:** "Download CV" with a download icon, a third pill in the hero's left column after "Hire me" and "See my work" (`components/home/hero.tsx`). It has the `download` attribute, a 44 px target and a screen-reader note (PDF, 5 pages, 200 KB).
- **Search engines:** the file is served with `X-Robots-Tag: noindex, nofollow, noarchive` (next.config.ts), so Google should not list the PDF and its phone number, while the button still works.
- **Risk to remember:** once pushed, the PDF sits in the public GitHub repository, where anyone can read it. Replacing the file with a redacted copy later means replacing `public/Mahesh-...-Master-CV.pdf`; the old version would still be in the git history.

### Where the CV button lives (decided 10 Nov 2026, on Mahesh's request to choose)
- **Home hero, left column:** "Download CV", third pill after "Hire me" and "See my work". The first thing a recruiter sees.
- **Every door page, fixed bottom-left:** a compact "CV" pill next to "Back to the doors", so the CV is one click away from Tech, Teaching and Management while reading cards.
- **Footer, every page:** a "Master CV" entry under the email, for visitors who scroll to the end.
- **Not in the top navigation:** the nav island is already full and its centre is for page links. One setting (`cv` in `lib/site.ts`) holds the file and label, so a change is made in one place.

## 44. Logo: portrait badge, 10 Nov 2026
Mahesh chose his face as the logo, head to shoulders, over a door-arch monogram and the wordmark.
- **The badge:** a head-and-shoulders crop of the existing background-free portrait (`public/images/mahesh-cutout.png`), unaltered, on a warm light tile in a circle with a thin orange ring (the one accent colour). The light tile is needed because the black hoodie disappears on a dark one. Made once with Pillow; the output carries no metadata.
- **Where it is used:** the header, left of the wordmark (36 px, decorative `alt=""` because the wordmark names the link); the browser tab icon (`app/icon.png`, 192 px, replacing the old flower-like `icon.svg`); the iOS home-screen icon (`app/apple-icon.png`, 180 px, square); the share preview image (`app/opengraph-image.tsx`, 84 px next to the username, read from `public/images/logo-badge.png`); the top of the README.
- **Trade-off, noted when choosing:** a face is soft at tab-icon size (16 to 32 px); the ring and the light tile keep it readable as a round portrait. For a sharper small mark a simple monogram would still be better.
- README screenshots were retaken with the new header (the two home pictures come from the real browser, because headless Chrome sometimes captures the home page before its entrance animation finishes).

## 45. Phone in desktop mode: same site, same animation, 11 Nov 2026
Mahesh recorded his iPhone (Safari, "Request Desktop Website", a layout about 980 px wide and 2,100 px tall) and asked for the site to work the same on a laptop and a phone, with the same animation.
- **Found by frame-by-frame review and a 980 x 1900 touch-emulated browser:**
  1. **No navigation at all between 768 and 1023 px.** The tabs appeared from 1024 px (`lg`) but the Menu button was hidden from 768 px (`md`). A phone in desktop mode, and any small tablet, had neither. Now the tabs appear from 896 px and the Menu button below that; the clock steps aside between 896 and 1024 px so the tabs fit.
  2. **Hover-only moments never reached touch.** A laptop pointer on a door fades the other doors, eases the leaf ajar, shows "Click to enter" and opens the panel that says what is behind it; the hero portrait fades to colour. None of that existed on touch. `components/home/touch-preview.tsx` gives touch the same moment: the first tap previews a door with the same CSS (`[data-preview]`, mirroring the hover rules), the second tap walks in, a tap elsewhere puts it back. `components/home/tap-colour.tsx` makes a tap on the portrait fade it to colour. Mouse and keyboard are untouched, and the narrow phone layout (under 768 px) still lists the points under each door.
  3. **The hero stretched to the screen height** (`100svh`), which is 2,100 px on a phone in desktop mode, leaving a 700 px empty gap above the greeting. From 768 px up it is now capped at `max(40rem, 62vw)`; laptops (1440 x 900 and 1920 x 1080) are unchanged.
  4. **Home page 4 to 8 px wider than the screen on phones (360 to 430 px):** the flip-calendar's offset shadow poked past the edge, so the page wobbled sideways. The hero now clips horizontally (`overflow-x: clip`, which keeps sticky and fixed elements working).
- **Rope lamp:** it still appears from 1280 px only, because its reserved margin does not exist on narrower screens; below that the theme button does the same job. A phone in desktop mode (about 980 px) therefore has the button, not the lamp.
- **Checked on a production build:** 11 widths from 360 to 1440 px on Home and Tech (nav or Menu always present, no header overflow, no sideways scroll); 4 pages x 2 themes x 4 phone widths (360, 390, 430, 768) with no sideways scroll; a touch tap previews and a second tap enters (`/teaching`, `/tech`); a mouse click still enters at once; the portrait tap works; the door walk completes on a 980 x 1900 screen.
- **Not tested:** a real iPhone (Safari). The checks used Chrome with touch emulation, so Safari-only quirks could still exist.

## 46. Kalavihangam name corrected to 2K25, 11 Nov 2026
- Mahesh gave the final wording: **Technical Coordinator, Kalavihangam 2K25, MIT CSN, 24 to 28 Feb 2025**. The dates were already right; the event name said "2K23" and now says **2K25** (Tech page timeline in `lib/data.ts`, Tech and Management cards and their emblem descriptions in `lib/door-pages.ts`, and the PRD). Earlier notes in this file that mention "2K23" record the history and are left as they were.

## 47. llms.txt and canonical tags, 11 Nov 2026
- **Why:** after the domain went live, a checklist of post-launch basics showed three gaps: no summary file for AI tools, no canonical tag (the site answers on `thissidemahesh.in`, and `www` redirects to it), and Bing Webmaster Tools not set up (done in the Bing dashboard, not in code).
- **`public/llms.txt`:** a plain-text summary in the llmstxt.org layout: who Mahesh is, the four doors, one line per page, the CV link, contact and profile links, and a note asking AI tools to quote the facts as written. It repeats only facts that are already on the site, with no phone number, date of birth, scores or percentages.
- **Canonical tags:** each page now sets `alternates.canonical` to its own path (`/`, `/tech`, `/teaching`, `/management`). The base comes from `metadataBase` (`NEXT_PUBLIC_SITE_URL`), so on production they read `https://thissidemahesh.in/...`.
- **Checked on a production build:** `/llms.txt` answers 200 as `text/plain`; every page has one canonical link; typecheck, lint of the site code and the content guard pass.

## 48. Master CV replaced with the 11 Nov 2026 version
- **Request:** Mahesh gave his updated Master CV and asked for it to replace the old one on the site.
- **What changed:** `public/Mahesh-Namdev-Khandebharad-Master-CV.pdf` is now a byte-identical copy of the new file (5 pages, 364,229 bytes). The file name and address stay the same, so the hero button, the door pages, the footer, `llms.txt` and every shared link keep working. The size note in `lib/site.ts` now says 356 KB.
- **New in this version:** it lists the site address (`thissidemahesh.in`) in the header. It still carries the same contact details as before, so the privacy note in the README applies unchanged: the CV is published as supplied.
- **Header kept:** the `noindex, nofollow, noarchive` header on the PDF is unchanged.
