/* Everything the site says. The plain page and the workspace both render from this. */
import type { ReactNode } from 'react'
import {
  A,
  Branches,
  Cta,
  Dash,
  H,
  Hello,
  Hero,
  Kv,
  Lead,
  LinkBtn,
  P,
  Panel,
  Principles,
  Quote,
  Quotes,
  Sec,
  Shots,
  Small,
  Stack,
  Techs,
  Ul,
  WhatIDo,
  WorkList,
} from '#/components/content'
import type { Service, Shot, WorkRow } from '#/components/content'
import { CV, EMAIL } from '#/lib/view'
import { Icon } from '#/icons'
import data from '../../data/ahmed.json'
import { Changelog } from './changelog'

export type Layout = 'dash' | 'table' | 'graph' | 'single'

export interface Item {
  /** list label and reading-pane title */
  key: string
  slug: string
  meta?: string
  /** work table columns */
  group?: string
  role?: string
  result?: string
  /** experience graph: the current job */
  now?: boolean
  /** experience graph: the company's brand colour, as a theme text class */
  color?: string
  /** what `c` copies */
  copy?: string
  body: ReactNode
}

export interface Tab {
  id: string
  layout: Layout
  items: Array<Item>
}

export const isSingle = (t: Tab) => t.layout === 'single' || t.layout === 'dash'

const MAIL = `mailto:${EMAIL}`

/* ---------- from data/ahmed.json ---------- */

/** A testimonial as [verbatim excerpt, "Name · Title @ Company"]. */
function testimonial(id: string): [ReactNode, string] {
  const t = data.testimonials.find((x) => x.id === id)
  if (!t) throw new Error(`no testimonial "${id}" in data/ahmed.json`)
  return [`“${t.excerpt}”`, `${t.name} · ${t.title} @ ${t.company}`]
}
const JOSH = testimonial('josh-zack')
const BROCK = testimonial('brock-rumer')

/** Goodbye messages from Nodogoro colleagues, shown without names (data.kindWords). */
const KIND: Array<[string, string]> = data.home.kindWords.map((id) => {
  const x = data.kindWords.items.find((k) => k.id === id)
  if (!x?.excerpt) throw new Error(`no kind word "${id}" with an excerpt`)
  return [`“${x.excerpt}”`, `${data.kindWords.by} · when I left`]
})

const PROFESSIONAL = data.projects.professional as unknown as Array<Project>
const SIDE = data.projects.side as unknown as Array<Project>
const ALL_PROJECTS = [...PROFESSIONAL, ...SIDE]

/** Where a work id lives on the site. Every id here has a work page. */
const PAGE: Record<string, [string, string]> = {
  cypienta: ['Cypienta', '#/work/cypienta'],
  reconciled: ['Reconciled', '#/work/reconciled'],
  hivo: ['Hivo', '#/work/hivo'],
  stayro: ['Stayro', '#/work/stayro'],
  'outlined-ai': ['Outlined AI', '#/work/outlined-ai'],
  'editor-setup': ['Editor Setup', '#/work/editor-setup'],
  'sharp-studio': ['Sharp Studio', '#/work/sharp-studio'],
  ecard: ['ECARD', '#/work/ecard'],
  'covid-mobility': ['COVID-19 platform', '#/work/covid-mobility'],
}
const proof = (id: string) => {
  const p = PAGE[id] as [string, string] | undefined
  if (!p) throw new Error(`no page for "${id}"`)
  return { label: p[0], href: p[1] }
}

const SELECTED: Array<WorkRow> = data.home.selectedWork.map((id) => {
  const x = ALL_PROJECTS.find((p) => p.id === id)
  if (!x) throw new Error(`no project "${id}" in data/ahmed.json`)
  return {
    slug: x.id,
    name: x.name,
    years: x.year,
    what: x.tagline ?? x.about,
    result: x.quickFact,
    href: proof(x.id).href,
  }
})

const SERVICES: Array<Service> = data.services.map((x) => ({
  name: x.name,
  text: x.text,
  work: x.work.map(proof),
}))

/** Whole years of experience, from data.home.experienceFrom (YYYY-MM) to today. */
function yearsSince(from: string) {
  const [y, m] = from.split('-').map(Number)
  const now = new Date()
  return Math.floor(
    (now.getFullYear() * 12 + now.getMonth() - (y * 12 + m - 1)) / 12,
  )
}
const YEARS = yearsSince(data.home.experienceFrom)

const { profile } = data

