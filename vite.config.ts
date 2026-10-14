import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      // Cloudflare Pages serves static files only, so every page is rendered to HTML at build.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Crawling the CV link would overwrite the real PDF with a re-encoded copy.
        filter: (page) => !page.path.startsWith('/docs/'),
      },
      pages: [{ path: '/robots.txt' }, { path: '/sitemap.xml' }],
    }),
    viteReact(),
  ],
})

export default config
