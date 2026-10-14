import { Link } from '@tanstack/react-router'
import { m, useReducedMotion } from 'framer-motion'
import { HOME_MOTION_EASE } from '@/components/home-section-motion'

const LINK_CLASS =
  'hover:text-foreground transition-colors aria-disabled:opacity-30 aria-disabled:pointer-events-none'

export function Pagination({
  to,
  page,
  totalPages,
  label,
}: {
  to: '/work'
  page: number
  totalPages: number
  label: string
}) {
  const reduceMotion = useReducedMotion() === true
  const atStart = page <= 1
  const atEnd = page >= totalPages

  return (
    <m.nav
      className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground"
      aria-label={label}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: HOME_MOTION_EASE }}
    >
      <Link
        to={to}
        search={{ page: Math.max(1, page - 1) }}
        aria-disabled={atStart}
        tabIndex={atStart ? -1 : undefined}
        className={LINK_CLASS}
      >
        ← prev
      </Link>
      <span className="tabular-nums">
        page {page} / {totalPages}
      </span>
      <Link
        to={to}
        search={{ page: Math.min(totalPages, page + 1) }}
        aria-disabled={atEnd}
        tabIndex={atEnd ? -1 : undefined}
        className={LINK_CLASS}
      >
        next →
      </Link>
    </m.nav>
  )
}
