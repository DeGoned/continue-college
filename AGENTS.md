# AGENTS.md

Guidance for any AI coding agent (Codex, Claude Code, Cursor, etc.) working in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server on port 3000 (localhost only)
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run clean     # Remove dist directory
npm audit         # Should report 0 vulnerabilities
```

No test suite configured.

## What this is

A **multi-page static site** template for a continuing-education college. Origin: SZTU 继续教育学院 portal; all "深圳技术大学" branding has since been stripped — site reads as a generic "继续教育学院". Live at https://cloudmake.top.

## Architecture

- **Vite 6 multi-entry build** — `vite.config.ts` uses `glob.sync(['*.html', 'en/*.html'], { ignore: ['*_online.html', 'en/*_online.html'] })` to discover all top-level + `en/` HTML and treat each as an independent entry. New pages added at root or under `en/` are picked up automatically.
- **Tailwind CSS 4** via `@tailwindcss/vite` (lightningcss handles vendor prefixes; no autoprefixer / postcss config needed)
- **src/main.js** — single JS entry shared across all pages. Imports `lucide` + `embla-carousel` + `embla-carousel-autoplay` from npm (NOT CDN globals). Initializes Lucide icons, two carousels (`#calendar-embla`, `#faculty-embla`), search modal, mobile drawer, navbar scroll effect, and the teacher-detail renderer.
- **src/teachers.js** — `TEACHERS` map (id → profile). Consumed by `teacher-detail.html?id=<id>`. Covers BOTH faculty (academic) and leadership (admin) profiles.
- **src/index.css** — Tailwind base + theme tokens (`--color-primary` `#00479d`, `--color-deep-black`, etc.), glass morphism utilities (`.glass-nav`, `.glass-mega`), animations.

### Notable pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage with mega menu, hero carousel, faculty grid |
| `teacher-detail.html` | Generic person profile template. `?id=<id>` looks up `src/teachers.js`. Sections (bio / achievements / courses / email / office) **auto-hide when empty**, so the same template renders fine for admin staff (no academic output). |
| `leadership.html` | 4 leader cards, each wraps as `<a href="teacher-detail.html?id=...">` |
| `admissions.html`, `talent-development.html`, `events.html`, `golden-years.html`, etc. | Content pages |
| `*_online.html` | Simplified online-only variants. **Excluded from Vite build** (served as static files, no JS bundle). Used by the legacy 在线 sub-host. |
| `en/*.html` | English mirror of every zh page; each zh page has an EN switcher in the top-right nav linking to `en/<same>.html` |

### Design patterns

- **Glass morphism nav**: backdrop-filter switches on scroll (`src/main.js`)
- **Mega menu**: hover-triggered, CSS transitions, no JS
- **Lucide icons**: declare via `data-lucide="<name>"`; `createIcons({ icons })` initializes globally, and is re-called after dynamic teacher content is injected
- **Path alias**: `@/` → project root (both `vite.config.ts` and `tsconfig.json`)

## Environment

No env vars required. `.env.example` is intentionally empty (placeholder for any future secrets).

## Dependencies

Lean set, regularly audited (`npm audit` reports 0):

- Runtime: `@tailwindcss/vite`, `tailwindcss`, `embla-carousel`, `embla-carousel-autoplay`, `lucide`
- Build: `vite`, `glob`, `typescript`, `@types/node`

No React, Express, sqlite, Gemini SDK, dotenv — all removed in the 2026-04 cleanup. If a future feature needs them, add deliberately.

## Deployment

Vercel project: `continue-college` (team `degoneds-projects`).

| URL | Notes |
|---|---|
| https://cloudmake.top | Production primary |
| https://www.cloudmake.top | Production alias |
| https://continue-college.vercel.app | Vercel-assigned fallback |

### Auto-deploy

`git push origin main` → GitHub integration triggers Vercel build → live in ~30s.

### Manual deploy

```bash
npx vercel --prod --yes
```

### Domain / DNS

`cloudmake.top` is on **DNSPod** (kiwi.dnspod.net / plateau.dnspod.net). Records:

| 主机记录 | 类型 | 值 |
|---|---|---|
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

SSL: Vercel-managed Let's Encrypt, auto-renew every ~60d.

### `vercel.json`

```json
{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}
```

Vercel checks filesystem before rewrite, so `/about.html`, `/en/index.html` etc. serve directly. The rewrite only catches truly missing paths.

## Conventions

- **No external CDNs in production HTML.** Don't reintroduce `<script src="https://unpkg.com/...">` — bundle everything through `src/main.js` (privacy + supply-chain).
- **Stay vanilla JS.** No React/Vue/framework migration unless explicitly requested. The site uses imperative DOM manipulation in `src/main.js`.
- **Article content uses default black sans-serif.** The "正文" area on detail pages mimics what the 博达 CMS rich-text editor will produce: black text, bold black h3, simple `<ul>` lists. No serif, no primary-color headings inside content body (those are reserved for page chrome).

## Local SSH note

GitHub SSH port 22 is blocked on this network. `~/.ssh/config` has `Host github.com / Hostname ssh.github.com / Port 443` routing to keep `git@github.com:...` URLs working.
