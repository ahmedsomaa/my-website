# Changelog

All notable changes to som3aware, the portfolio of Ahmed Abu Qahf.
Dates are when a version reached `main`. The site shows this file as its changelog page.

## v3.2: no project images (unreleased)

### Removed

- Project screenshots and the halftone effect; work pages are text only, with the same sections for every project

## v3.1: content rework (2026-11-10)

Every page now reads from one data file, and the content was rewritten around real work.

### Added

- `data/ahmed.json`: one source for the profile, work, experience, skills, tools, education and testimonials; `bun run data` writes a Markdown copy
- Home: services grid ("what I do"), years of experience, current role and core stack in the hero
- Work: 21 projects in two groups, professional and side projects, newest first; every project page uses the same sections
- Experience: several roles per company (internships, full-time), and each company in its brand colour on the graph
- Toolbox: daily tools (editors, terminal, browsers, design, API and data, machines)
- About: journey (from the first computer and a sixth-grade laptop prize to Cypienta), education with awards, and life outside work
- Philosophy: eight values (honest, open-minded, simple, detail-minded, creative but realistic, always learning, helping people grow, sharing what I know), each with an "in practice" line, in a single column with pixel-font titles
- Brand colours from Simple Icons, matched to the active theme, for every tech icon
- Icons for Zed, Zen Browser, VS Code, OpenAI, Pinecone and Segment, and logos from their own sites for LiveCodes, Paper, TinyCast, Better Shot, MacUSB and Dbstudio
- Screenshots for Cypienta, Stayro, Reconciled, Editor Setup, Sharp Studio, Covid Tracker and this site, shown halftoned
- Open Graph image (`og.png`) and link-preview tags for LinkedIn, Slack, X and WhatsApp
- Canonical URL, theme colour and structured data (schema.org `ProfilePage` and `Person`) for search engines

### Changed

- "Projects" is now "work", and "principles" is now "philosophy"; old `#/projects` and `#/principles` links still resolve
- Home: two main buttons, "selected work" with five rows, and testimonials in a grid with exact quotes
- Toolbox: main stack and "also used" only, shown as chips; skill levels removed
- Cypienta listed as its own company; titles and dates corrected
- Work rows stack on narrower screens so wide fonts no longer overflow
- Phone header: section tabs get their own row with a fade that shows they scroll, so none are cut off
- Work and selected work are ordered by most recent end date
- Plain view is wider (96 characters)
- `robots.txt` points to `llms.txt`
- Page description, `llms.txt`, `llms-full.txt` and `sitemap.xml` match the new content

## v3: TUI workspace (2026-11-09)

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
