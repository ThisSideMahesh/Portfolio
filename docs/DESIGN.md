# DESIGN: thissidemahesh portfolio

Status: approved direction · Last updated: 2026-11-10
All decisions closed: style **Minimalist Professional**, palette **O3**, photo **A (hero) + B (story)**, Creator label **option 1**.

## 1. Direction

**Minimalist Professional, in chalk, blackboard and signal orange.** Lots of whitespace, 1 px lines instead of shadows, one accent colour, type doing the work. Three tracks meet in one person: the classroom (chalk on a board), the workshop (orange is the colour of tools and safety tags) and the office (plain, ordered type). It should feel like a well-kept engineering department noticeboard: calm, exact and easy to scan in under a minute.

**The one memorable thing:** the four-door wall. Everything else stays quiet so the doors can carry the page.

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

### Chosen: O3 Chalk and blackboard

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

### The doors
- Each door is a tall `--surface` panel with a 1 px `--line` frame and a small **handle** (a short vertical bar) in `--muted`. On hover and focus the panel lifts 2 px, the handle turns `--accent`, and the door name's underline draws in. No 3D rotation (too theatrical for this style). Under reduced motion only the colours change.
- The **Creator door** is visibly bolted: a drawn hasp and padlock (inline SVG, ink colour, not an emoji), the panel slightly darker, and the cursor stays default. It is a `<div>` with `aria-disabled="true"`, not a link, so it has no destination. Its one line explains what it will become.
- Phones: the doors sit in a horizontal `scroll-snap` row at 80% viewport width each, with the next door peeking in. Desktop: all four are visible in one row.

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

## 6. Photo (decided: A in the hero, B in the story section)

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
