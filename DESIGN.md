# MYPC — Visual Design System

**Status:** DEMO / CONCEPT. Not a real organization. Every page carries a visible demo notice.
**Phase:** Brandkit applied across all pages + live Wix business services (blog / events / forms / members).

This file is the source of truth for the visual language. Build from it; don't re-decide per section.
**Primary reference: the MYPC brandkit** (`brief/ChatGPT Image Sep 2, 2026, 10_52_11 PM (1).png`) — logo,
palette, type, buttons, card styles, photography direction. Concept mockups in `brief/concept-*.png` are
layout direction only. Brandkit tokens below supersede the earlier warm-navy system.

---

## 1. Character

Civic · editorial · leadership-oriented. "Bold, trustworthy, inspiring — a premium civic feel
with warmth and accessibility" (brandkit). Institutional weight without bureaucratic dryness;
enough energy for young professionals.

**Tagline:** *Connect. Collaborate. Cultivate.* — four pillars: **Connect · Collaborate · Cultivate · Serve.**

**Rules out:** generic SaaS, glassmorphism, neon, startup purple/blue gradients, giant rounded
cards in a grid, decorative blobs, oversized empty whitespace, playful rounded everything,
stock-template symmetry.

**Leans on:** MYPC-navy foundation, royal-blue support, gold emphasis (used sparingly, for premium
moments), one civic red, editorial serif display, a rationed script accent, strong section
hierarchy, high contrast, diagonal graphic seams, civic motifs (layered star, capitol dome
linework, sunburst), diverse real photography reflecting civic pride.

---

## 2. Color

Tokens only. No arbitrary hex in components.

Brandkit swatches: MYPC Navy `#0B1D3A` · Royal Blue `#163A8C` · Gold `#D4AF37` · Civic Red `#B1121B` ·
White `#FFFFFF` · Light Gray `#F5F6F8` · Charcoal `#1F2630`. Mapped to tokens:

| Token | Value | Role |
|---|---|---|
| `--color-navy-900` | `#0B1D3A` | MYPC Navy — primary foundation: dark sections, header, footer |
| `--color-navy-800` | `#12274D` | Raised panels/cards on navy, form box on navy |
| `--color-navy-700` | `#1D3A63` | Dividers / hover on navy |
| `--color-navy-950` | `#06101D` | Demo bar, deepest ground |
| `--color-royal` | `#163A8C` | Royal Blue — support accent (links on light, secondary emphasis, chart/really) |
| `--color-royal-700` | `#12306F` | Royal hover |
| `--color-gold-600` | `#8A6D1A` | Gold **text** on light — eyebrows, arrow links (AA ~5:1). NOT the brandkit swatch. |
| `--color-gold-500` | `#D4AF37` | Accent gold (brandkit) — rules, stars, on-navy detail, **primary button fill** |
| `--color-gold-400` | `#E3C360` | Primary button hover |
| `--color-gold-300` | `#ECD79B` | Small gold detail on navy |
| `--color-red-600` | `#B1121B` | Civic Red (brandkit) — seams, accent button, one focus icon, vote motif |
| `--color-red-500` | `#CC2B2B` | Red hover / lighter seam stripe |
| `--color-white` | `#FFFFFF` | Bright content sections |
| `--color-paper` | `#F5F6F8` | Light Gray (brandkit) — cool off-white alternating light sections |
| `--color-charcoal` / `--color-ink-900` | `#1F2630` | Charcoal (brandkit) — primary text on light |
| `--color-ink-500` | `#5A6472` | Muted text on light |
| `--color-cloud` | `#C3CEE2` | Muted text on navy |
| `--color-border-light` | `#E4E7EC` | Hairline borders / card edges on light |
| `--border-on-navy` | `rgb(255 255 255 / 0.14)` | Hairline borders on navy |
| `--focus` | `#D4AF37` | Focus ring (2px, 2px offset) |

