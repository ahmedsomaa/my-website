import { createFileRoute } from '@tanstack/react-router'
import { getAllCaseStudiesSorted } from '@/lib/case-studies'
import { absoluteUrl } from '@/lib/site'

const STATIC_PATHS = ['/', '/work', '/about']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...STATIC_PATHS,
          ...getAllCaseStudiesSorted().map((s) => `/work/${s.slug}`),
        ]
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${absoluteUrl(p)}</loc></url>`).join('\n')}
</urlset>
`
        return new Response(body, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
