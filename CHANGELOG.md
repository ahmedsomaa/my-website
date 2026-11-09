# Changelog

All notable changes to som3aware, the portfolio of Ahmed Abu Qahf.
Dates are when a version reached `main`. The site shows this file as its changelog page.

## v3: TUI workspace (unreleased)

The site becomes a terminal-style workspace, built in React 19 and Tailwind CSS v4.

### Added

- Two-pane workspace with tabs: index, projects, experience, toolbox, about, principles, contact, changelog
- Keyboard control: `1`–`8` sections, `j`/`k` move, `⏎` open, `/` and `⌘K` command palette, `t` theme, `f` font, `c` copy, `z` expand, `?` help
- 84 themes (tui-design skill themes, every Shiki theme, Flexoki, Vesper, Nightfox, Zenbones, Noctis, Sonokai); default follows the system: Vitesse Light or Vitesse Black
- 11 self-hosted monospace fonts (default Xanh Mono) plus pixel heading fonts, all at one size
- Brand icons (Simple Icons, Devicon) next to tech, stacks and contact links
- Dithered project screenshots that repaint in the active theme
- Plain reading view at `?plain`
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and this changelog page

### Changed

- "Work" is now "projects", "expertise" is now "toolbox", and principles have their own tab; old `#/work`, `#/expertise` and `#/philosophy` links still resolve
- Experience lists the products first, then what was done there
- Copy is on `c` (was `y`)

## v2: TanStack Start (2026-10-14)

Tagged `v2`.

### Changed

- Rebuilt on TanStack Start with SSR, prerendered to static HTML for Cloudflare Pages
- Removed the v1 directory

## v1: Vite single-page app (2026-05-02 to 2026-06-27)

### Added

- Case studies with cover images, work listings, about timeline, testimonials and connect sections
- Blog listing, later moved to `/writing` and hidden
- Dark mode by default, page motion and scroll reveals
- Favicon and Open Graph images
- Cloudflare Pages headers, SPA redirects and pinned build settings