Dominant is navy; **gold is rationed** — emphasis and premium moments only, never a spread; red is a
spice, never a surface; royal blue is quiet support. The bright brandkit gold `#D4AF37` fails AA as
small text on white, so gold *text* on light uses `--color-gold-600` `#8A6D1A`; `#D4AF37` is for fills,
rules, and detail on navy. Body text on `--paper`/`--white` ≥ 7:1; on navy ≥ 8:1.

---

## 3. Typography

Self-hosted, latin subset, `@font-face` in `global.css`. **Brandkit type: Playfair Display (headline
serif) · Montserrat (body / UI) · Great Vibes (script accent).** Playfair + Montserrat preloaded in
`Layout.astro`. Never Inter/Roboto/Arial as the chosen face.

- **Display — Playfair Display (variable, wght 400–900).** Transitional Didone, high thick/thin
  contrast — engraved civic certificates, newspaper mastheads. Hero H1, section H2s, featured
  names, card headings, mission statement, stat numbers.
  `--font-display: "Playfair Display", Georgia, "Times New Roman", serif;`
- **Text / UI — Montserrat (variable, wght 100–900).** Geometric, contemporary, civic-modern
  (brandkit body face). Body, nav, labels, buttons, meta, eyebrows. Weights: 400 body, 600
  labels/buttons/eyebrows, 500 nav.
  `--font-sans: "Montserrat Variable", "Montserrat", "Segoe UI", Arial, sans-serif;`
- **Script accent — Great Vibes (400).** Flowing formal script. **Rationed** — the hero flourish
  ("The next generation of") and at most one other premium moment per page. Never for UI, never a
  full line of running text, never below ~24px. `.t-script` utility, gold.
  `--font-script: "Great Vibes", "Snell Roundhand", "Segoe Script", cursive;`

`font-display: swap`, fallback stacks metric-close. Preload:
`playfair-display-latin-wght-normal.woff2`, `montserrat-latin-wght-normal.woff2`.

### Roles (fluid, 375 → 1440)

| Role | Family | clamp() size | LH | Weight | Tracking | Case |
|---|---|---|---|---|---|---|
| Display XL — hero H1 | display | `clamp(2.75rem, 1.9rem + 4.3vw, 5rem)` | 1.02 | 540 | -0.02em | — |
| Display L — inner page H1 | display | `clamp(2.25rem, 1.7rem + 2.6vw, 3.5rem)` | 1.06 | 520 | -0.015em | — |
| Section heading H2 | display | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | 1.12 | 520 | -0.01em | — |
| Card heading H3 (serif) | display | `clamp(1.125rem, 1rem + 0.45vw, 1.375rem)` | 1.2 | 500 | — | — |
| Eyebrow / small label | sans | `0.75rem` | 1.3 | 600 | 0.14em | UPPER |
| Body | sans | `1rem` | 1.65 | 400 | — | — |
| Body large (hero support) | sans | `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)` | 1.6 | 400 | — | — |
| Nav | sans | `0.9375rem` | 1 | 500 | 0.01em | — |
| CTA label | sans | `0.8125rem` | 1 | 600 | 0.08em | UPPER |
| Meta / caption | sans | `0.8125rem` | 1.4 | 500 | 0.02em | — |

Measure: body ≤ 65ch; hero support ≤ 42ch; prose pages ≤ 68ch.

---

## 4. Spacing & layout

4px base. Rhythm scale:
`--space-3xs:.25rem --2xs:.5rem --xs:.75rem --sm:1rem --md:1.5rem --lg:2rem --xl:3rem --2xl:4rem --3xl:6rem --4xl:8rem`

- Section padding-block: `clamp(3.5rem, 2.5rem + 5vw, 7rem)`.
- `--container: 1200px` · `--container-wide: 1360px` · `--container-narrow: 760px`.
- Gutter (inline padding): `clamp(1.25rem, 5vw, 3rem)`.
- Content grid: 12-col, `column-gap: clamp(1rem, 2.5vw, 2rem)`.

### Breakpoints (min-width, mobile-first)
`sm 480 · md 768 · lg 1024 · xl 1280`

