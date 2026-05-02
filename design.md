---
# Optional machine-readable layer (inspired by https://github.com/google-labs-code/design.md )
version: "1.0"
name: "ode-to portfolio"
description: "Personal site design system — monospace display, technical accents, stack-derived palette."

colors:
  # Primary UI blue (hero highlights, links, section labels in many places)
  ts-blue: "hsl(211 60% 43%)" # light; dark theme uses ~211 70% 60%
  ts-blue-soft: "hsl(211 60% 96%)" # light surface tint

  # Stack-derived brand chips (see src/index.css --brand-*)
  brand-react: "hsl(193 95% 60%)"
  brand-node: "hsl(120 35% 55%)"
  brand-typescript: "hsl(211 70% 60%)"
  brand-css: "hsl(215 78% 62%)"
  brand-javascript: "hsl(53 93% 60%)"
  brand-tailwind: "hsl(189 94% 55%)"
  brand-html: "hsl(14 88% 56%)"

typography:
  display:
    family: '"Major Mono Display", ui-monospace, monospace'
    usage: "Primary headlines (h1–h3), nav wordmark, project titles in listings."
  subtitle:
    family: '"Inconsolata", ui-monospace, monospace'
    usage: "Eyebrows, labels, tables, meta lines, buttons — class `font-mono-pair`."
  body:
    family: '"NType82", ui-sans-serif, system-ui, sans-serif'
    usage: "Long-form and editorial copy — class `font-ntype`. NType82 Mono available as `font-ntype-mono` for code-adjacent UI."
---

# Design system

This document is the single source of truth for **visual identity** on this site. It follows the spirit of the open [**DESIGN.md**](https://github.com/google-labs-code/design.md) format: YAML above for tokens, Markdown below for **how and why** to apply them.

## Overview

The UI reads as a **terminal-meets-editorial** portfolio: fine grids, hairline borders, and a **stack-derived color palette** for accents and highlights. The **primary brand blue** (`ts-blue`) anchors the **home** hero and global chrome. For **each new page**, pick **one highlight color at random** from the **`--brand-*` set** (React, Node, TypeScript, CSS, JavaScript, Tailwind, HTML) so pages feel varied while staying on-system — then use that color consistently for that page’s hero emphasis (for example a keyword in the title, glow wash, or small UI chips). Do not treat any single stack color as permanently bound to a route unless you intentionally lock it in code.

## Colors

### Main blue (home & global chrome)

The **main color** is **`ts-blue`** — used on the home hero for emphasis (for example the animated “elegant” line), status dots, and many focus/label accents. In CSS it is defined as `--ts-blue` and exposed as `text-ts-blue`, `bg-ts-blue`, `border-ts-blue`, etc. It aligns with the **TypeScript / editor-blue** side of the stack rather than the brighter React cyan, so the site stays calm and readable while still feeling “dev native.”

### Stack-derived palette (`--brand-*`)

These tokens are **inspired by common tooling colors** (logos and community associations, not official brand guidelines). Together they form the **palette** you draw from when assigning a **random accent** to a new page:

| Token | Rough mapping | Notes |
|--------|----------------|--------|
| `--brand-react` | React / **React Native** / **Expo** (cyan family) | |
| `--brand-node` | **Node.js** (green) | |
| `--brand-ts` | **TypeScript** | Near `ts-blue`; use when you want TS-adjacent but from the brand set |
| `--brand-css` | **CSS** | Cool blue-violet |
| `--brand-js` | **JavaScript** | Warm yellow |
| `--brand-tailwind` | **Tailwind CSS** | Teal / cyan |
| `--brand-html` | **HTML** | Orange-red, distinct from JS yellow |

Use Tailwind: `text-brand-react`, `bg-brand-node`, `text-brand-html`, etc. (see `@theme inline` in `src/index.css`).

### Neutrals & structure

- **`--background` / `--foreground`** — page canvas and default text.
- **`--muted` / `--muted-foreground`** — secondary text (hero subcopy, captions).
- **`--grid-line`** — grid and dot patterns.
- **`--hairline`** — 1px borders (`.hairline` utility).

## Typography

Three intentional roles (implemented in `index.html`, `src/index.css`, and utilities):

1. **Major Mono Display** — **Headlines** (`font-display`, `--font-display`). All-caps display feel; used for hero title, page titles, and prominent product names.
2. **Inconsolata** — **Subtitles & UI chrome** (`font-mono-pair`, default `font-sans` stack includes Inconsolata). Section indexes (`01 / about`), navigation, tables, tags, buttons.
3. **NType82** (local `.otf`) — **Body & long content** (`font-ntype`). Philosophy paragraphs, case study prose, contact descriptive copy.

**Note:** `body` uses `font-sans` which maps to Inconsolata for a default technical rhythm; **prefer `font-ntype` on paragraphs** where the spec calls for editorial texture.

## Page shells & hero pattern

Every **major routed page** (except the minimal 404) should reinforce **place** with:

1. **Grid or line motif** — subtle, non-interactive background in the **hero band** (top ~280–420px):
   - **Line grids:** `grid-bg`, `grid-bg-fine`, `grid-vercel`, `grid-vercel-dense` (`src/index.css`).
   - **Dots:** `grid-dot` — radial dot field with soft elliptical mask.
2. **One highlight color per page** — choose **at random** from the stack-derived tokens **`--brand-react`**, **`--brand-node`**, **`--brand-ts`**, **`--brand-css`**, **`--brand-js`**, **`--brand-tailwind`**, **`--brand-html`**. Apply it to a focal hero element (title span, underline, radial wash, or border) and keep the rest of the page neutral so the pick reads as intentional.

Optional: a soft radial wash behind the hero can reuse the same hue at low alpha (similar in spirit to a subtle glow), built from whichever brand token you selected for that page.

### Adding a new page

1. Pick **one** brand token at random from the list above (or roll dice / use a PR comment to “freeze” the choice for that page forever).
2. Layer **`grid-*` or `grid-dot`** behind the page header block (absolute, `pointer-events-none`, fixed height from top).
3. Wire the chosen color into hero highlights for that page only (inline style with `hsl(var(--brand-…))`, Tailwind `text-brand-*`, or a small page-scoped CSS variable).

## Layout & motion

- **Max width:** content blocks commonly use `max-w-7xl` with horizontal padding `px-6 md:px-10`.
- **Hero top spacing:** `pt-20` (and similar) so content clears the fixed header.
- **Motion:** Framer Motion on the home hero; keep other pages comparatively static unless there is a strong narrative reason.

## File reference

| Concern | Location |
|---------|-----------|
| Color & theme tokens | `src/index.css` (`:root`, `.dark`, `@theme inline`) |
| Google Fonts (display + mono) | `index.html` |
| NType82 `@font-face` | `src/index.css` |
| Global fine grid | `src/components/layout/site-layout.tsx` |

---

*When updating tokens, keep this file and `src/index.css` in sync so humans and coding agents share one contract.*
