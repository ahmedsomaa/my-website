# My Personal Website

This repository is **my portfolio site** — a terminal-meets-editorial layout with case studies and writing (Hashnode-backed listing). Motion and transitions use **[Framer Motion](https://www.framer.com/motion/)**. Visual identity and tokens are documented in [`design.md`](./design.md).

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 (via `@tailwindcss/vite`)
- [React Router](https://reactrouter.com/) for client-side routing
- [Framer Motion](https://www.framer.com/motion/) for UI motion
- UI primitives built with patterns aligned to [shadcn/ui](https://ui.shadcn.com/) (Radix-style components, `class-variance-authority`, etc.)
- Data fetching patterns via [@tanstack/react-query](https://tanstack.com/query)

## Prerequisites

- [Bun](https://bun.sh/) (see `packageManager` in `package.json` for the pinned version)

## Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `bun install`        | Install dependencies     |
| `bun run dev`        | Start Vite dev server    |
| `bun run build`      | Production build         |
| `bun run preview`    | Preview production build |
| `bun run lint`       | ESLint                   |
| `bun run test`       | Vitest (single run)      |
| `bun run test:watch` | Vitest watch mode        |

## Routes (overview)

| Path          | Purpose                                    |
| ------------- | ------------------------------------------ |
| `/`           | Home                                       |
| `/about`      | About                                      |
| `/work`       | Work index                                 |
| `/work/:slug` | Case study detail                          |
| `/writing`    | Writing index (posts from Hashnode)        |

## Design system

Typography, colors (`ts-blue`, `--brand-*` accents), and page shell patterns live in **`design.md`**. When changing global styles or marketing layout, keep **`design.md`** and **`src/index.css`** aligned.

## Credits

- [NOTHING](https://nothing.tech) Tech. All Rights Reserved. NType fonts are documented in the community repo [xeji01/nothingfont](https://github.com/xeji01/nothingfont).

## License

This is a private repository.
