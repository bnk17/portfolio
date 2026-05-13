# Project Context: Minimalist Personal Portfolio 2026

## 🎯 Purpose & Vision
Build a premium, high-performance portfolio for a **Senior/Mid Product-Minded Engineer** (ex-Meero). 
The aesthetic is strictly inspired by minimalist design-engineering portfolios: heavy focus on typography, whitespace, and subtle micro-interactions.

## 🎨 Visual Identity (UI/UX)
- **Theme:** Strictly **Light Mode** (White background `#FFFFFF`, deep charcoal/black text `#111111`).
- **Style:** Minimalist, "Inter" or "Geist" typography, grid-based layout but very airy.
- **Project Cards:** Bento-style or simple cards with large padding, subtle borders (border-grey-100), and center-aligned icons/logos (referencing the Jakub Krehel aesthetic).
- **Interactions:** Subtle hover effects (e.g., slight scaling or opacity changes), smooth page transitions using Framer Motion.

## 🛠 Tech Stack
- **Framework:** react + vite.
- **Styling:** Tailwind CSS (utility-first, no heavy UI libraries unless necessary).
- **Animation:** Framer Motion (for entrance and hover states).
- **Icons:** Lucide React (minimalist stroke).
- **Components:** Shadcn/ui (only for essential primitives like Dialog/Tooltip), but keep custom-styled buttons and cards to match the minimal aesthetic.

## 🏗 Content Structure
1. **Header:** Small avatar, Name, Current Role/Company.
2. **Intro:** Short, high-impact paragraph. Mentioning Meero/Diffusely experience and the "Product Lab" for AI experiments.
3. **Projects Grid:** Minimal cards. Title + short tagline. Use SVG icons or simple logos in the center of a colored/textured container.
4. **Lab/Tools Section:** A simple list of micro-SaaS utilities (Zod visualizer, RAG experiments).
5. **Contact/Socials:** Inline links in the footer or intro paragraph (e.g., @twitter, @github, email).

## 🤖 Engineering Guidelines for Claude
- **Component Pattern:** Arrow functions with explicit `Props` types.
- **Styling:** Use `clsx` or `tailwind-merge` for dynamic classes.
- **Performance:** Zero unnecessary Client Components. Fetch project data from a static `constants` file or a headless CMS.
- **Clean Code:** Absolute imports (`@/components/...`). Strictly type-safe (no `any`).

