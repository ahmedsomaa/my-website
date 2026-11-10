/* Content pieces shared by the plain page and the workspace reading pane. */
import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { gray, paint } from '#/lib/dither'
import type { Gray } from '#/lib/dither'
import { ThemeContext, ViewContext } from '#/lib/view'
import { byName, cycle } from '#/lib/hues'
import { Icon } from '#/icons'

type Kids = { children?: ReactNode }

const external = (href: string) =>
  /^https?:|^\/docs\//.test(href)
    ? { target: '_blank', rel: 'noopener' }
    : undefined

/** Link that opens outside the site in a new tab; internal `#/…` links stay put. */
export function A({ href, children }: Kids & { href: string }) {
  return (
    <a href={href} {...external(href)}>
      {children}
    </a>
  )
}

export const H = ({ children }: Kids) => (
  <h3 className="mt-1 mb-2.5 font-px text-title font-normal max-md:text-title-m">
    {children}
  </h3>
)

export const Hero = ({ children }: Kids) => (
  <h4 className="mt-0.5 mb-3.5 font-px text-hero font-normal plain:text-hero-sm short:mb-2 short:text-hero-sm">
    {children}
  </h4>
)

export const Hello = ({ children }: Kids) => (
  <p className="m-0 text-success">{children}</p>
)

/** The one-line summary; `c` copies fall back to selecting it. */
export const Lead = ({ children }: Kids) => (
  <p data-lead className="mt-0 max-w-[56ch] text-lg text-fg">
    {children}
  </p>
)

export const P = ({ children }: Kids) => (
  <p className="mt-2.5 max-w-[64ch] text-pretty text-muted [dl+&]:mt-4.5 [&_b]:font-medium [&_b]:text-fg">
    {children}
  </p>
)

export const Small = ({ children }: Kids) => (
  <p className="mt-3 max-w-[64ch] text-sm text-muted">{children}</p>
)

/** Section heading. `id` like "/about/education" makes it reachable as #/about/education. */
export function Sec({
  children,
  id,
  hue,
}: Kids & { id?: string; hue?: string }) {
  const view = useContext(ViewContext)
  return (
    <h4
      // the plain page scrolls to ids natively; the workspace scrolls by data-anchor
      id={view === 'plain' ? id : undefined}
      data-anchor={id?.split('/').pop()}
      className={clsx(
        "mt-4.5 scroll-mt-4.5 font-normal before:text-line before:content-['──_'] target:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]",
        hue ?? 'text-accent',
      )}
    >
      {children}
    </h4>
  )
}

