# Portfolio — AI-Augmented Frontend Dev

## Purpose

This portfolio is designed to impress CTOs and Lead Devs at product companies. Each case study picks one feature from a real company's product, improves it with AI, and documents the full process: plan → iteration → implementation.

The aesthetic is premium AI-native — think Claude.ai, Warp.dev, Magnus. Dark, precise, intentional. Not a typical dev portfolio.

---

## Stack

| Tool                     | Role                                                           |
| ------------------------ | -------------------------------------------------------------- |
| **Bun**                  | Package manager — use `bun add`, `bun run`, never `npm`/`yarn` |
| **Vite**                 | Build tool                                                     |
| **React + React Router** | UI + routing (file-based or declarative routes)                |
| **TypeScript**           | Strict mode. No `any`.                                         |
| **Radix UI**             | Headless component primitives — the design system foundation   |
| **Framer Motion**        | All animations — no CSS transitions for anything interactive   |

---

## Design System

### Aesthetic

Light theme by default, with a toggle for dark mode. Clean, editorial, precise — think Linear's light mode, Vercel dashboard, Notion. Dark mode mirrors the original AI-native aesthetic (near-black, glow accents). Both themes feel intentional, not like an afterthought.

### Theme Toggle

- Default: light mode
- Toggle persists in `localStorage` under `"theme"` (`"light"` | `"dark"`)
- Applied via a `data-theme` attribute on `<html>` — all tokens swap via CSS vars
- Toggle component lives in the nav — use a Radix `Toggle` or a simple button with a Framer Motion icon swap animation

### Color Tokens (define in CSS vars, swap via `[data-theme="dark"]`)

```css
/* Light (default) */
:root {
  --bg-base: #f9f9f8;
  --bg-surface: #ffffff;
  --bg-elevated: #f3f3f0;
  --border: rgba(0,0,0,0.08);
  --border-hover: rgba(0,0,0,0.16);
  --text-primary: #121212;
  --text-secondary: #4a4a4a;
  --text-muted: #8c8c8c;
  --accent: #4c6ef5;              /* indigo — primary accent */
  --accent-glow: rgba(76,110,245,0.12);
  --accent-alt: #0ca678;          /* teal — secondary accent */
}

/* Dark */
[data-theme="dark"] {
  --bg-base: #0a0a0b;
  --bg-surface: #111113;
  --bg-elevated: #1a1a1f;
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.15);
  --text-primary: #f0f0f0;
  --text-secondary: #888;
  --text-muted: #555;
  --accent: #7c6ff7;              /* violet — primary AI accent */
  --accent-glow: rgba(124,111,247,0.15);
  --accent-alt: #22d3ee;          /* cyan — secondary accent */
}
```

### Typography

- Font: **Geist** (Vercel) or **Inter** — clean, modern, not trying too hard
- Code blocks: **Geist Mono** or **JetBrains Mono**
- Scale: tight leading, generous letter-spacing on headings

### Spacing

Follow an 8px base grid. Use Tailwind-style logical sizes if you build a custom scale.

### Radix UI Usage

- Always use Radix primitives as the base for interactive components (Dialog, Tooltip, DropdownMenu, Tabs, etc.)
- Style them via `className` with CSS vars — never override Radix internal styles via selectors
- Compose Radix + Framer Motion by wrapping Radix with `motion()` or using `AnimatePresence` around conditional renders

---

## Animation Principles

All motion via **Framer Motion**. No raw CSS transitions for interactive elements.

### Core motion config (reuse across components)

```ts
export const spring = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};
```

### Rules

- Page transitions: fade + slight Y shift (8–12px), duration ~250ms
- List items: stagger with `staggerChildren`
- Hover states: scale(1.02) or subtle glow — never jarring
- Loading states: skeleton shimmer using Framer keyframes
- Never animate layout properties (width/height) — use `layout` prop instead
- Respect `prefers-reduced-motion` — wrap in a `useReducedMotion` check

---

## Project / Case Study Structure

Each case study lives at `/projects/:slug` and follows this shape:

```
src/
  projects/
    [slug]/
      index.tsx          # Case study page
      meta.ts            # Title, company, feature, tags, date, status
      components/        # Feature demo components specific to this project
```

### `meta.ts` shape

```ts
export const meta = {
  slug: 'linear-ai-triage',
  company: 'Linear',
  feature: 'Issue triage',
  improvement: 'AI-powered priority scoring from PR context',
  tags: ['AI', 'LLM', 'Automation'],
  status: 'complete', // "complete" | "in-progress" | "concept"
  date: '2025-01',
  summary: 'One sentence. What was built and why it matters.',
};
```

### Case Study Page Sections (in order)

1. **Hero** — company + feature name, one-liner, status badge
2. **The Problem** — what the original feature does, what's missing
3. **The Improvement** — what AI adds, how it changes the workflow
4. **Process** — plan → iteration → implementation (timeline or steps)
5. **Live Demo** — interactive component showcasing the improvement
6. **Reflection** — what I learned, what I'd do differently

---

## File Conventions

```
src/
  components/        # Shared UI components
    ui/              # Radix-based primitives (Button, Card, Badge, etc.)
    layout/          # Shell, Nav, PageWrapper
  data/              # Static data and project metadata
    projects.ts      # Project list (slugs, titles, tags, etc.)
    projectDetails.ts# Full case study content per project
  lib/
    motion.ts        # Shared Framer Motion variants
    utils.ts         # cn() and other utils
  pages/             # Route-level pages (Home, About, Projects, Contact, ProjectDetail)
  projects/          # Case studies (one folder per project)
  index.css          # Global CSS and design tokens
  App.tsx            # Root component and route definitions
  main.tsx           # Entry point
```

- Use `cn()` (clsx + tailwind-merge style) for conditional classNames
- Keep components small — split at 80–100 lines
- Co-locate types with the component that owns them
- Never use `default export` for components — use named exports

---

## Commands

```bash
bun dev          # Start dev server
bun build        # Production build
bun preview      # Preview production build
bun typecheck    # tsc --noEmit
```

---

## What to Avoid

- No Bootstrap, MUI, Chakra, or other opinionated component libraries — Radix only
- No `useEffect` for derived state — compute it
- No prop drilling more than 2 levels — use context or co-location
- No placeholder `lorem ipsum` — write real copy
- No generic project names — every case study names the real company and feature
- Don't animate for the sake of it — motion should communicate, not decorate
