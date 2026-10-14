import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getAllCaseStudiesSorted, getNextCaseStudySlug } from './case-studies'
import { buildWorkRows } from './work-rows'

const publicFile = (p: string) => existsSync(join(process.cwd(), 'public', p))

describe('case studies', () => {
  const studies = getAllCaseStudiesSorted()

  it('have unique slugs', () => {
    expect(new Set(studies.map((s) => s.slug)).size).toBe(studies.length)
  })

  it('point at images that exist in public/', () => {
    for (const s of studies) {
      if (s.cover?.src) expect(publicFile(s.cover.src), s.slug).toBe(true)
      if (s.cover?.card) expect(publicFile(s.cover.card.src), s.slug).toBe(true)
    }
  })

  it('chain with next links that end', () => {
    const last = studies.at(-1)
    expect(last && getNextCaseStudySlug(last.slug)).toBeNull()
    expect(getNextCaseStudySlug('does-not-exist')).toBeNull()
  })
})

describe('work rows', () => {
  it('have unique keys and a link for each row', () => {
    const rows = buildWorkRows()
    expect(new Set(rows.map((r) => r.key)).size).toBe(rows.length)
    expect(rows.every((r) => r.href.length > 0)).toBe(true)
  })
})
