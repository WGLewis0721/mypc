# mypc — project instructions

Project facts and this project's specific decisions. Studio procedure lives in Skills, not here.
The visual system lives in `DESIGN.md` (created during the build, not yet present).

## What this is

- **Name:** `mypc` (working title — final brand TBD).
- **Status: DEMO / POC.** This is a concept build, not a live business site.
  - Plausible mock business facts are allowed (services, sample pricing, sample copy).
  - The site MUST carry a visible notice on every page that it is a demo / concept and not a real business.
  - Still never fabricate third-party facts (real client names, real reviews, real certifications, real addresses/phones). Those stay as `TODO: client to supply` even in the POC.
- **Purpose / audience / primary CTA:** TBD — capture in the brief before the build starts.

## Stack

- **Wix Headless Fast**, **Wix-hosted** (managed Astro).
  - Frontend: Astro (Tailwind v4 + `@theme` tokens), assembled on Wix's shipped, verified `@wix/sdk` code for one vertical.
  - Backend: Wix business services (Stores / Bookings / Blog / CMS / Events / Members / Portfolio / Pricing Plans / Restaurants) via the SDK. Content is **seeded** by the skill's REST seed script, then fetched at runtime.
  - Hosting: Wix. The released site gets a `*.wixsite.com`-class URL; custom domain is a later step.
- **Vertical: not yet chosen.** Pick from the brief (storefront, bookings, blog, cms, events, members, portfolio, pricing-plans, restaurants). Verticals compose if the brief spans several.
- Node ≥ 20.11 required (installed: v25.6.1). Package manager: npm.

## Source control model

- **Repo:** https://github.com/WGLewis0721/mypc — `origin`, branch `main`, currently in sync.
- Git is the source of truth for the frontend source, `DESIGN.md`, brief, and assets.
- **Wix hosts the *released* site** — `wix release` publishes from the local build, not from a GitHub push. There is no GitHub→Wix auto-deploy in this model; a release is an explicit command.
- Production branch is `main`. Branch before committing when on `main`. Commit/push only when asked.
- The large brief images currently at repo root should move into `brief/` or `assets/` when the Astro project is scaffolded in place.

## Build pipeline

Run through the studio SOP — invoke **`website-build`** first (brief → research → direction → `DESIGN.md` → assets), then **`wix-headless-fast`** owns scaffold → deploy shipped code → seed → brand layer → build → release.

Because the repo already exists (not an empty dir), this is a **connect** run, not a fresh create:

