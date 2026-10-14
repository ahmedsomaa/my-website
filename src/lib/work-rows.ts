import type { CaseStudy } from '@/types/case-study'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { getAllShowcaseProjects } from '@/data/showcase-projects'
import { getAllCaseStudiesSorted } from '@/lib/case-studies'

export const WORK_PAGE_SIZE = 10

function hostWithoutWww(host: string): string {
  const h = host.toLowerCase()
  return h.startsWith('www.') ? h.slice(4) : h
}

function normalizeComparableUrl(url: string): string {
  try {
    const u = new URL(url.trim())
    u.hash = ''
    const path = u.pathname.replace(/\/+$/, '') || ''
    const host = hostWithoutWww(u.hostname)
    return `${u.protocol}//${host}${path}${u.search}`.toLowerCase()
  } catch {
    return url.trim().toLowerCase().replace(/\/+$/, '')
  }
}

function portfolioDescriptionForCaseStudy(study: CaseStudy): string {
  for (const p of PORTFOLIO_PROJECTS) {
    const projectUrl = normalizeComparableUrl(p.url)
    if (study.liveUrl && normalizeComparableUrl(study.liveUrl) === projectUrl) {
      return p.description
    }
    if (study.repoUrl && normalizeComparableUrl(study.repoUrl) === projectUrl) {
      return p.description
    }
  }
  return study.oneLiner
}

function showcaseUrlsCoveredByCaseStudies(
  studies: ReturnType<typeof getAllCaseStudiesSorted>,
): Set<string> {
  const urls = new Set<string>()
  for (const s of studies) {
    if (s.liveUrl) urls.add(normalizeComparableUrl(s.liveUrl))
    if (s.repoUrl) urls.add(normalizeComparableUrl(s.repoUrl))
  }
  return urls
}

export type WorkRow =
  | {
      kind: 'case-study'
      key: string
      title: string
      description: string
      date: string
      stack: string[]
      href: string
      external: false
    }
  | {
      kind: 'showcase'
      key: string
      title: string
      description: string
      date: string
      stack: string[]
      href: string
      external: true
    }

export function buildWorkRows(): WorkRow[] {
  const studies = getAllCaseStudiesSorted()
  const coveredShowcaseUrls = showcaseUrlsCoveredByCaseStudies(studies)
  const showcase = getAllShowcaseProjects().filter(
    (p) => !coveredShowcaseUrls.has(normalizeComparableUrl(p.url)),
  )

  const studyRows: WorkRow[] = studies.map((s) => ({
    kind: 'case-study',
    key: `cs-${s.slug}`,
    title: s.title,
    description: portfolioDescriptionForCaseStudy(s),
    date: s.date,
    stack: s.techTags,
    href: `/work/${s.slug}`,
    external: false,
  }))

  const showcaseRows: WorkRow[] = showcase.map((p) => ({
    kind: 'showcase',
    key: `p-${p.id}`,
    title: p.title,
    description: p.description,
    date: p.date,
    stack: p.stack,
    href: p.url,
    external: true,
  }))

  return [...studyRows, ...showcaseRows]
}

export function directoryPathParts(row: WorkRow): {
  prefix: string
  emphasis: string
} {
  if (!row.external) {
    const slug = row.href.replace(/^\/work\//, '')
    return { prefix: '~/work/', emphasis: `${slug}/` }
  }
  try {
    const u = new URL(row.href)
    const host = hostWithoutWww(u.hostname)
    const parts = u.pathname.replace(/\/+$/, '').split('/').filter(Boolean)
    const leaf = parts.length ? `${parts.join('/')}/` : ''
    return {
      prefix: '~/links/',
      emphasis: leaf ? `${host}/${leaf}` : `${host}/`,
    }
  } catch {
    return {
      prefix: '~/links/',
      emphasis: `${row.title.toLowerCase().replace(/\s+/g, '-')}/`,
    }
  }
}
