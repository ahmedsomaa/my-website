import { describe, expect, it } from 'vitest'
import { seo } from './site'

describe('seo', () => {
  it('keeps canonical, og:url and title in agreement per path', () => {
    const h = seo({ title: 'Hivo', description: 'd', path: '/work/hivo' })
    const url = h.links[0].href
    expect(url.endsWith('/work/hivo')).toBe(true)
    expect(h.meta.find((m) => m.property === 'og:url')?.content).toBe(url)
    expect(h.meta.find((m) => m.property === 'og:title')?.content).toBe('Hivo')
  })

  it('makes the image absolute', () => {
    const h = seo({ title: 't', description: 'd', path: '/', image: '/x.png' })
    expect(h.meta.find((m) => m.property === 'og:image')?.content).toMatch(
      /^https?:\/\/.+\/x\.png$/,
    )
  })
})