1. `CI=1 npm create @wix/new@latest init` at the repo root (adds `wix.config.json`).
2. `node <wix-headless-fast>/install/deploy.mjs <vertical> --stack astro --plan plan.json` from the repo root.
3. One `npm ci --ignore-scripts || npm install --ignore-scripts` (never two npm installs at once).
4. Seed per the vertical's `seed/SEED.md`. Seeding is **additive** — never delete/overwrite seeded content without asking.
5. Design the presentation layer (theme tokens, chrome, the vertical's creative surfaces) on the shipped hooks — per the vertical's `INSTRUCTIONS.md` + `references/shared/DESIGN.md` + `CONTENT.md`.
6. `npx @wix/cli@latest build` then `npx @wix/cli@latest release`. Copy the live URL verbatim from the release output. Dashboard: `https://manage.wix.com/dashboard/<siteId>`.

Keep `CI=1` on every Wix CLI command. Don't smoke-test with a dev server unless asked — correctness comes from the shipped code and surfaces at build/release.

**Build memory:** this machine has 8 GB RAM, so `astro build` OOMs under Node's default heap.
`npm run build` / `npm run release` are wrapped with `cross-env NODE_OPTIONS=--max-old-space-size=4096`
— run the Wix CLI through those scripts, not bare `wix build`.

**Deploy size (why the forms/blog code deviates from the shipped vertical):** the Wix deploy
`app-deployments/.../complete` endpoint inlines every built file as base64 in one JSON body and
returns **HTTP 413** on a large bundle. Two shipped deps blew it past the limit (~35 MB total);
removing them from the runtime graph brought the bundle to ~2.9 MB:
- `@wix/auto_sdk_forms_forms` — a generated SDK whose ES bundle is **~15 MB** (zod schemas),
  pulled in by `@wix/forms` for `getForm`. Fix: the 2 form schemas are fetched once by
  `scripts/fetch-forms.mjs` (anon visitor token) into `src/data/forms.raw.json`; `src/wix/forms/forms.ts`
  flattens that at runtime and imports no `@wix/forms`. `submissions.ts` imports
  `@wix/auto_sdk_forms_submissions` directly (not the `@wix/forms` barrel). **Re-run
  `node scripts/fetch-forms.mjs` after editing a form in the Wix dashboard.**
- `@wix/ricos` (~5 MB) — the blog rich-text viewer. Fix: `blog/[...slug].astro` renders
  `post.paragraphs` server-side; the `RichContent` island (and `@wix/ricos`) are gone. Rich
  embeds/formatting in post bodies are not rendered.
`@wix/ricos` is still in `package.json` but unused — safe to drop.

**Don't add `vite.build.rollupOptions.output.manualChunks` to `astro.config.mjs`.** A custom
`manualChunks` was tried for the 413 and it silently broke `@wix/astro-wix-hosting-adapter`'s
runtime env injection (its `server.mjs` calls `setGetEnv(createGetEnv(env))` to feed the Worker
env into `astro:env/server`) — every released page 500'd with
`WIX_CLIENT_INSTANCE_ID is missing`. The code cuts above fix the 413 on their own; keep
`astro.config.mjs` minimal. Also: **never `wix env set` / edit the `WIX_CLIENT_*` vars** — the
Wix CLI manages them; `wix env pull` retrieves them and the hosting runtime injects them.

## Environment state (verified 2026-09-02)

| Piece | State |
|---|---|
| `wix@wix` Claude Code plugin | v1.17.0, enabled (redundant `wix@claude-plugins-official` disabled) |
| `wix/skills` marketplace | registered as `wix` |
| `wix-headless-fast` skill + all vertical shipped code | bundled in the plugin — invoke via the Skill tool, no `npx skills add` needed |
| Wix CLI (`@wix/cli`) | v1.1.163, logged in as `william.glewis17@gmail.com` (v1.1.242 available; optional `npm i -g @wix/cli@latest`) |
| Git remote | read/write to `origin` confirmed, `main` in sync |
| Node / npm | v25.6.1 / v11.9.0 |

### Pending — needs an interactive session (cannot be done non-interactively)

- **Wix MCP server** (`plugin:wix:wix-mcp` → `mcp.wix.com/mcp`) — needs auth. Run `/mcp` in an interactive Claude Code session and complete the OAuth flow. Needed for site management / MCP-driven Wix operations; the CLI build flow above does **not** require it.
- **GitHub CLI** (`gh`) — not authenticated. Run `gh auth login` if PR/issue commands are wanted. Plain `git push` over HTTPS already works via the OS credential store.

## Decisions made

- **Concept:** the Mayor's Young Professional Council (MYPC) — a council of young
  professionals in Montgomery, AL. Primary CTA: **apply to join**. Brand character: civic, editorial,
  premium-but-warm.
  - **No City-affiliation claims on the site.** "City-sponsored" / "City of Montgomery" sub-branding
    was removed from all visitor-visible copy (logo lockup, hero, footer, About, home mission)
    pending verified partnership wording + logo rights. Keep new copy affiliation-neutral until the
    client supplies confirmed language.
- **Verticals:** blog (news), events (RSVP/tickets), forms (join + contact applications), members
  (login / account). Storefront/bookings/etc. not used.
- **Brand / visual direction:** the MYPC brandkit (`brief/ChatGPT Image Sep 2, 2026, 10_52_11 PM (1).png`)
  — applied in `DESIGN.md` + `global.css`. Playfair Display / Montserrat / Great Vibes; MYPC-navy +
  gold + civic-red palette; layered-star logo mark.
- **Contact:** `info@mypcmgm.org` (from the brandkit). Roster names/photos are concept stand-ins —
  `TODO: client to supply` the confirmed slate + real headshots.

## Open decisions

- Custom domain — later, post-release.
- Real roster, real stats, City-of-Montgomery partnership wording + logo rights — client to supply.
