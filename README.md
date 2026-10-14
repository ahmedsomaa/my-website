# som3aware — portfolio

TanStack Start (React, SSR + streaming) on Cloudflare Workers. The previous Vite SPA lives in `v1/` for reference.

## Develop

```bash
bun install
bun --bun run dev      # http://localhost:3000
bun run typecheck && bun run lint && bun run test && bun run build
```

## Deploy

```bash
VITE_SITE_URL=https://your-domain.example bun run deploy
```

`VITE_SITE_URL` drives canonical URLs, social tags, `sitemap.xml` and `robots.txt`.

## Where things are

| Concern             | Location                                                             |
| ------------------- | -------------------------------------------------------------------- |
| Routes (file-based) | `src/routes/` — `/`, `/about`, `/work`, `/work/$slug`                |
| Case studies        | `src/data/case-studies/*/index.json` (cover images live in the JSON) |
| Server functions    | `src/server/*.functions.ts`                                          |
| Per-route SEO       | `seo()` in `src/lib/site.ts`                                         |
| Security headers    | `src/start.ts`                                                       |
| Design system       | `design.md`, tokens in `src/styles.css`                              |

## Notes

- Theme and grid mode are stored in the `ui-prefs` cookie and read on the server, so the first paint is correct.
