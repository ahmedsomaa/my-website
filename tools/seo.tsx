/*
 * Write robots.txt, sitemap.xml, llms.txt and llms-full.txt into public/, so dev and the
 * build both serve them. llms files are rendered from the site's own content (src/content),
 * so they never drift from what the page says. Commit the result.
 *
 * Usage: bun tools/seo.tsx   (also runs first in `bun run build`)
 * VITE_SITE_URL sets the canonical origin (default https://som3aware.pages.dev).
 */
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import type { ReactNode } from 'react'
import { TABS, isSingle } from '#/content'
import { ViewContext } from '#/lib/view'

const SITE = (
  process.env.VITE_SITE_URL ?? 'https://som3aware.pages.dev'
).replace(/\/$/, '')
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public')
/** Last commit that changed the content (stable between builds; today if git is unavailable). */
const lastmod = (() => {
  try {
    const d = execSync('git log -1 --format=%cs -- src/content CHANGELOG.md', {
      cwd: ROOT,
    })
      .toString()
      .trim()
    if (d) return d
  } catch {
    /* no git (e.g. a tarball build) */
  }
  return new Date().toISOString().slice(0, 10)
})()

/** Content block as plain text: block tags become line breaks, list items get a dash. */
function text(node: ReactNode) {
  const html = renderToStaticMarkup(
    <ViewContext value="plain">{node}</ViewContext>,
  )
  return flatten(html)
}

/** Strip tags; inline siblings (grid cells, buttons) get a space so words don't run together. */
function flatten(html: string) {
  return (
    html
      .replace(/<(svg|canvas)[\s\S]*?<\/\1>/g, '')
      // link buttons: own line, with the address
      .replace(
        /<a href="([^"]+)"[^>]*data-link[^>]*>([\s\S]*?)<\/a>/g,
        (_, href: string, label: string) =>
          `\n→ ${label.replace(/<[^>]+>/g, '').replace(' ↗', '')}: ${/^[/#]/.test(href) ? `${SITE}/${href.replace(/^\//, '')}` : href}`,
      )
      .replace(/<\/(span|b|i|em|a|cite|kbd)>/g, '$& ')
      .replace(/<li[^>]*>/g, '\n- ')
      .replace(/<(dt)[^>]*>/g, '\n')
      .replace(/<\/dt>/g, ': ')
      .replace(
        /<(h[1-6]|p|blockquote|cite|ul|ol|dl|section|figure)[^>]*>/g,
        '\n',
      )
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/[ \t]+/g, ' ')
      .replace(/ ([.,:;)])/g, '$1')
      .replace(/\( /g, '(')
      .replace(/\n /g, '\n')
      .replace(/ +\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

const url = (tab: string, slug?: string) =>
  `${SITE}/#/${tab}${slug ? `/${slug}` : ''}`
/** One-line summary: the item's lead line, else its role (experience entries). */
const lead = (node: ReactNode) => {
  const html = renderToStaticMarkup(
    <ViewContext value="plain">{node}</ViewContext>,
  )
  const m =
    html.match(/<p data-lead[^>]*>([\s\S]*?)<\/p>/) ??
    html.match(/<dt>role<\/dt><dd>([\s\S]*?)<\/dd>/)
  return m ? flatten(m[1]).replace(/\n/g, ' ') : ''
}

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

/** Every section and item, as /?p=tab/slug (query strings are separate pages to crawlers; #/ links are not). */
const pages = [
  `${SITE}/`,
  `${SITE}/?plain`,
  ...TABS.slice(1).flatMap((t) =>
    isSingle(t)
      ? [`${SITE}/?p=${t.id}`]
      : [
          `${SITE}/?p=${t.id}`,
          ...t.items.map((x) => `${SITE}/?p=${t.id}/${x.slug}`),
        ],
  ),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`

const index = TABS[0].items[0]
const llms = [
  '# Ahmed Abu Qahf (som3aware)',
  '',
  `> ${lead(index.body)}`,
  '',
  `Portfolio of a senior full-stack engineer. The site is a keyboard-driven terminal-style workspace; every section is also readable as one plain page at ${SITE}/?plain. Full text: ${SITE}/llms-full.txt`,
  '',
  ...TABS.slice(1)
    .filter((t) => t.id !== 'changelog')
    .flatMap((t) => [
      `## ${t.id}`,
      '',
      ...(isSingle(t)
        ? [`- [${t.id}](${url(t.id)})`]
        : t.items.map(
            (x) =>
              `- [${x.key}](${url(t.id, x.slug)})${x.meta ? ` (${x.meta})` : ''}: ${lead(x.body)}`,
          )),
      '',
    ]),
  '## Optional',
  '',
  `- [CV (PDF)](${SITE}/docs/Ahmed_Abu_Qahf___cv_latest.pdf)`,
  `- [Changelog](${url('changelog')})`,
  '',
].join('\n')

const full = [
  '# Ahmed Abu Qahf (som3aware): full site text',
  '',
  `Source: ${SITE}`,
  '',
  ...TABS.filter((t) => t.id !== 'changelog').flatMap((t) =>
    t.items.map(
      (x) =>
        `## ${t.id}${isSingle(t) ? '' : ` / ${x.key}`}\n\nURL: ${isSingle(t) ? url(t.id) : url(t.id, x.slug)}\n\n${text(x.body)}\n`,
    ),
  ),
].join('\n')

const files: Record<string, string> = {
  'robots.txt': robots,
  'sitemap.xml': sitemap,
  'llms.txt': llms,
  'llms-full.txt': full,
}
for (const [name, body] of Object.entries(files)) {
  writeFileSync(join(OUT, name), body)
  console.log(`wrote public/${name} (${body.length} bytes)`)
}