const index: Tab = {
  id: 'index',
  layout: 'dash',
  items: [
    {
      key: 'index',
      slug: 'readme',
      copy: EMAIL,
      body: (
        <Dash>
          <Panel title="whoami" area="who" center>
            <Hello>Hello, I'm</Hello>
            <Hero>{profile.name}</Hero>
            <Lead>{profile.headline}</Lead>
            <P>{profile.intro.chosen.replace('{years}', String(YEARS))}</P>
            <Kv
              rows={[
                [
                  'currently',
                  <>
                    {profile.currentRole.title} @{' '}
                    <a href="#/experience/cypienta">
                      {profile.currentRole.company}
                    </a>
                  </>,
                ],
                ['experience', `${YEARS}+ years`],
                ['works with', <Stack list={data.home.stack.join(' · ')} />],
                [
                  'based in',
                  `${profile.location.city}, ${profile.location.country} · ${profile.location.workMode}`,
                ],
              ]}
            />
            <Cta>
              <LinkBtn href="#/work">view work</LinkBtn>
              <LinkBtn alt href={CV}>
                cv ↗
              </LinkBtn>
            </Cta>
          </Panel>

          <Panel title="what I do" area="num" center>
            <WhatIDo items={SERVICES} />
          </Panel>

          <Panel title="selected work" area="work">
            <WorkList rows={SELECTED} />
            <Small>
              <a href="#/work">→ all work</a>
            </Small>
          </Panel>

          <Panel title="testimonials" area="kind">
            <Quotes>
              <Quote small by={JOSH[1]}>
                {JOSH[0]}
              </Quote>
              <Quote small by={BROCK[1]}>
                {BROCK[0]}
              </Quote>
              {KIND.map(([text, by]) => (
                <Quote small key={text} by={by}>
                  {text}
                </Quote>
              ))}
            </Quotes>
          </Panel>

          <Panel title="connect" area="con">
            <p className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <span className="text-lg text-fg">
                Let's build something thoughtful.
              </span>
              <span>
                <span className="text-muted">email </span>
                <a href={MAIL}>
                  <Icon name="email" />
                  {EMAIL}
                </a>{' '}
                <kbd>c</kbd>
              </span>
              <span>
                <span className="text-muted">cv </span>
                <A href={CV}>download ↗</A>
              </span>
              <a href="#/contact" className="text-sm">
                → all contact
              </a>
            </p>
          </Panel>
        </Dash>
      ),
    },
  ],
}

/** A project in data/ahmed.json (professional or side). */
interface Project {
  id: string
  name: string
  experience?: string
  year: string
  start: string
  role: string
  quickFact: string
  about: string
  tagline?: string
  problem: string
  contributions: Array<string>
  stack: Array<string>
  links: Array<{ label: string; url: string | null }>
  noLink?: string
  images: Array<Shot>
}

/** Short company name and its experience link, e.g. VOIS (not the long form). */
function company(id?: string) {
  const c = data.experience.find((x) => x.id === id)
  if (!c) return null
  return <a href={`#/experience/${c.id}`}>{c.name.replace(/ \(.*\)$/, '')}</a>
}

/**
 * One layout for every project page, always the same sections in the same order:
 * name and summary, role/where/stack/highlight, screenshots (when there are any), about, what I did, links.
 */
function ProjectPage({ x }: { x: Project }) {
  const links = x.links.filter((l): l is { label: string; url: string } =>
    Boolean(l.url),
  )
  const where = company(x.experience)
  return (
    <>
      <H>{x.name}</H>
      <Lead>{x.about}</Lead>
      <Kv
        rows={[
          ['role', x.role],
          [
            'where',
            where ? (
              <>
                {where} · {x.year}
              </>
            ) : (
              `side project · ${x.year}`
            ),
          ],
          ['stack', x.stack.join(' · ')],
          ['highlight', x.quickFact],
        ]}
      />
      {x.images.length > 0 && (
        <Shots
          kind={x.images[0].height > x.images[0].width ? 'phone' : 'wide'}
          shots={x.images}
        />
      )}
      <Sec>about</Sec>
      <P>{x.problem}</P>
      <Sec>what I did</Sec>
      <Ul items={x.contributions} />
      <Sec>links</Sec>
      {links.length > 0 ? (
        <Cta>
          {links.map((l, i) => (
            <LinkBtn key={l.url} alt={i > 0} href={l.url}>
              {l.label} ↗
            </LinkBtn>
          ))}
        </Cta>
      ) : (
        <P>{x.noLink}</P>
      )}
    </>
  )
}

const workItem = (x: Project, group: string): Item => ({
  key: x.name,
  slug: x.id,
  meta: x.year,
  group,
  role: x.role,
  result: x.quickFact,
  copy: x.links.find((l) => l.url)?.url ?? undefined,
  body: <ProjectPage x={x} />,
})

const work: Tab = {
  id: 'work',
  layout: 'table',
  items: [
    ...PROFESSIONAL.map((x) => workItem(x, 'professional')),
    ...SIDE.map((x) => workItem(x, 'side projects')),
  ],
}

