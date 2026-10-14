import type { ReactNode } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useRouterState } from '@tanstack/react-router'
import SiteHeader from './site-header'
import SiteFooter from './site-footer'
import { useMode } from '@/context/mode-context'

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { mode } = useMode()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      {mode === 'raw' && (
        <>
          <div className="pointer-events-none fixed inset-0 grid-bg-fine opacity-70 z-0" />
          <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-foreground/20 animate-scan z-10" />
        </>
      )}
      <SiteHeader />
      {/* initial={false}: the server-rendered page must paint visible, not fade in from 0. */}
      <AnimatePresence mode="wait" initial={false}>
        <m.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-[1]"
        >
          {children}
        </m.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  )
}
