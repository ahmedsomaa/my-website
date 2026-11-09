import { describe, expect, it } from 'vitest'
import { parseHash } from './route'

const tabs = [
  { id: 'index', single: true, items: [{ slug: 'readme' }] },
  {
    id: 'projects',
    single: false,
    items: [{ slug: 'stayro' }, { slug: 'hivo' }],
  },
  { id: 'about', single: true, items: [{ slug: 'me' }] },
  { id: 'principles', single: true, items: [{ slug: 'how-i-work' }] },
  { id: 'toolbox', single: true, items: [{ slug: 'skills' }] },
]

describe('parseHash', () => {
  it('returns null for an empty hash', () => {
    expect(parseHash('', tabs)).toBeNull()
    expect(parseHash('#/', tabs)).toBeNull()
  })
  it('finds a tab', () => {
    expect(parseHash('#/projects', tabs)).toEqual({
      tab: 1,
      idx: 0,
      item: false,
      anchor: '',
    })
  })
  it('finds an item', () => {
    expect(parseHash('#/projects/hivo', tabs)).toEqual({
      tab: 1,
      idx: 1,
      item: true,
    })
    expect(parseHash('#/projects/hivo/', tabs)).toEqual({
      tab: 1,
      idx: 1,
      item: true,
    })
  })
  it('treats the second part of a single-pane tab as an anchor', () => {
    expect(parseHash('#/about/education', tabs)).toEqual({
      tab: 2,
      idx: 0,
      item: false,
      anchor: 'education',
    })
  })
  it('sends old philosophy and about/principles links to principles', () => {
    const to = { tab: 3, idx: 0, item: false, anchor: '', moved: true }
    expect(parseHash('#/philosophy', tabs)).toEqual(to)
    expect(parseHash('#/about/principles', tabs)).toEqual(to)
  })
  it('sends old expertise links to toolbox', () => {
    expect(parseHash('#/expertise', tabs)).toEqual({
      tab: 4,
      idx: 0,
      item: false,
      anchor: '',
      moved: true,
    })
  })
  it('maps old work links to projects', () => {
    expect(parseHash('#/work/hivo', tabs)).toEqual({
      tab: 1,
      idx: 1,
      item: true,
      moved: true,
    })
    expect(parseHash('#/work', tabs)).toEqual({
      tab: 1,
      idx: 0,
      item: false,
      anchor: '',
      moved: true,
    })
  })
  it('returns false for unknown pages', () => {
    expect(parseHash('#/nope', tabs)).toBe(false)
    expect(parseHash('#/projects/nope', tabs)).toBe(false)
    expect(parseHash('#junk', tabs)).toBe(false)
  })
})
