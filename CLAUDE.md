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

## Open decisions before the build

- The brief: what the demo represents, who it's for, the primary conversion action, brand character.
- Which Wix vertical(s).
- Brand name + visual direction (`DESIGN.md`).
- Custom domain — later, post-release.