export function Kv({
  rows,
  wide,
}: {
  rows: Array<[ReactNode, ReactNode]>
  wide?: boolean
}) {
  return (
    <dl
      className={clsx(
        'mt-3.5 grid gap-x-4.5 [&_dd]:min-w-0 [&_dd]:wrap-anywhere [&_dt]:text-muted',
        wide
          ? 'max-w-[72ch] grid-cols-[12ch_minmax(0,1fr)] gap-y-1.5 max-md:grid-cols-[9ch_minmax(0,1fr)] max-md:gap-x-3 [&_dd]:text-muted [&_dd_b]:font-medium [&_dd_b]:text-fg'
          : 'grid-cols-[max-content_1fr] gap-y-0.5 [&_dd]:text-fg',
      )}
    >
      {rows.map(([k, v], i) => (
        <div key={i} className="contents">
          <dt>{k}</dt>
          <dd>
            {k === 'stack' && typeof v === 'string' ? <Stack list={v} /> : v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export const Ul = ({ items }: { items: Array<ReactNode> }) => (
  <ul className="max-w-[64ch]">
    {items.map((x, i) => (
      <li
        key={i}
        className="mt-1.5 pl-[2ch] -indent-[2ch] text-fg before:text-accent before:content-['•_']"
      >
        {x}
      </li>
    ))}
  </ul>
)

export const Branches = ({ items }: { items: Array<ReactNode> }) => (
  <ul className="mt-2 max-w-[64ch]">
    {items.map((x, i) => (
      <li
        key={i}
        className="mt-1 pl-[4ch] -indent-[4ch] text-muted before:text-line-strong before:content-['├─_'] last:before:content-['└─_']"
      >
        {x}
      </li>
    ))}
  </ul>
)

export function Quote({
  children,
  by,
  small,
}: Kids & { by: string; small?: boolean }) {
  return (
    <blockquote
      className={clsx(
        'relative max-w-[60ch] pl-[2ch] text-fg before:absolute before:top-0 before:left-0 before:text-accent before:content-[">"]',
        small ? 'mt-3 text-sm first-of-type:mt-0' : 'mt-4',
      )}
    >
      {children}
      <cite className="mt-1.5 block text-muted not-italic">{by}</cite>
    </blockquote>
  )
}

/** Bordered link button. The first one in the reading pane is what ⏎ opens. */
export function LinkBtn({
  href,
  children,
  alt,
}: Kids & { href: string; alt?: boolean }) {
  return (
    <a
      href={href}
      {...external(href)}
      data-link
      className={clsx(
        'mt-4.5 mr-2 inline-flex gap-2 rounded-[2px] border px-3 py-1 no-underline transition-colors',
        alt
          ? 'border-line text-muted hover:bg-overlay hover:text-fg'
          : 'border-accent text-accent hover:bg-accent hover:text-on-accent data-armed:bg-accent data-armed:text-on-accent',
        'active:bg-[color-mix(in_srgb,var(--accent)_80%,var(--background))] active:text-on-accent',
      )}
    >
      {children}
    </a>
  )
}

export const Cta = ({ children }: Kids) => (
  <p className="mt-2.5 flex flex-wrap">{children}</p>
)

export function Stats({
  items,
  two,
}: {
  items: Array<[string, string]>
  two?: boolean
}) {
  return (
    <ul
      className={clsx(
        'grid gap-2',
        two
          ? 'm-0 flex-1 auto-rows-fr grid-cols-2'
          : 'mt-4 mb-1 max-w-[72ch] grid-cols-[repeat(auto-fit,minmax(14ch,1fr))]',
      )}
    >
      {items.map(([b, s], i) => (
        <li
          key={b}
          className="grid content-center gap-1 rounded-[3px] border border-line-subtle bg-surface px-4 py-3"
        >
          <b
            className={clsx(
              'font-px font-normal',
              two ? 'text-hero-sm short:text-stat' : 'text-stat',
              cycle(i),
            )}
          >
            {b}
          </b>
          <span className="text-sm/[1.35] whitespace-pre-line text-muted">
            {s}
          </span>
        </li>
      ))}
    </ul>
  )
}

export interface Shot {
  src: string
  alt: string
  width: number
  height: number
}

export function Shots({
  kind,
  shots,
}: {
  kind: 'phone' | 'wide'
  shots: Array<Shot>
}) {
  const each = clsx(
    'block min-w-0 rounded-[3px] border border-line',
    kind === 'phone' ? 'h-auto max-w-[180px] flex-[1_1_0]' : 'h-auto w-full',
  )
  return (
    <figure
      className={clsx(
        'mt-4.5 mb-1 flex max-w-[72ch] gap-2.5',
        // wide shots stack so each stays readable; phone shots sit side by side
        kind === 'wide' && 'flex-col',
      )}
    >
      {shots.map((s) => (
        <DitherImg key={s.src} {...s} className={each} />
      ))}
    </figure>
  )
}

/** Image that turns into a two-colour dither in the workspace and repaints on theme change. */
function DitherImg({ className, ...img }: Shot & { className: string }) {
  const view = useContext(ViewContext)
  const theme = useContext(ThemeContext)
  const imgRef = useRef<HTMLImageElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const [g, setG] = useState<Gray | null>(null)

  const load = (el: HTMLImageElement) => {
    try {
      setG(gray(el))
    } catch {
      /* keep the plain image */
    }
  }
  useEffect(() => {
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth) load(el)
  }, [])
  useLayoutEffect(() => {
    if (g && cvRef.current) paint(cvRef.current, g)
  }, [g, theme])

  if (view === 'plain')
    return (
      <img
        {...img}
        loading="lazy"
        className={clsx(className, 'grayscale contrast-110')}
      />
    )
  if (g)
    return (
      <canvas
        ref={cvRef}
        role="img"
        aria-label={img.alt}
        className={clsx(className, 'w-full [image-rendering:pixelated]')}
      />
    )
  return (
    <img
      {...img}
      ref={imgRef}
      className={className}
      onLoad={(e) => load(e.currentTarget)}
    />
  )
}

/** "React · Next.js · Node.js": each tech keeps its own colour across the site. */
/** Separator that stays at the end of a line, so a wrapped line never starts with "·". */
const Sep = ({ last }: { last: boolean }) =>
  last ? null : <span className="text-subtle"> ·</span>

export const Stack = ({ list }: { list: string }) => {
  const items = list.split(' · ')
  return (
    <>
      {items.map((t, i) => (
        <Fragment key={t}>
          {/* icon, name and its separator never split across lines */}
          <span className="whitespace-nowrap">
            <span className={byName(t)}>
              <Icon name={t} />
              {t}
            </span>
            <Sep last={i === items.length - 1} />
          </span>{' '}
        </Fragment>
      ))}
    </>
  )
}

/** "Node.js · Express" in the toolbox: one chip per tech, icon in its brand colour, name in the text colour. */
export const Techs = ({ list }: { list: string }) => (
  <ul className="flex flex-wrap gap-1.5">
    {list.split(' · ').map((t) => (
      <li
        key={t}
        className="inline-flex items-center rounded-[3px] border border-line-subtle bg-surface px-1.5 py-px whitespace-nowrap text-fg plain:bg-transparent"
      >
        <span className={byName(t)}>
          <Icon name={t} />
        </span>
        {t}
      </li>
    ))}
  </ul>
)

/* ---------- index dashboard ---------- */

/** Testimonials as a grid: one column on small screens, two side by side once there is room. */
export const Quotes = ({ children }: Kids) => (
  <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 plain:grid-cols-1 [&>blockquote]:mt-0">
    {children}
  </div>
)

export interface Service {
  name: string
  text: string
  work: Array<{ label: string; href: string }>
}

/** "What I do": one tile per service, with links to the work that shows it. */
export const WhatIDo = ({ items }: { items: Array<Service> }) => (
  <ul className="grid gap-2 md:grid-cols-2 plain:grid-cols-1">
    {items.map((x, i) => (
      <li
        key={x.name}
        className="grid content-start gap-1 rounded-[3px] border border-line-subtle bg-surface px-4 py-3"
      >
        <b className={clsx('font-px text-lg font-normal', cycle(i))}>
          {x.name}
        </b>
        <span className="text-sm/[1.4] text-muted">{x.text}</span>
        <span className="mt-1 text-sm">
          <span aria-hidden="true" className="text-subtle">
            →{' '}
          </span>
          {x.work.map((w, k) => (
            <Fragment key={w.label}>
              {k > 0 && <span className="text-subtle"> · </span>}
              <a href={w.href}>{w.label}</a>
            </Fragment>
          ))}
        </span>
      </li>
    ))}
  </ul>
)

/** Dashboard panels in reading order; each title takes the next colour. */
const PANELS = ['who', 'num', 'work', 'kind', 'con']

export const Dash = ({ children }: Kids) => (
  <div
    className={clsx(
      'grid flex-1 gap-x-3 gap-y-5.5 short:gap-y-3.5',
      // from lg the grid fills the pane: the top row (hero + what I do) takes the spare height,
      // so work and testimonials keep their natural height instead of showing empty space
      'lg:grid-rows-[1fr_auto_auto]',
      // one column below lg; from lg a 12-column grid:
      // who (7) | what I do (5) · selected work (6) | testimonials (6) · connect across
      "grid-cols-1 [grid-template-areas:'who'_'work'_'num'_'kind'_'con']",
      "lg:grid-cols-12 lg:[grid-template-areas:'who_who_who_who_who_who_who_num_num_num_num_num'_'work_work_work_work_work_work_kind_kind_kind_kind_kind_kind'_'con_con_con_con_con_con_con_con_con_con_con_con']",
      "plain:grid-cols-1 plain:[grid-template-areas:'who'_'work'_'num'_'kind'_'con']",
    )}
  >
    {children}
  </div>
)

export function Panel({
  title,
  area,
  children,
  center,
}: Kids & { title: string; area: string; center?: boolean }) {
  return (
    <section
      style={{ gridArea: area }}
      className={clsx(
        'flex min-w-0 flex-col plain:border-b plain:border-dashed plain:border-line plain:py-5 tui:relative tui:rounded-[3px] tui:border tui:border-line tui:px-4.5 tui:pt-4.5 tui:pb-4 tui:short:pt-3.5 tui:short:pb-3 tui:hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))]',
        center && 'justify-center',
      )}
    >
      <h3
        className={clsx(
          'plain:mb-2 tui:absolute tui:-top-[11px] tui:left-2.5 tui:bg-bg tui:px-1.5 tui:font-medium',
          cycle(PANELS.indexOf(area)),
        )}
      >
        {title}
      </h3>
      {children}
    </section>
  )
}

export interface WorkRow {
  slug: string
  name: string
  years: string
  what: string
  result: string
  /** defaults to the item's page in the projects tab */
  href?: string
}

export const WorkList = ({ rows }: { rows: Array<WorkRow> }) => (
  <ul>
    {rows.map((r) => (
      <li key={r.slug}>
        <a
          href={r.href ?? `#/work/${r.slug}`}
          className="-mx-2 grid grid-cols-[14ch_8ch_minmax(0,1fr)_minmax(0,auto)] items-baseline gap-3 rounded-[2px] px-2 py-1 text-muted no-underline hover:bg-overlay hover:text-fg max-xl:grid-cols-[minmax(0,1fr)_auto] max-xl:gap-x-3 max-xl:gap-y-0 max-xl:py-1.5"
        >
          <b className="font-medium text-fg">{r.name}</b>
          <i className="text-sm text-hue-3 not-italic">{r.years}</i>
          <span className="truncate max-xl:col-span-full">{r.what}</span>
          <em className="truncate text-success not-italic max-xl:col-span-full max-xl:whitespace-normal">
            {r.result}
          </em>
        </a>
      </li>
    ))}
  </ul>
)

/* ---------- about ---------- */

/** Principles, one tile each in a single column: number, title, what it means, and the work that shows it. */
export const Principles = ({
  items,
}: {
  items: Array<[string, string, string]>
}) => (
  <ol className="mt-4.5 grid max-w-[72ch] gap-2.5">
    {items.map(([t, d, proof], i) => (
      <li
        key={t}
        className="grid content-start gap-1.5 rounded-[3px] border border-line-subtle bg-surface px-4 py-3.5 plain:bg-transparent"
      >
        <span className="flex items-baseline gap-2.5">
          <span
            aria-hidden="true"
            className={clsx('font-px text-num', cycle(i))}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <b className={clsx('font-px text-lg font-normal', cycle(i))}>{t}</b>
        </span>
        <p className="text-pretty text-fg">{d}</p>
        <p className="text-sm text-pretty text-muted">
          <span className="text-subtle">in practice: </span>
          {proof}
        </p>
      </li>
    ))}
  </ol>
)

/* ---------- expertise: level = glyph + colour, never colour alone ---------- */

export type Level = 's' | 'w' | 'e'
const LV: Record<Level, [string, string]> = {
  s: ['●', 'text-accent'],
  w: ['◐', 'text-info'],
  e: ['○', 'text-muted'],
}
const Glyph = ({ lv, className }: { lv: Level; className?: string }) => (
  <span aria-hidden="true" className={clsx(LV[lv][1], className)}>
    {LV[lv][0]}
  </span>
)

export const Lv = ({ lv, children }: Kids & { lv: Level }) => (
  <span className="whitespace-nowrap text-fg">
    <Glyph lv={lv} className="mr-1" />
    {children}
  </span>
)

export const Skills = ({
  groups,
}: {
  groups: Array<[string, Array<[Level, string]>]>
}) => (
  <div className="grid max-w-[96ch] grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] gap-x-7 gap-y-1 max-md:grid-cols-1">
    {groups.map(([title, skills], i) => (
      <section key={title}>
        <Sec hue={cycle(i)}>{title}</Sec>
        <ul>
          {skills.map(([lv, s]) => (
            <li
              key={s}
              className={clsx(
                'mt-1.5 pl-[2.5ch] -indent-[2.5ch]',
                lv === 'e' ? 'text-muted' : 'text-fg',
              )}
            >
              <Glyph lv={lv} className="inline-block w-[2.5ch] indent-0" />
              <Techs list={s} />
              <span className="sr-only">
                {' '}
                ({lv === 's' ? 'strong' : lv === 'w' ? 'working' : 'exploring'})
              </span>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
)
