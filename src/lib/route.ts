export interface RouteTab {
  id: string
  single: boolean
  items: Array<{ slug: string }>
}

export interface Route {
  tab: number
  idx: number
  /** the hash named an item (not just a tab) */
  item: boolean
  /** section inside a single-pane page, e.g. #/about/education */
  anchor?: string
}

/**
 * Parse `#/tab/item`.
 * Returns null for an empty hash and false for one that names nothing.
 */
export function parseHash(
  hash: string,
  tabs: Array<RouteTab>,
): Route | null | false {
  if (!hash || hash === '#' || hash === '#/') return null
  const m = hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?\/?$/)
  if (!m) return false
  const [, tabId, part] = m
  const old = tabId === 'philosophy' // old links
  const tab = tabs.findIndex((t) => t.id === (old ? 'about' : tabId))
  if (tab < 0) return false
  if (!part)
    return { tab, idx: 0, item: false, anchor: old ? 'principles' : '' }
  const idx = tabs[tab].items.findIndex((x) => x.slug === part)
  if (idx >= 0) return { tab, idx, item: true }
  // single-pane tabs: the second part is an anchor inside the page
  return tabs[tab].single ? { tab, idx: 0, item: false, anchor: part } : false
}
