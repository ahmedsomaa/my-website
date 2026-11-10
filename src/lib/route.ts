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
  /** the hash used an old tab name; the url should be rewritten */
  moved?: boolean
}

/** Old tab names that still resolve: old id -> [new id, anchor to open]. */
const MOVED: Record<string, [string, string]> = {
  principles: ['philosophy', ''],
  projects: ['work', ''],
  expertise: ['toolbox', ''],
}

/** Old in-page sections that became their own tab: "tab/anchor" -> new tab id. */
const MOVED_SECTIONS: Record<string, string> = {
  'about/principles': 'philosophy',
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
  const section = MOVED_SECTIONS[`${tabId}/${part}`]
  if (section) {
    const t = tabs.findIndex((x) => x.id === section)
    if (t >= 0) return { tab: t, idx: 0, item: false, anchor: '', moved: true }
  }
  const moved = tabId in MOVED ? MOVED[tabId] : null
  const tab = tabs.findIndex((t) => t.id === (moved ? moved[0] : tabId))
  if (tab < 0) return false
  const flag = moved ? { moved: true } : {}
  if (!part)
    return { tab, idx: 0, item: false, anchor: moved?.[1] ?? '', ...flag }
  const idx = tabs[tab].items.findIndex((x) => x.slug === part)
  if (idx >= 0) return { tab, idx, item: true, ...flag }
  // single-pane tabs: the second part is an anchor inside the page
  return tabs[tab].single ? { tab, idx: 0, item: false, anchor: part } : false
}