- **Nav:** full horizontal nav ≥ `lg`; hamburger + sheet below `lg`.
- **Hero:** stacked below `lg`; 2-panel (content / image) ≥ `lg`.
- **Focus cards:** 1-col < 640 · 2-col 640–`lg` · 4-col ≥ `lg`.
- **Leadership:** horizontal scroll-snap rail < `lg` · 5-up grid ≥ `lg`.
- **Events:** 1-col < `md` · 3-col ≥ `md`.
- **Membership funnel:** vertical stack < `md` · 4-step horizontal row ≥ `md`.
- **Social grid:** 1-col < `md` · 2×2 ≥ `md` · 4-col ≥ `xl`.

No horizontal page overflow at any width ≥ 320px.

---

## 5. Radii · borders · shadows

Institutional = mostly square.

- `--radius-sm: 2px` (buttons, inputs) · `--radius-md: 4px` (cards, image frames) ·
  `--radius-lg: 8px` (media panels only) · `--radius-pill: 999px` (filter chips only).
- Borders: `1px solid var(--border-light)` on light, `1px solid var(--border-on-navy)` on navy.
  Eyebrow rule: `3px` gold, `40px` wide.
- `--shadow-card: 0 1px 2px rgb(16 33 63 / .04), 0 14px 30px -16px rgb(16 33 63 / .16)`.
  Cards on navy use a hairline border, not shadow.

---

## 6. Components — visual contract

### Buttons
- **Primary:** `--gold-600` fill, `--navy-900` text, CTA label style, padding `.875rem 1.5rem`,
  `--radius-sm`. Hover: `--gold-500`, `translateY(-1px)`. Active: `translateY(0)`.
- **Secondary / on-navy:** transparent, `1px rgb(255 255 255 / .5)` border, white text.
  Hover: border white, bg `rgb(255 255 255 / .08)`.
- **Secondary / on-light:** transparent, `1px var(--navy-900)` border, navy text.
  Hover: bg `rgb(10 26 56 / .05)`.
- **Tertiary link:** navy text, weight 600, trailing `→` in gold, underline grows on hover.
- Focus (all): `outline: 2px solid var(--focus); outline-offset: 2px`.

### Cards
- **Focus item (ledger, not a card):** bare civic glyph (navy; one is `--red-600`), sans caps
  title, one-line description, tertiary "Learn more →". No card shell — items are divided by a
  `2px` navy top rule (desktop) / `1px` hairline (stacked). Four across ≥ `lg`.
- **Leadership — featured:** wide card, 4:5 portrait + role label, serif name (Playfair,
  clamp 1.5→2rem), one-line intro. 200px + 1fr grid ≥ 600px.
- **Leadership — compact:** 4:5 portrait, bottom navy gradient scrim, serif name + gold role
  label overlaid. `--radius-md`. 2-up ≤ `lg`, 4-up ≥ `lg` beside the featured card.
- **Event — featured:** 1.5fr / 1fr split, 4:3 photo with navy date chip top-left, gold kicker,
  serif title, meta rows, one-line blurb, solid secondary CTA.
- **Event — compact:** no image; inline navy date chip + serif title + meta + "Details →",
  stacked and rule-separated. 2 per column beside the featured event ≥ `lg`.

### Logo lockup (`Logo.astro`)
Layered civic star mark — three offset 5-point stars (navy base at low opacity, civic-red rotated
12°, gold on top) around a navy roundel with a gold capitol-dome hint — beside the **MYPC** wordmark
(Playfair, 600, tracked). `sub` shows two stacked lines: "Mayor's Young Professional Council" (cloud)
and "City of Montgomery, Alabama" (gold-300), both hidden below `lg`.

### Stat bar (`StatBar.astro`)
Brandkit "info / stat card". Icon tile (gold-on-navy) + Playfair value + uppercase Montserrat label.
Stacked, hairline-divided on mobile; 3-up with vertical rules ≥ 720px. `tone="navy"` = inset panel on
a light section; `tone="bare"` = already on navy. Figures are illustrative for the concept build.

