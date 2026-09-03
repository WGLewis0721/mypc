# MYPC — Visual Plan (homepage)

Asset contract for the homepage layout iteration. Bespoke imagery is generated with
Higgsfield (`higgsfield-generate`, GPT Image 2). Decorative civic marks are inline SVG,
already in the components. Everything else stays a labelled `Placeholder` slot until the
client supplies real photography.

Shared art direction for all generated photos:
- **Grade:** deep navy shadows, warm gold rim/edge light, low-key, filmic. Reads against
  `--color-navy-900`.
- **Subjects:** young professionals (mixed age 25–42, mixed gender and ethnicity),
  business / business-casual attire, natural expressions, no stock-smile.
- **Setting:** Montgomery civic context — classical civic architecture, a capitol-dome
  silhouette, or downtown, held soft in the background. No identifiable signage or real
  logos.
- **Lens:** 85mm portrait feel; editorial, not corporate-stock.
- **Format out:** webp, sRGB. Dimensions reserved in markup (no CLS).

| Name | Placement | Purpose | Subject / composition | AR desktop | AR mobile | Negative space | Brand-color tie | Source | Format | Budget | Alt-text intent |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `hero-group.webp` | Hero, right panel behind the diagonal clip | Establish "a body of young civic leaders" in the first screen | 5–7 people, mid-shot, slight left-to-right diagonal energy, civic architecture bokeh behind | 5:4 | 16:9 (center crop) | keep faces out of far-left ~16% (clipped by the frame) | navy grade + gold edge light echoes the gold/red frame stripe | Higgsfield | webp | ≤ 190 KB | "Young professionals of the Mayor's Young Professional Council in a civic setting" |
| `portrait-featured.webp` | Leadership section, featured card | Give the featured seat (President) a real face | single person, 30s, confident, 3/4 turn, navy backdrop with faint civic bokeh | 4:5 | 4:5 | headroom for nothing overlaid (text sits beside, not over) | navy backdrop, gold catchlight | Higgsfield | webp | ≤ 95 KB | "President of the Council" |
| `portrait-1.webp` | Leadership row, slot 1 (Vice President) | Prove the compact card + scrim treatment on a real photo | single person, different age/ethnicity from featured, same backdrop + grade | 4:5 | 4:5 | lower third readable under the navy scrim | same grade for set consistency | Higgsfield | webp | ≤ 65 KB | "Vice President of the Council" |
| `portrait-2.webp` | Leadership row, slot 2 (Policy Chair) | Same | single person, different again, same backdrop + grade | 4:5 | 4:5 | lower third under scrim | same grade | Higgsfield | webp | ≤ 65 KB | "Policy Chair of the Council" |
| `event-featured.webp` | Events section, featured event card | Make the featured event read as a real gathering | 4–6 people at an evening networking mixer, warm interior light, candid | 4:3 | 4:3 | top-left clear for the date chip | warm light against the navy date chip | Higgsfield | webp | ≤ 120 KB | "Guests at a Council member mixer" |

Not generated this iteration (kept as `Placeholder`, client to supply):
- Leadership row slots 3–4 (Projects Co-Chair, Secretary) — card design is proven by slots 1–2.
- Community/social story image — slot is designed; real story + image is client content.
- Any event photo beyond the featured one — compact event rows are text-only by design.

Decorative (no generation): sunburst linework, Alabama State Capitol dome silhouette,
5-point civic star — all inline SVG in `Hero.astro` / `Icon.astro` / `Logo.astro`.

---

## Sourcing note (this iteration)

Bespoke generation was unavailable: **Higgsfield** is on the free plan and returns
`job_minimum_basic_plan_required`; **`KIE_API_KEY`** is unset. Per the website-build
fallback chain, the hero uses **licensed sourced imagery** instead.

| File | Source | License | Attribution (for site credits) |
|---|---|---|---|
| `public/img/hero-capitol.webp` | Flickr photo id `32495962667` ("West Front of the Alabama State Capitol, Montgomery, AL"), via Openverse; cropped, desaturated, navy grade baked in | CC BY 2.0 | **TODO: confirm photographer + exact credit line from the Flickr photo page before production.** CC BY 2.0 requires attribution. |

Portraits and the event photo remain labelled `Placeholder` slots (`TODO: client to
supply`). Real council-member photography is client-supplied by necessity; stock faces
labelled with council roles would misrepresent real people, which the POC rules forbid.
