import type { CSSProperties, ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import appCss from '@/styles.css?url'
import majorMono from '@/assets/fonts/major-mono-display-latin.woff2?url'
import inconsolata from '@/assets/fonts/inconsolata-latin-wght.woff2?url'
import nType from '@/assets/fonts/NType82-Regular.otf?url'
import SiteLayout from '@/components/layout/site-layout'
import { NotFound } from '@/components/not-found'
import { ModeProvider, useMode } from '@/context/mode-context'
import { PAGE_ACCENTS } from '@/lib/page-accents'
import type { PageAccent } from '@/lib/page-accents'
import { HOME_TITLE } from '@/lib/site'
import { DEFAULT_UI_PREFS, UI_PREFS_COOKIE } from '@/lib/ui-prefs'

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    /** HSL triplet applied as `--accent-page` while this route is the deepest match. */
    accent?: PageAccent
  }
}

const THEME_BOOT_SCRIPT = `try{var m=document.cookie.match(/(?:^|; )${UI_PREFS_COOKIE}=([^;]*)/);var p=m?JSON.parse(decodeURIComponent(m[1])):{};var c=document.documentElement.classList;c.toggle('dark',p.theme!=='light');c.toggle('raw-mode',p.mode==='raw');c.toggle('polished',p.mode!=='raw')}catch(e){}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Fallback only (404s); every real route sets its own via seo().
      { title: HOME_TITLE },
      { name: 'author', content: 'Ahmed Ismail' },
      {
        name: 'keywords',
        content:
          'Som3aware, Software Engineering, Career, Events, Blog, About, Contact',
      },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { property: 'og:site_name', content: 'Som3aware' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@som3aware' },
      { name: 'twitter:creator', content: '@som3aware' },
    ],
    // Pages are prerendered, so the saved theme/mode cookie is applied before first paint
    // here and synced into React state by ModeProvider after hydration.
    scripts: [{ children: THEME_BOOT_SCRIPT }],
    links: [
      {
        rel: 'icon',
        href: '/favicon.png',
        type: 'image/png',
        sizes: '256x256',
      },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      {
        rel: 'preload',
        href: majorMono,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: inconsolata,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: nType,
        as: 'font',
        type: 'font/otf',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: () => (
    <SiteLayout>
      <NotFound />
    </SiteLayout>
  ),
})

function Document({ children }: { children: ReactNode }) {
  const { mode, theme } = useMode()
  const accent = useMatches({
    select: (matches) =>
      [...matches].reverse().find((m) => m.staticData.accent)?.staticData
        .accent,
  })
  const classes = [
    theme === 'dark' ? 'dark' : '',
    mode === 'raw' ? 'raw-mode' : 'polished',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <html
      suppressHydrationWarning
      lang="en-US"
      className={classes}
      style={
        {
          '--page-accent-light': (accent ?? PAGE_ACCENTS.home).light,
          '--page-accent-dark': (accent ?? PAGE_ACCENTS.home).dark,
        } as CSSProperties
      }
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <ModeProvider initial={DEFAULT_UI_PREFS}>
      <Document>{children}</Document>
    </ModeProvider>
  )
}

function RootLayout() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SiteLayout>
          <Outlet />
        </SiteLayout>
      </MotionConfig>
    </LazyMotion>
  )
}
