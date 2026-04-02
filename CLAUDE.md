# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 3000 (host 0.0.0.0)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run clean     # Remove dist directory
```

No test suite is configured.

## Environment

Copy `.env.example` to `.env` and provide:
- `GEMINI_API_KEY` — required for Google Gemini AI integration
- `APP_URL` — auto-injected by AI Studio at runtime

## Architecture

**Multi-page static site** for a Chinese university's continuing education college (深圳技术大学继续教育学院), built with:
- **Vite 6** with a multi-entry build — `vite.config.ts` uses `glob.sync('*.html')` to auto-discover every `.html` file at the project root and build each as an independent entry point
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- **src/main.js** — single JS entry shared across all pages; initializes Lucide icons, two Embla Carousel instances (Calendar + Faculty), search modal, and navbar scroll effects
- **src/index.css** — Tailwind base + custom theme variables, glass morphism utilities (`.glass-nav`, `.glass-mega`), and animation classes

Each HTML page at the root is a self-contained page template. New pages are automatically picked up by the build.

### Key design patterns

- **Glass morphism nav**: navbar switches to `backdrop-filter: blur()` with semi-transparent background on scroll
- **Mega menu**: hover-triggered dropdown navigation built with CSS transitions and cubic-bezier easing
- **Lucide icons**: rendered via `data-lucide` attributes on HTML elements, initialized globally in `main.js`
- **Path alias**: `@/` maps to the project root (configured in both `vite.config.ts` and `tsconfig.json`)

### Installed but lightly used

- React 19 + ReactDOM are installed but the current pages use vanilla JS — available if React components are needed
- Express.js and better-sqlite3 are present for potential server-side/API work
- `@google/genai` SDK is available for Gemini integration

## Deployment

Deployed on Vercel (`vercel.json` present). All routes rewrite to `/index.html` in the Vercel config.
