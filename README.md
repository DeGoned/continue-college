# continue-college

Multi-page static site for a continuing-education college, built with Vite 6 + Tailwind CSS 4. Vanilla JS, no framework.

Live: **https://cloudmake.top**

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

No environment variables required.

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

## Deploy

Auto-deploys on `git push origin main` via Vercel GitHub integration.

Manual: `npx vercel --prod --yes`

## Project layout

```
.
├── *.html              # one page = one HTML file (Vite multi-entry)
├── en/*.html           # English mirror of each zh page
├── *_online.html       # simplified online-only variants (excluded from Vite build)
├── src/
│   ├── main.js         # single shared JS bundle (icons, carousels, teacher renderer)
│   ├── teachers.js     # TEACHERS map for teacher-detail.html?id=<id>
│   └── index.css       # Tailwind + theme tokens + utilities
├── public/             # static assets (images, icons)
├── vite.config.ts
└── vercel.json
```

For architecture details, see [CLAUDE.md](./CLAUDE.md).

## Adding a teacher

Edit `src/teachers.js`, append a profile under a new key. Then link to it from anywhere:

```html
<a href="teacher-detail.html?id=your-new-id">...</a>
```

Sections (achievements / courses / email / office) auto-hide if empty, so admin/leadership profiles can omit academic fields.

## Adding a page

Drop a new `.html` at the project root (or under `en/` for English version). Vite picks it up on the next build automatically.
