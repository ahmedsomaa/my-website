import { describe, expect, it } from 'vitest'
import { pageSearchSchema, paginate } from './pagination'

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1)

  it('slices the requested page', () => {
    const r = paginate(items, 2, 10)
    expect(r.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    expect(r).toMatchObject({ page: 2, totalPages: 3, offset: 10 })
  })

  it('clamps out-of-range pages', () => {
    expect(paginate(items, 99, 10).page).toBe(3)
    expect(paginate(items, 0, 10).page).toBe(1)
  })

  it('handles an empty list', () => {
    expect(paginate([], 1, 10)).toMatchObject({ items: [], totalPages: 1 })
  })
})

describe('pageSearchSchema', () => {
  it('accepts a missing page without redirecting', () => {
    expect(pageSearchSchema.parse({}).page).toBeUndefined()
  })

  it('falls back to 1 for junk input', () => {
    expect(pageSearchSchema.parse({ page: 'abc' }).page).toBe(1)
    expect(pageSearchSchema.parse({ page: -4 }).page).toBe(1)
  })
})