/* ---------- experience, from data/ahmed.json ---------- */

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')

/** "2020-07" → "Jul 2020", "2026" → "2026", null → "present". */
const when = (d: string | null) => {
  if (d === null) return 'present'
  const [y, m] = d.split('-')
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y
}

interface Role {
  title: string
  type: string | null
  start: string
  end: string | null
  mode?: string
}
interface Company {
  id: string
  name: string
  location: string
  roles: Array<Role>
  products: Array<{
    id: string
    name: string
    short: string
    stack: Array<string>
  }>
  did: Array<string>
  learned: Array<string> | null
  showOnSite?: boolean
  /** brand colour, hex without '#' */
  color: string
  /** Tailwind colour for the graph dot */
  tailwind: string
}

/** Graph dot colour per Tailwind name, written out in full so Tailwind generates them. */
const DOT: Record<string, string> = {
  'indigo-500': 'text-indigo-500',
  'orange-600': 'text-orange-600',
  'blue-500': 'text-blue-500',
  'red-600': 'text-red-600',
  fg: 'text-fg',
}

/** Work page names by id, so a product reads the same here as on its work page. */
const WORK_NAMES = new Map(ALL_PROJECTS.map((x) => [x.id, x.name]))

/** One layout for every company: role, where and stack up top, then products, what I did, what I learned. */
function CompanyPage({ c }: { c: Company }) {
  const tech = [...new Set(c.products.flatMap((x) => x.stack))].slice(0, 12)
  return (
    <>
      <H>{c.name}</H>
      <Kv
        rows={[
          [
            c.roles.length > 1 ? 'roles' : 'role',
            <>
              {c.roles.map((r, i) => (
                <span key={r.start} className="block">
                  {i > 0 && <span className="sr-only">; </span>}
                  {r.title}
                  <span className="text-muted">
                    {' '}
                    · {when(r.start)}
                    {r.end !== r.start && ` – ${when(r.end)}`}
                    {r.mode && ` · ${r.mode}`}
                  </span>
                </span>
              ))}
            </>,
          ],
          ['where', c.location],
          ['stack', tech.join(' · ')],
        ]}
      />
      <Sec>products</Sec>
      <Branches
        items={c.products.map((x) => (
          <>
            {WORK_NAMES.has(x.id) ? (
              <a href={`#/work/${x.id}`}>{WORK_NAMES.get(x.id)}</a>
            ) : (
              <b className="font-medium text-fg">{x.name}</b>
            )}
            : {x.short}
          </>
        ))}
      />
      <Sec>what I did</Sec>
      <Ul items={c.did} />
      <Sec>what I learned</Sec>
      <Ul items={c.learned ?? []} />
    </>
  )
}

const COMPANIES = (data.experience as unknown as Array<Company>).filter(
  (c) => c.showOnSite !== false,
)

const experience: Tab = {
  id: 'experience',
  layout: 'graph',
  items: COMPANIES.map((c, i) => {
    const first = c.roles.reduce(
      (a, r) => (r.start < a ? r.start : a),
      c.roles[0].start,
    )
    const last = c.roles.some((r) => r.end === null)
      ? null
      : c.roles.reduce((a, r) => ((r.end ?? '') > a ? (r.end ?? '') : a), '')
    const y = (d: string) => d.slice(0, 4)
    const meta =
      last === null
        ? `${y(first)}–`
        : y(first) === y(last)
          ? y(first)
          : `${y(first)}–${y(last).slice(2)}`
    return {
      key: c.name.replace(/ \(.*\)$/, '').replace(/ Integrated Solutions$/, ''),
      slug: c.id,
      meta,
      now: i === 0 && last === null,
      color: DOT[c.tailwind],
      copy: c.id === 'cypienta' ? 'https://cypienta.com' : undefined,
      body: <CompanyPage c={c} />,
    }
  }),
}

/* ---------- toolbox, from data/ahmed.json ---------- */

/** Label → items, one row each; tech names get their brand icon. */
const ToolRows = ({
  groups,
}: {
  groups: Array<{ label: string; items: Array<string> }>
}) => (
  <Kv
    wide
    rows={groups.map((g) => [g.label, <Techs list={g.items.join(' · ')} />])}
  />
)

const toolbox: Tab = {
  id: 'toolbox',
  layout: 'single',
  items: [
    {
      key: 'toolbox',
      slug: 'skills',
      body: (
        <>
          <H>Toolbox</H>
          <Lead>
            What I build with, and the tools I use every day. The main stack is
            what I reach for first; also used means real projects, more than
            once.
          </Lead>
          <Sec id="/toolbox/main">{data.skills.main.label}</Sec>
          <ToolRows groups={data.skills.main.groups} />
          <Sec id="/toolbox/also">{data.skills.used.label}</Sec>
          <ToolRows groups={data.skills.used.groups} />
          <Sec id="/toolbox/daily">daily tools</Sec>
          <ToolRows groups={data.tools} />
        </>
      ),
    },
  ],
}