### Section header
H2 (Playfair) + `40 × 3px` gold rule beneath it + optional lede + optional right-aligned
"View all →". **Eyebrow is rationed** — at most one section eyebrow on the page besides the
hero (currently: Featured Leadership). The headline alone carries every other section.

### Layout families (no two sections share one)
hero split · mission statement (centered, narrow) · focus ledger (rule-divided row) ·
leadership (featured + supporting grid) · events (featured + rule-separated list) ·
membership (numbered process) · community (editorial feature + side list).

### Diagonal seam (decorative, `aria-hidden`)
Thin band between some sections: gold + red parallel stripes on a `-12deg` skew, via `clip-path`.
Also the hero image panel's inner edge on desktop (`clip-path: polygon(...)`), squared off < `lg`.

### Civic motifs (inline SVG, `aria-hidden`, low opacity on navy)
5-point star (gold) — eyebrow trios, footer list markers, funnel step bullets.
Sunburst lines + Alabama State Capitol dome silhouette — hero/section background at 4–8% opacity.

### Forms (tokens now, full treatment later)
Input: white bg, `1px var(--border-light)`, `--radius-sm`, padding `.75rem 1rem`.
Focus: border `--navy-900` + `2px` gold ring. On-navy variant: bg `rgb(255 255 255 / .06)`,
border `rgb(255 255 255 / .18)`, white text, gold labels.

---

## 7. Motion

CSS-first. `--ease: cubic-bezier(.2,.6,.2,1)` · `--dur: 220ms` · `--dur-slow: 480ms`.

- **One orchestrated hero load:** eyebrow → H1 (lines stagger 60ms) → support → CTAs → image
  panel clip-reveal. Total < 900ms.
- **Section reveals:** IntersectionObserver adds `.in`; children fade/rise 12px, stagger 60ms.
- **Hover:** buttons `translateY(-1px)`; cards `translateY(-2px)` + border shift; nav underline grows.
- No parallax, no scroll-jacking, no blob morphs.
- `@media (prefers-reduced-motion: reduce)`: all transforms/transitions → none; reveals are instant.

---

## 8. Section rhythm (homepage)

`demo bar` → `header` → **hero (navy)** → seam → **focus areas (paper)** → **featured leadership
(navy)** → **upcoming events (white)** → seam → **membership funnel (navy)** → **social /
community (paper)** → **footer (navy-950)**.

Alternating grounds; each major section opens with a section header; navy sections carry
low-opacity civic linework.

---

## 9. Imagery rules

- Subjects: young-professional group photos, individual leadership portraits (4:5), civic
  architecture (capitol dome), community events.
- Treatment: navy multiply overlay (12–20%) on hero composition for legibility; gold+red diagonal
  framing strip on the hero image edge; bottom navy scrim on portrait cards.
- Crops: portrait 4:5 · event thumb 4:3 · hero panel ~5:4 desktop / 16:9 band mobile.
- **Leadership portraits (in place):** 5 studio headshots from the brief, background-removed and
  flattened onto MYPC Navy `#0B1D3A`, 4:5, `public/img/leadership/*.webp` (17–28 KB each). Generated
  stand-ins for the concept build — names from the brandkit where shown, else illustrative; a visible
  note on `/council` says so. TODO: client to supply the confirmed roster + real headshots.
- Remaining placeholders: community story image, event photos beyond the featured one — navy block,
  centered star, caption. No fake third-party logos, real names/quotes/stats presented as real —
  those stay visible `TODO: client to supply`.
- Formats: AVIF + WebP, dimensions reserved, LCP hero image not lazy-loaded.

---

## 10. Accessibility floor

Semantic landmarks, one H1/page, logical heading order, keyboard-operable nav + sheet, visible
gold focus ring everywhere, `:focus-visible`, labelled fields, contrast per §2, reduced-motion
honored, `alt` intent recorded per asset, target size ≥ 44px on touch.
