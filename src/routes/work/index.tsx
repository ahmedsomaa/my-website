import { createFileRoute, Link } from '@tanstack/react-router'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { HOME_MOTION_EASE } from '@/components/home-section-motion'
import { Pagination } from '@/components/pagination'
import { PAGE_ACCENTS } from '@/lib/page-accents'
import { seo } from '@/lib/site'
import { pageSearchSchema, paginate } from '@/lib/pagination'
import {
  WORK_PAGE_SIZE,
  buildWorkRows,
  directoryPathParts,
} from '@/lib/work-rows'
import type { WorkRow } from '@/lib/work-rows'

export const Route = createFileRoute('/work/')({
  // Static content that should be indexed: render fully on the server.
  ssr: true,
  staticData: { accent: PAGE_ACCENTS.work },
  validateSearch: pageSearchSchema,
  loaderDeps: ({ search: { page } }) => ({ page: page ?? 1 }),
  loader: ({ deps: { page } }) =>
    paginate(buildWorkRows(), page, WORK_PAGE_SIZE),
  head: () => {
    const h = seo({
      title: 'Work — Ahmed Ismail',
      description: "A directory of products I've built, with case studies.",
      path: '/work',
    })
    return h
  },
  component: WorkIndex,
})

function StackChips({ tags }: { tags: string[] }) {
  if (!tags.length) return null
  return (
    <div className="flex flex-wrap gap-1.5 pt-0.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block font-mono-pair text-xs uppercase tracking-[0.12em] text-muted-foreground border hairline px-1.5 py-0.5"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function WorkLineRow({
  row,
  globalIndex,
}: {
  row: WorkRow
  globalIndex: number
}) {
  const { prefix, emphasis } = directoryPathParts(row)
  const rowClass =
    'group flex gap-3 md:gap-4 py-6 md:py-8 transition-colors hover:bg-foreground/5'

  const inner = (
    <>
      <span className="font-mono-pair text-xs text-muted-foreground tabular-nums shrink-0 w-7 pt-1">
        {String(globalIndex).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2 flex-1">
            <p className="font-mono-pair text-sm md:text-base text-foreground leading-snug normal-case">
              <span className="text-muted-foreground">{prefix}</span>
              <span className="text-accent-page">{emphasis}</span>
            </p>
            <h2 className="font-display text-lg md:text-2xl uppercase leading-tight">
              {row.title}
            </h2>
          </div>
          <ArrowUpRight
            className="shrink-0 h-4 w-4 md:h-5 md:w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground mt-0.5"
            strokeWidth={1.25}
          />
        </div>
        {row.description ? (
          <p className="font-ntype text-[0.9375rem] md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {row.description}
          </p>
        ) : null}
        <StackChips tags={row.stack} />
        <p className="font-mono-pair text-xs md:text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {row.date}
        </p>
      </div>
    </>
  )

  if (row.external) {
    return (
      <a href={row.href} target="_blank" rel="noreferrer" className={rowClass}>
        {inner}
      </a>
    )
  }
  const slug = row.href.replace(/^\/work\//, '')
  return (
    <Link to="/work/$slug" params={{ slug }} className={rowClass}>
      {inner}
    </Link>
  )
}

function WorkIndex() {
  const reduceMotion = useReducedMotion() === true
  const { items, page, totalPages, offset } = Route.useLoaderData()

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] building-blocks pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <m.header
        className="relative mb-16 md:mb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: HOME_MOTION_EASE }}
      >
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          02 / work — ls -la ~/work
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">directory</span> of products
          I&apos;ve built.
        </h1>
      </m.header>

      <m.div
        className="border-t hairline"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
        transition={{
          duration: 0.5,
          ease: HOME_MOTION_EASE,
          delay: reduceMotion ? 0 : 0.05,
        }}
      >
        {items.length === 0 ? (
          <div className="py-10 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
            // no projects listed
          </div>
        ) : (
          <ul className="list-none m-0 border-x border-b hairline bg-background">
            {items.map((row, i) => (
              <m.li
                key={row.key}
                className="border-b hairline last:border-b-0"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: i % 2 === 0 ? -14 : 14 }
                }
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{
                  once: true,
                  amount: 0.12,
                  margin: '0px 0px -36px 0px',
                }}
                transition={{
                  duration: 0.52,
                  ease: HOME_MOTION_EASE,
                  delay: reduceMotion ? 0 : 0.035 + i * 0.06,
                }}
              >
                <WorkLineRow row={row} globalIndex={offset + i + 1} />
              </m.li>
            ))}
          </ul>
        )}
      </m.div>

      {totalPages > 1 && (
        <Pagination
          to="/work"
          page={page}
          totalPages={totalPages}
          label="Work list pagination"
        />
      )}

      <div className="relative mt-10 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          ← index
        </Link>
      </div>
    </div>
  )
}