/* ---------- about and philosophy, from data/ahmed.json ---------- */

const year = (d: string) => d.slice(0, 4)

const about: Tab = {
  id: 'about',
  layout: 'single',
  items: [
    {
      key: 'about',
      slug: 'me',
      body: (
        <>
          <H>About</H>
          <Lead>{data.about.opener}</Lead>
          <P>{data.about.who}</P>

          <Sec id="/about/journey">journey</Sec>
          <Kv wide rows={data.about.journey.map((j) => [j.when, j.text])} />

          <Sec id="/about/education">education</Sec>
          <Kv
            wide
            rows={[
              ...data.education.degrees.map((g): [string, ReactNode] => [
                `${year(g.start)}–${year(g.end).slice(2)}`,
                <>
                  <b>{g.degree}</b> · {g.school}
                  {'showGpa' in g && g.showGpa === false
                    ? ''
                    : ` · ${g.gpa} GPA`}{' '}
                  · {g.honors.join(', ')}
                </>,
              ]),
              [
                'awards',
                data.education.awards
                  .map((x) => `${x.result}, ${x.name} (${year(x.date)})`)
                  .join(' · '),
              ],
              [
                'courses',
                data.education.courses
                  .map((x) => `${x.name}, ${x.by} (${year(x.end)})`)
                  .join(' · '),
              ],
              [
                'hackathons',
                data.education.hackathons
                  .map((x) => `${x.name}, ${x.where} (${year(x.date)})`)
                  .join(' · '),
              ],
            ]}
          />

          <Sec id="/about/life">outside work</Sec>
          <Kv
            wide
            rows={data.about.outside.map((o) => [
              o.label,
              'url' in o && o.url ? (
                <>
                  {o.text}{' '}
                  <A href={o.url}>{o.url.replace(/^https:\/\//, '')} ↗</A>
                </>
              ) : (
                o.text
              ),
            ])}
          />
        </>
      ),
    },
  ],
}

const philosophy: Tab = {
  id: 'philosophy',
  layout: 'single',
  items: [
    {
      key: 'philosophy',
      slug: 'how-i-work',
      body: (
        <>
          <H>Philosophy</H>
          <Lead>{data.philosophyLead}</Lead>
          <Principles
            items={data.principles.map((x) => [x.title, x.text, x.proof])}
          />
        </>
      ),
    },
  ],
}

const contact: Tab = {
  id: 'contact',
  layout: 'single',
  items: [
    {
      key: 'contact',
      slug: 'me',
      copy: EMAIL,
      body: (
        <>
          <H>Contact</H>
          <Lead>Let's build something thoughtful.</Lead>
          <P>Email is the fastest way to reach me. I usually reply quickly.</P>
          <Cta>
            <LinkBtn href={MAIL}>{EMAIL} ↗</LinkBtn>
            <LinkBtn alt href={CV}>
              download cv ↗
            </LinkBtn>
          </Cta>
          <Sec>everywhere</Sec>
          <Kv
            wide
            rows={[
              [
                'email',
                <>
                  <a href={MAIL}>
                    <Icon name="email" />
                    {EMAIL}
                  </a>{' '}
                  <kbd>c</kbd> copies it
                </>,
              ],
              [
                'linkedin',
                <A href="https://linkedin.com/in/som3aware">
                  <Icon name="linkedin" />
                  linkedin.com/in/som3aware
                </A>,
              ],
              [
                'github',
                <A href="https://github.com/ahmedsomaa">
                  <Icon name="github" />
                  github.com/ahmedsomaa
                </A>,
              ],
              [
                'x',
                <A href="https://x.com/som3aware">
                  <Icon name="x" />
                  x.com/som3aware
                </A>,
              ],
              [
                'hashnode',
                <A href="https://som3aware.hashnode.dev">
                  <Icon name="hashnode" />
                  som3aware.hashnode.dev
                </A>,
              ],
              [
                'mentor',
                <A href="https://www.frontendmentor.io/profile/ahmedsomaa">
                  <Icon name="frontend mentor" />
                  frontendmentor.io/profile/ahmedsomaa
                </A>,
              ],
              ['cv', <A href={CV}>Ahmed_Abu_Qahf_cv.pdf ↗</A>],
            ]}
          />
        </>
      ),
    },
  ],
}

const changelog: Tab = {
  id: 'changelog',
  layout: 'single',
  items: [{ key: 'changelog', slug: 'log', body: <Changelog /> }],
}

export const TABS: Array<Tab> = [
  index,
  work,
  experience,
  toolbox,
  about,
  philosophy,
  contact,
  changelog,
]
