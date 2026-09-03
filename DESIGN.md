# MYPC — Visual Design System

**Status:** DEMO / CONCEPT. Not a real organization. Every page carries a visible demo notice.
**Phase:** Visual design + general layout. Wireframe direction approved. Homepage layout system only —
remaining pages and live Wix business services come later.

This file is the source of truth for the visual language. Build from it; don't re-decide per section.
Art direction reference: `../ChatGPT Image Sep 2, 2026 *.png` (concept mockups — direction, not pixel target).

---

## 1. Character

Civic · editorial · leadership-oriented. Institutional weight without bureaucratic dryness;
enough energy for young professionals; premium enough to represent a city-sponsored body.

**Rules out:** generic SaaS, glassmorphism, neon, startup purple/blue gradients, giant rounded
cards in a grid, decorative blobs, oversized empty whitespace, playful rounded everything,
stock-template symmetry.

**Leans on:** deep navy foundation, warm gold, one restrained red, editorial serif display,
strong section hierarchy, high contrast, diagonal graphic seams, civic motifs (star, capitol
dome linework, sunburst), real photography.

---

## 2. Color

Tokens only. No arbitrary hex in components.

| Token | Value | Role |
|---|---|---|
| `--navy-900` | `#0A1A38` | Primary foundation — page ground for dark sections, header, footer |
| `--navy-800` | `#12264C` | Secondary navy — raised panels/cards on navy, form box on navy |
| `--navy-700` | `#1E3A6B` | Navy hover state, dividers on navy |
| `--navy-950` | `#06122A` | Demo bar, deepest shadow ground |
| `--gold-600` | `#A97C2E` | Primary CTA fill, strong gold on light |
| `--gold-500` | `#C79A45` | Accent gold — eyebrows, rules, stars, arrows, CTA hover |
| `--gold-300` | `#E4C987` | Small gold text/detail on navy |
| `--red-600` | `#9E2A2B` | Restrained accent — diagonal seams, one focus icon, civic/vote motif |
| `--red-500` | `#B23A34` | Red hover / lighter seam stripe |
| `--white` | `#FFFFFF` | Bright content sections |
| `--paper` | `#F7F3EA` | Warm off-white — alternating light sections, subtle paper texture |
| `--ink-900` | `#16213C` | Primary text on light |
| `--ink-500` | `#5B6472` | Muted text on light |
| `--ink-on-navy` | `#FFFFFF` | Primary text on navy |
| `--ink-on-navy-muted` | `#C4CEE2` | Muted text on navy |
| `--border-light` | `#E6E1D6` | Hairline borders / card edges on light |
| `--border-on-navy` | `rgb(255 255 255 / 0.14)` | Hairline borders on navy |
| `--focus` | `#C79A45` | Focus ring color (2px, 2px offset) |

Dominant is navy; gold is the single voice of emphasis; red is a spice, never a surface.
Contrast: body text on `--paper`/`--white` ≥ 7:1; on navy ≥ 8:1. Gold is decorative/large-text
only on navy — never gold body copy at < 18px on navy below 4.5:1.

---

## 3. Typography

Self-hosted variable fonts, latin subset, `@font-face` in `global.css`, both preloaded in
`Layout.astro`. Never Inter/Roboto/Arial as the chosen face.

- **Display — Playfair Display (variable, wght 400–900).** Transitional Didone with high
  thick/thin contrast: the genre of engraved civic certificates and newspaper mastheads.
  Matches the concept mockups' display treatment; carries institutional weight without
  feeling bureaucratic. Used for hero H1, section H2s, featured names, card headings, the
  mission statement.
  `--font-display: "Playfair Display", Georgia, "Times New Roman", serif;`
  (Chosen over Fraunces, which reads as a generic AI-era display serif; Playfair is closer
  to the mockups and is a sanctioned editorial-serif choice.)
- **Text / UI — Libre Franklin (variable, wght 100–900).** Franklin Gothic lineage,
  American civic/editorial. Body, nav, labels, buttons, meta.
  `--font-sans: "Libre Franklin", "Franklin Gothic Medium", Arial, sans-serif;`

`font-display: swap`, fallback stacks metric-close (Georgia / Franklin Gothic). Preload:
`playfair-display-latin-wght-normal.woff2`, `libre-franklin-latin-wght-normal.woff2`.

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
- Placeholders until approved assets exist: navy block, centered star, caption. No fake logos,
  names, quotes, stats presented as real — those stay visible `TODO: client to supply`.
- Formats: AVIF + WebP, dimensions reserved, LCP hero image not lazy-loaded.

---

## 10. Accessibility floor

Semantic landmarks, one H1/page, logical heading order, keyboard-operable nav + sheet, visible
gold focus ring everywhere, `:focus-visible`, labelled fields, contrast per §2, reduced-motion
honored, `alt` intent recorded per asset, target size ≥ 44px on touch.
