/* The two-pane workspace: tabs, list, reading pane, status bar and modals, all keyboard driven. */
import { Fragment, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import clsx from 'clsx'
import type { MouseEvent, ReactNode } from 'react'
import { TABS, isSingle } from '#/content'
import type { Item } from '#/content'
import { parseHash } from '#/lib/route'
import { store } from '#/lib/store'
import { DEFAULT_THEME, THEMES } from '#/lib/themes'
import type { Theme } from '#/lib/theme-types'
import { CV, EMAIL, ThemeContext } from '#/lib/view'
import { cycle } from '#/lib/hues'

type Pane = 'list' | 'det'
type ModalKind = 'theme' | 'font' | 'palette' | 'help'

interface State {
  tab: number
  /** selected item per tab */
  idx: Array<number>
  pane: Pane
  zoom: boolean
  /** mobile: reading pane shown instead of the list */
  mdet: boolean
  modal: ModalKind | null
  q: string
  mIdx: number
  theme: string
  font: string
  /** pixel font for headings */
  pixel: string
  msg: string
}

interface Row {
  group?: string
  label: string
  meta?: string
  id?: string
  theme?: Theme
  font?: TuiFont
  pixel?: TuiPixel
  run?: () => void
}

const ROUTES = TABS.map((t) => ({
  id: t.id,
  single: isSingle(t),
  items: t.items,
}))
const MOD =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
    ? '⌘'
    : 'Ctrl+'
const smallMq = matchMedia('(max-width: 760px)')
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const root = document.documentElement
const themeById = (id?: string | null) => THEMES.find((t) => t.id === id)
/** Vitesse Light on light systems, Vitesse Black otherwise (same rule as the boot script). */
const systemTheme = () =>
  matchMedia('(prefers-color-scheme: light)').matches
    ? 'vitesse-light'
    : DEFAULT_THEME
const fonts = () => window.TUI_FONTS
const fontById = (id: string) => fonts().find((f) => f.id === id) ?? fonts()[0]
const pixels = () => window.TUI_PIXELS
const behavior = (): ScrollBehavior => (reduce() ? 'auto' : 'smooth')

/**
 * State lives in a ref so a key press can run several steps in a row
 * (switch tab, then focus, then sync the url) against fresh values; each
 * change re-renders.
 */
function useStore(init: () => State) {
  const ref = useRef<State | null>(null)
  if (ref.current === null) ref.current = init()
  const [, bump] = useReducer((n: number) => n + 1, 0)
  const set = (p: Partial<State>) => {
    ref.current = { ...(ref.current as State), ...p }
    bump()
  }
  return [ref as { current: State }, set] as const
}

export function Tui() {
  const [S, set] = useStore(() => ({
    tab: 0,
    idx: TABS.map(() => 0),
    pane: 'list',
    zoom: false,
    mdet: false,
    modal: null,
    q: '',
    mIdx: 0,
    theme: themeById(root.dataset.theme)?.id ?? systemTheme(),
    font: root.dataset.font ?? fonts()[0].id,
    pixel: root.dataset.pixel ?? pixels()[0].id,
    msg: '',
  }))
  const s = S.current

  const listRef = useRef<HTMLDivElement>(null)
  const detRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLElement>(null)
  const qRef = useRef<HTMLInputElement>(null)
  const mBodyRef = useRef<HTMLDivElement>(null)
  /** element to focus after the next render (it may be hidden until then) */
  const focusNext = useRef<(() => HTMLElement | null) | null>(null)
  const anchorNext = useRef<string | null>(null)
  const before = useRef({ theme: s.theme, font: s.font, pixel: s.pixel })
  const msgT = useRef(0)
  const lastG = useRef(0)

  /* ---------- derived ---------- */
  const tabOf = (i = S.current.tab) => TABS[i]
  const single = (i = S.current.tab) => isSingle(TABS[i])
  const cur = (): Item => {
    const st = S.current
    return TABS[st.tab].items[st.idx[st.tab]]
  }
  const hashFor = () =>
    single() ? `#/${tabOf().id}` : `#/${tabOf().id}/${cur().slug}`

  /* ---------- panes ---------- */
  function setPane(p: Pane, moveFocus = true) {
    if (single()) p = 'det'
    set({ pane: p })
    if (moveFocus)
      focusNext.current = () =>
        p === 'list' ? listRef.current : detRef.current
  }
  function showDet(on: boolean) {
    const mdet = on && !single()
    set({ mdet })
    if (mdet) setPane('det')
    else if (!single()) setPane('list')
  }
  function setZoom(on: boolean) {
    if (on && single()) return
    set({ zoom: on })
    if (on) setPane('det')
  }
  function say(t: string) {
    set({ msg: t })
    clearTimeout(msgT.current)
    msgT.current = window.setTimeout(() => set({ msg: '' }), 3200)
  }

  /* ---------- navigation + url ---------- */
  function syncUrl(push: boolean) {
    const h = hashFor()
    if (location.hash === h) return
    const st = S.current
    if (!location.hash && st.tab === 0 && st.idx[0] === 0) return // keep the bare url on first screen
    history[push ? 'pushState' : 'replaceState'](null, '', h)
  }
  function goTab(i: number) {
    if (i < 0 || i >= TABS.length) return
    const changed = i !== S.current.tab
    set({ tab: i })
    if (S.current.zoom) setZoom(false)
    showDet(false)
    setPane('list')
    if (changed) syncUrl(true)
  }
  function select(k: number) {
    const idx = [...S.current.idx]
    idx[S.current.tab] = k
    set({ idx })
    syncUrl(false)
  }
  function move(d: number) {
    if (S.current.pane === 'det') {
      detRef.current?.scrollBy({ top: d * 64, behavior: behavior() })
      return
    }
    const n = tabOf().items.length
    select((S.current.idx[S.current.tab] + d + n) % n)
  }
  function jump(end: boolean) {
    const det = detRef.current
    if (S.current.pane === 'det') {
      det?.scrollTo({ top: end ? det.scrollHeight : 0, behavior: behavior() })
      return
    }
    select(end ? tabOf().items.length - 1 : 0)
  }
  function open() {
    if (smallMq.matches && !S.current.mdet) return showDet(true)
    if (S.current.pane === 'list') return setPane('det')
    const link = detRef.current?.querySelector<HTMLAnchorElement>('[data-link]')
    if (link && !link.getAttribute('href')?.startsWith('#')) {
      link.dataset.armed = ''
      setTimeout(() => delete link.dataset.armed, 300)
      link.click()
    }
  }
  async function copy() {
    const v = cur().copy
    if (!v) return say('nothing to copy here')
    try {
      await navigator.clipboard.writeText(v)
      say(`✓ copied ${v.replace(/^https?:\/\//, '')}`)
    } catch {
      const lead = detRef.current?.querySelector('[data-lead]')
      const sel = getSelection()
      if (lead && sel) {
        const r = document.createRange()
        r.selectNodeContents(lead)
        sel.removeAllRanges()
        sel.addRange(r)
      }
      say(`▲ copy blocked. press ${MOD}C`)
    }
  }

  /** Go to a route. read: open the item in the reading pane (zoomed for case studies). */
  function route(hash: string, { read = false, push = false } = {}) {
    if (hash === '#/cv') {
      window.open(CV, '_blank', 'noopener')
      return
    }
    const r = parseHash(hash, ROUTES)
    if (r === null) return
    if (r === false) return say(`✗ no such page: ${hash.slice(1)}`)
    const tabChanged = r.tab !== S.current.tab
    const idx = [...S.current.idx]
    idx[r.tab] = r.idx
    set({ tab: r.tab, idx })
    if (read && r.item && TABS[r.tab].id === 'projects' && !smallMq.matches)
      setZoom(true)
    else {
      if (S.current.zoom && tabChanged) setZoom(false)
      showDet(r.item && read)
      setPane(r.item && read ? 'det' : 'list')
    }
    if (r.anchor) anchorNext.current = r.anchor
    if (push) history.pushState(null, '', r.anchor ? hash : hashFor())
    else if (r.moved) history.replaceState(null, '', hashFor()) // old tab name in the url
  }
  function onHistory() {
    const r = parseHash(location.hash, ROUTES)
    const st = S.current
    if (r === null) {
      if (st.tab !== 0 || st.idx[0] !== 0) {
        const idx = [...st.idx]
        idx[0] = 0
        set({ tab: 0, idx })
        setZoom(false)
        showDet(false)
      }
      return
    }
    if (r === false) {
      say(`✗ no such page: ${location.hash.slice(1)}`)
      history.replaceState(null, '', hashFor())
      return
    }
    if (r.tab === st.tab && r.idx === st.idx[st.tab] && !r.anchor) {
      if (r.moved) history.replaceState(null, '', hashFor()) // old tab name in the url
      return
    }
    route(location.hash)
  }

  /* ---------- theme + font ---------- */
  function applyTheme(id: string, save: boolean) {
    const t = themeById(id) ?? themeById(systemTheme())
    if (!t) return
    root.dataset.theme = t.id
    set({ theme: t.id })
    if (save) store.set('tui-theme', t.id)
  }
  function applyFont(id: string, save: boolean) {
    const f = window.TUI_SET_FONT(id)
    set({ font: f.id })
    if (save) store.set('tui-font', f.id)
  }
  function applyPixel(id: string, save: boolean) {
    const f = window.TUI_SET_PIXEL(id)
    set({ pixel: f.id })
    if (save) store.set('tui-pixel', f.id)
  }

  /* ---------- modals: theme picker, font picker, command palette, help ---------- */
  function rows(kind = S.current.modal, filter = S.current.q): Array<Row> {
    const f = filter.toLowerCase()
    if (kind === 'theme') {
      const all: Array<Row> = [
        {
          label: 'restore default',
          meta: themeById(systemTheme())?.name ?? '',
        },
        ...THEMES.map((t) => ({
          id: t.id,
          group: t.scheme,
          label:
            t.name +
            (t.variant !== 'main' && !t.name.toLowerCase().includes(t.variant)
              ? ` ${t.variant}`
              : ''),
          meta: t.appearance,
          theme: t,
        })),
      ]
      return all.filter(
        (r) =>
          !f ||
          `${r.label} ${r.group ?? ''} ${r.meta}`.toLowerCase().includes(f),
      )
    }
    if (kind === 'font')
      return [
        ...pixels().map((pf, i) => ({
          id: pf.id,
          group: 'headings',
          label: pf.name,
          meta: i ? '' : 'default',
          pixel: pf,
        })),
        ...fonts().map((ff, i) => ({
          id: ff.id,
          group: 'text',
          label: ff.name,
          meta: i ? '' : 'default',
          font: ff,
        })),
      ].filter((r) => !f || `${r.label} ${r.group}`.toLowerCase().includes(f))
    if (kind !== 'palette') return []
    const all: Array<Row> = []
    TABS.forEach((t, i) =>
      all.push({
        group: 'go to',
        label: t.id,
        meta: `${i + 1}`,
        run: () => goTab(i),
      }),
    )
    TABS.filter((t) => !isSingle(t)).forEach((t) =>
      t.items.forEach((x) =>
        all.push({
          group: t.id,
          label: x.key,
          meta: x.meta,
          run: () => route(`#/${t.id}/${x.slug}`, { read: true, push: true }),
        }),
      ),
    )
    all.push(
      {
        group: 'actions',
        label: 'open cv',
        meta: '↗',
        run: () => window.open(CV, '_blank', 'noopener'),
      },
      {
        group: 'actions',
        label: 'changelog',
        meta: `${TABS.length}`,
        run: () => goTab(TABS.findIndex((t) => t.id === 'changelog')),
      },
      {
        group: 'actions',
        label: 'email ahmed',
        meta: '↗',
        run: () => (location.href = `mailto:${EMAIL}`),
      },
      {
        group: 'actions',
        label: 'change theme',
        meta: 't',
        run: () => openModal('theme'),
      },
      {
        group: 'actions',
        label: 'change font',
        meta: 'f',
        run: () => openModal('font'),
      },
    )
    fonts().forEach((ff) =>
      all.push({
        group: 'fonts',
        label: `font: ${ff.name}`,
        run: () => applyFont(ff.id, true),
      }),
    )
    pixels().forEach((pf) =>
      all.push({
        group: 'fonts',
        label: `heading font: ${pf.name}`,
        run: () => applyPixel(pf.id, true),
      }),
    )
    all.push({
      group: 'actions',
      label: 'show keys',
      meta: '?',
      run: () => openModal('help'),
    })
    THEMES.forEach((t) =>
      all.push({
        group: 'themes',
        label: `theme: ${t.name}`,
        meta: t.appearance,
        run: () => applyTheme(t.id, true),
        theme: t,
      }),
    )
    return f
      ? all.filter((r) => `${r.label} ${r.group}`.toLowerCase().includes(f))
      : all.filter((r) => r.group !== 'themes' && r.group !== 'fonts')
  }
  /** live preview of the highlighted theme or font */
  function preview(mIdx: number) {
    const r = rows()[mIdx] as Row | undefined
    if (!r) return
    if (S.current.modal === 'theme') applyTheme(r.id ?? systemTheme(), false)
    if (S.current.modal === 'font' && r.id) {
      // preview one font at a time; the other kind goes back to what it was
      applyFont(r.font ? r.id : before.current.font, false)
      applyPixel(r.pixel ? r.id : before.current.pixel, false)
    }
  }
  function setModalIdx(mIdx: number) {
    set({ mIdx })
    preview(mIdx)
  }
  function filterModal(q: string) {
    const kind = S.current.modal
    const list = rows(kind, q)
    let mIdx = 0
    if (!q && kind === 'theme')
      mIdx = Math.max(
        0,
        list.findIndex((r) => r.id === before.current.theme),
      )
    if (!q && kind === 'font')
      mIdx = Math.max(
        0,
        list.findIndex((r) => r.font && r.id === before.current.font),
      )
    set({ q })
    setModalIdx(mIdx)
  }
  function moveModal(d: number) {
    const n = rows().length
    if (n) setModalIdx((S.current.mIdx + d + n) % n)
  }
  function openModal(kind: ModalKind, seed = '') {
    if (S.current.modal) closeModal(false)
    if (kind === 'theme')
      before.current.theme = root.dataset.theme ?? systemTheme()
    if (kind === 'font') {
      before.current.font = S.current.font
      before.current.pixel = S.current.pixel
      // picker rows render in their own face
      ;[...fonts(), ...pixels()].forEach((f) => window.TUI_LOAD_FONT(f))
    }
    set({ modal: kind })
    if (kind === 'help') {
      focusNext.current = () => mBodyRef.current
      return
    }
    filterModal(seed)
    focusNext.current = () => qRef.current
  }
  function closeModal(keep: boolean, id?: string) {
    const kind = S.current.modal
    if (kind === 'theme') {
      if (keep && !id) {
        // "restore default": forget the pick and follow the system again
        store.del('tui-theme')
        applyTheme(systemTheme(), false)
      } else applyTheme(keep && id ? id : before.current.theme, keep)
    }
    if (kind === 'font') {
      const isPixel = !!id && pixels().some((f) => f.id === id)
      applyFont(
        keep && id && !isPixel ? id : before.current.font,
        keep && !isPixel,
      )
      applyPixel(
        keep && id && isPixel ? id : before.current.pixel,
        keep && isPixel,
      )
    }
    set({ modal: null })
    setPane(S.current.pane)
  }
  function runModal() {
    const kind = S.current.modal
    const r = rows()[S.current.mIdx] as Row | undefined
    if (!r) return
    if (kind === 'font' && r.id) {
      closeModal(true, r.id)
      say(`✓ ${r.pixel ? 'heading font' : 'font'} ${r.label}`)
      return
    }
    if (kind === 'theme') {
      closeModal(true, r.id)
      say(
        r.id
          ? `✓ theme ${themeById(r.id)?.name}`
          : '✓ theme follows the system',
      )
      return
    }
    closeModal(false)
    r.run?.()
  }

  /* ---------- keys ---------- */
  function onKey(e: KeyboardEvent) {
    const k = e.key
    const st = S.current
    if ((e.metaKey || e.ctrlKey) && k.toLowerCase() === 'k') {
      e.preventDefault()
      return st.modal === 'palette' ? closeModal(false) : openModal('palette')
    }
    if (st.modal) {
      if (k === 'Escape') {
        e.preventDefault()
        return closeModal(false)
      }
      if (st.modal === 'help') {
        if (k === '?' || k === 'q') {
          e.preventDefault()
          closeModal(false)
        } else if (k === 'Tab') e.preventDefault()
        return
      }
      if (k === 'ArrowDown' || (e.ctrlKey && k === 'n')) {
        e.preventDefault()
        return moveModal(1)
      }
      if (k === 'ArrowUp' || (e.ctrlKey && k === 'p')) {
        e.preventDefault()
        return moveModal(-1)
      }
      if (k === 'Enter') {
        e.preventDefault()
        return runModal()
      }
      if (k === 'Tab') {
        e.preventDefault() // keep focus inside the dialog
        qRef.current?.focus()
      }
      return
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return
    const target = e.target as Element
    if (target.closest('input, textarea, select, [contenteditable]')) return
    const onControl = target.closest('a, button:not([role="option"])')
    if (/^[1-9]$/.test(k) && +k <= TABS.length) {
      e.preventDefault()
      return goTab(+k - 1)
    }
    if (k === 'j' || k === 'ArrowDown') {
      e.preventDefault()
      return move(1)
    }
    if (k === 'k' || k === 'ArrowUp') {
      e.preventDefault()
      return move(-1)
    }
    if (k === 'g') {
      if (Date.now() - lastG.current < 500) {
        lastG.current = 0
        jump(false)
      } else lastG.current = Date.now()
      return
    }
    if (k === 'G') return jump(true)
    if (k === 'h' || k === 'ArrowLeft') {
      if (!st.zoom) {
        e.preventDefault()
        if (smallMq.matches) showDet(false)
        else setPane('list')
      }
      return
    }
    if (k === 'l' || k === 'ArrowRight') {
      e.preventDefault()
      return smallMq.matches ? showDet(true) : setPane('det')
    }
    if (
      k === 'Tab' &&
      !onControl &&
      !st.zoom &&
      !single() &&
      !smallMq.matches
    ) {
      e.preventDefault()
      return setPane(st.pane === 'list' ? 'det' : 'list')
    }
    if (k === 'Enter' && !onControl) {
      e.preventDefault()
      return open()
    }
    if (k === '/') {
      e.preventDefault()
      return openModal('palette')
    }
    if (k === 'z') return setZoom(!st.zoom)
    if (k === 'c') return void copy()
    // keys that open a dialog must not also type into its search box
    const dialog = ({ t: 'theme', f: 'font', '?': 'help' } as const)[
      k as 't' | 'f' | '?'
    ] as ModalKind | undefined
    if (dialog) {
      e.preventDefault()
      return openModal(dialog)
    }
    if (k === 'Escape') {
      if (st.zoom) setZoom(false)
      else if (st.mdet) showDet(false)
      else setPane('list')
    }
  }

  /* ---------- pointer ---------- */
  function onAppClick(e: MouseEvent) {
    // internal links in the content route inside the workspace
    const a = (e.target as Element).closest('a[href^="#/"]')
    if (a) {
      e.preventDefault()
      route(a.getAttribute('href') ?? '', { read: true, push: true })
    }
  }
  function onItemClick(e: MouseEvent, k: number) {
    e.stopPropagation()
    if (smallMq.matches) {
      select(k)
      return showDet(true)
    }
    if (k === S.current.idx[S.current.tab] && S.current.pane === 'list')
      return open() // click the selected item again to read
    setPane('list')
    select(k)
  }

  /* ---------- effects ---------- */
  // handlers read the latest closure through a ref, so listeners attach once
  const live = useRef({ onKey, onHistory, showDet, applyTheme })
  live.current = { onKey, onHistory, showDet, applyTheme }

  useEffect(() => {
    const key = (e: KeyboardEvent) => live.current.onKey(e)
    const hist = () => live.current.onHistory()
    const mq = () => live.current.showDet(false)
    addEventListener('keydown', key)
    addEventListener('popstate', hist)
    addEventListener('hashchange', hist)
    smallMq.addEventListener('change', mq)
    // no saved theme: follow the system when it switches light/dark
    const scheme = matchMedia('(prefers-color-scheme: light)')
    const follow = () => {
      if (!store.get('tui-theme') && !S.current.modal)
        live.current.applyTheme(systemTheme(), false)
    }
    scheme.addEventListener('change', follow)
    return () => {
      removeEventListener('keydown', key)
      removeEventListener('popstate', hist)
      removeEventListener('hashchange', hist)
      smallMq.removeEventListener('change', mq)
      scheme.removeEventListener('change', follow)
    }
  }, [])

  // start: restore the theme and font, then follow the url
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    applyFont(S.current.font, false)
    applyTheme(S.current.theme, false)
    setPane('list', false)
    // crawlable address from the sitemap: /?p=work/hivo opens #/work/hivo
    const fromQuery = new URLSearchParams(location.search).get('p')
    if (fromQuery && !location.hash && parseHash(`#/${fromQuery}`, ROUTES))
      history.replaceState(null, '', `${location.pathname}#/${fromQuery}`)
    if (location.hash) {
      if (parseHash(location.hash, ROUTES) === false)
        history.replaceState(null, '', location.pathname + location.search)
      else route(location.hash, { read: true })
    }
    focusNext.current = null // first load: no focus ring until the visitor acts
  }, [])

  // after every render: focus what was asked for, scroll to a requested anchor
  useLayoutEffect(() => {
    const el = focusNext.current?.()
    focusNext.current = null
    el?.focus({ preventScroll: true })
    const a = anchorNext.current
    anchorNext.current = null
    if (a) toAnchor(a)
  })

  // new item: reset the reading pane, keep the selection in view, retitle the page
  const item = cur()
  useLayoutEffect(() => {
    detRef.current?.scrollTo({ top: 0 })
    document
      .getElementById(`opt-${tabOf().id}-${item.slug}`)
      ?.scrollIntoView({ block: 'nearest' })
    document.title =
      s.tab === 0
        ? 'Ahmed Abu Qahf · som3aware'
        : `${single() ? tabOf().id : item.key} · Ahmed Abu Qahf`
  }, [s.tab, item])

  // keep the active tab visible when the tab strip scrolls (mobile)
  useLayoutEffect(() => {
    const el = tabsRef.current
    const on = el?.children[s.tab] as HTMLElement | undefined
    if (el && on && el.scrollWidth > el.clientWidth)
      el.scrollLeft =
        on.offsetLeft - el.offsetLeft - (el.clientWidth - on.offsetWidth) / 2
  }, [s.tab])

  useLayoutEffect(() => {
    if (s.modal)
      document
        .getElementById(`m-${s.mIdx}`)
        ?.scrollIntoView({ block: 'nearest' })
  }, [s.modal, s.mIdx, s.q])

  function toAnchor(a: string) {
    const el = detRef.current?.querySelector<HTMLElement>(
      `[data-anchor="${CSS.escape(a)}"]`,
    )
    if (!el) return say(`✗ no such section: ${a}`)
    el.scrollIntoView({ block: 'start', behavior: behavior() })
    const glow = `color-mix(in srgb, ${getComputedStyle(root).getPropertyValue('--accent')} 18%, transparent)`
    el.animate(
      [
        { background: glow },
        { background: glow, offset: 0.4 },
        { background: 'transparent' },
      ],
      { duration: 1200, easing: 'ease-out' },
    )
  }

  /* ---------- render ---------- */
  const tab = tabOf()
  const one = single()
  const small = smallMq.matches
  const font = fontById(s.font)
  const theme = themeById(s.theme)
  const mRows = s.modal && s.modal !== 'help' ? rows() : []

  const hints: Array<[string, string]> =
    s.modal === 'help'
      ? [['esc', 'close']]
      : s.modal
        ? [
            ['↑↓', 'move'],
            ['⏎', s.modal === 'palette' ? 'run' : 'apply'],
            ['esc', 'cancel'],
          ]
        : small
          ? []
          : one
            ? [
                ['j/k', 'scroll'],
                [`1-${TABS.length}`, 'section'],
                [`${MOD}K`, 'commands'],
                ['?', 'keys'],
              ]
            : s.zoom
              ? [
                  ['j/k', 'scroll'],
                  ['z', 'collapse'],
                  ['esc', 'back'],
                  ['?', 'keys'],
                ]
              : s.pane === 'list'
                ? [
                    ['j/k', 'move'],
                    ['⏎', 'open'],
                    ['l', 'read'],
                    ['/', 'search'],
                    ['?', 'keys'],
                  ]
                : [
                    ['j/k', 'scroll'],
                    ['h', 'list'],
                    ['z', 'expand'],
                    ...(item.copy ? [['c', 'copy'] as [string, string]] : []),
                    ['?', 'keys'],
                  ]

  // mdet only matters on phones: there the reading pane replaces the list
  const listHidden = one || s.zoom
  const listFocus = s.pane === 'list'
  const detFocus = s.pane === 'det'
  const btn =
    'inline-flex items-center gap-1.5 rounded-[2px] px-1 py-0.5 no-underline hover:bg-hover hover:text-fg active:translate-y-px max-md:min-h-8 max-md:px-1.5 [&_kbd]:text-fg'

  return (
    <ThemeContext value={s.theme}>
      <div
        id="app"
        aria-label="Portfolio, workspace view"
        onClick={onAppClick}
        className={clsx(
          'relative grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-3.5 p-3 pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))]',
          tab.layout === 'table'
            ? 'grid-cols-[minmax(0,52%)_minmax(0,1fr)] md:max-xl:grid-cols-[minmax(0,48%)_minmax(0,1fr)]'
            : 'grid-cols-[minmax(240px,34%)_minmax(0,1fr)] md:max-xl:grid-cols-[minmax(220px,38%)_minmax(0,1fr)]',
          'max-md:grid-cols-1 max-md:gap-x-0 max-md:p-2.5',
        )}
      >
        <a
          href="?plain"
          className="absolute -top-10 left-3 z-20 bg-accent px-2.5 py-1 text-on-accent focus:top-2"
        >
          read as a plain page
        </a>

        <header className="col-span-full flex flex-wrap items-center gap-1 max-md:flex-nowrap">
          <h1 className="mr-3 font-px font-normal text-fg max-md:hidden">
            <span className="sr-only">Ahmed Abu Qahf, </span>ahmed
            <b className="font-normal text-muted">@</b>som3aware
          </h1>
          <nav
            ref={tabsRef}
            role="tablist"
            aria-label="Sections"
            className="flex flex-wrap gap-0.5 max-md:min-w-0 max-md:flex-1 max-md:flex-nowrap max-md:overflow-x-auto max-md:[scrollbar-width:none]"
          >
            {TABS.map((t, i) => {
              const on = i === s.tab
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="detpane"
                  tabIndex={on ? 0 : -1}
                  onClick={() => goTab(i)}
                  className={clsx(
                    'rounded-[2px] px-2.5 py-[3px] whitespace-nowrap transition-colors active:translate-y-px max-md:px-1.5',
                    on
                      ? 'bg-accent text-on-accent'
                      : 'text-muted hover:bg-hover hover:text-fg',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'max-md:hidden',
                      on ? 'text-on-accent opacity-70' : cycle(i),
                    )}
                  >
                    {i + 1}
                  </span>{' '}
                  {t.id}
                </button>
              )
            })}
          </nav>
          <span className="ml-auto flex items-center gap-3.5 text-muted">
            <a
              className={clsx(btn, 'text-accent')}
              href={CV}
              target="_blank"
              rel="noopener"
            >
              cv ↗
            </a>
            <button
              type="button"
              aria-haspopup="dialog"
              className={clsx(btn, 'text-muted')}
              onClick={() => openModal('theme')}
            >
              <kbd className="max-md:hidden">t</kbd>
              <b className="font-medium text-fg max-md:hidden">{theme?.name}</b>
              <span className="md:hidden">theme</span>
            </button>
            <button
              type="button"
              aria-haspopup="dialog"
              className={clsx(btn, 'text-muted')}
              onClick={() => openModal('font')}
            >
              <kbd className="max-md:hidden">f</kbd>
              <b className="font-medium text-fg max-md:hidden">{font.name}</b>
              <span className="md:hidden">font</span>
            </button>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label="Command palette"
              className={clsx(btn, 'text-muted')}
              onClick={() => openModal('palette')}
            >
              <kbd className="max-md:hidden">{MOD}K</kbd>
              <span className="md:hidden">search</span>
            </button>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label="Keyboard help"
              className={clsx(btn, 'text-muted max-md:hidden')}
              onClick={() => openModal('help')}
            >
              <kbd>?</kbd>
            </button>
          </span>
        </header>

        {/* list pane */}
        <PaneBox
          id="listpane"
          focus={listFocus}
          hidden={listHidden}
          className={clsx(s.mdet && 'max-md:hidden')}
          labelledBy="list-title"
          onClick={() => setPane('list', false)}
          left={<b id="list-title">{tab.id}</b>}
          right={`${s.idx[s.tab] + 1}/${tab.items.length}`}
        >
          <div
            ref={listRef}
            id="list"
            role="listbox"
            tabIndex={0}
            aria-labelledby="list-title"
            aria-activedescendant={`opt-${tab.id}-${item.slug}`}
            className={clsx(scrollCls, 'pt-3.5 pb-2.5')}
          >
            <ListRows tab={tab} sel={s.idx[s.tab]} onPick={onItemClick} />
          </div>
        </PaneBox>

        {/* reading pane */}
        <PaneBox
          id="detpane"
          focus={detFocus}
          dash={tab.layout === 'dash'}
          className={clsx(
            (one || s.zoom || listHidden) && 'col-span-full',
            !one && !s.mdet && 'max-md:hidden',
          )}
          labelledBy="det-title"
          onClick={(e) => {
            if (!(e.target as Element).closest('a, button'))
              setPane('det', false)
          }}
          left={
            <>
              <button
                type="button"
                aria-label="Back to list"
                onClick={() => showDet(false)}
                className={clsx(
                  'hidden pr-2 text-accent',
                  s.mdet && 'max-md:inline',
                )}
              >
                ←
              </button>
              {!one && (
                <span className="text-subtle max-md:hidden">{tab.id} / </span>
              )}
              <b id="det-title">{one ? tab.id : item.key}</b>
            </>
          }
          right={
            <span className="flex gap-2.5">
              {item.copy && (
                <button
                  type="button"
                  className="text-muted hover:text-fg active:translate-y-px"
                  onClick={() => void copy()}
                >
                  <kbd className="px-1 text-fg">c</kbd> copy
                </button>
              )}
              {!one && (
                <button
                  type="button"
                  className="text-muted hover:text-fg active:translate-y-px max-md:hidden"
                  onClick={() => setZoom(!s.zoom)}
                >
                  <kbd className="px-1 text-fg">z</kbd>{' '}
                  {s.zoom ? 'collapse' : 'expand'}
                </button>
              )}
            </span>
          }
        >
          <div
            ref={detRef}
            id="det"
            tabIndex={-1}
            className={clsx(
              scrollCls,
              tab.layout === 'dash'
                ? 'flex flex-col pt-3 pb-1'
                : 'pt-3.5 pb-2.5',
            )}
          >
            <div
              key={`${tab.id}/${item.slug}`}
              className={clsx(
                'animate-in',
                tab.layout === 'dash'
                  ? 'flex flex-1 flex-col p-0'
                  : clsx(
                      'px-5.5 pt-1 pb-6 max-md:px-3.5 max-md:pb-5',
                      (one || s.zoom) && 'mx-auto max-w-[78ch] pt-4',
                    ),
              )}
            >
              {item.body}
            </div>
          </div>
        </PaneBox>

        <footer className="col-span-full flex items-center overflow-hidden text-sm whitespace-nowrap">
          <span
            className={clsx(
              'px-2.5 py-0.5 font-px text-mode tracking-[.04em]',
              // one colour per mode, like vim
              s.modal
                ? {
                    palette: 'bg-hue-4 text-bg',
                    theme: 'bg-hue-5 text-bg',
                    font: 'bg-hue-6 text-bg',
                    help: 'bg-hue-3 text-bg',
                  }[s.modal]
                : s.zoom
                  ? 'bg-hue-2 text-bg'
                  : 'bg-accent text-on-accent',
            )}
          >
            {s.modal ? s.modal.toUpperCase() : s.zoom ? 'READ' : 'NORMAL'}
          </span>
          <span className="truncate px-3 text-muted [&_b]:text-accent">
            {hints.map(([k, v], i) => (
              <Fragment key={k}>
                {i > 0 && (
                  <i aria-hidden="true" className="whitespace-pre">
                    {'  '}
                  </i>
                )}
                <b>{k}</b> {v}
              </Fragment>
            ))}
          </span>
          <span
            role="status"
            aria-live="polite"
            className="truncate px-3 text-warning"
          >
            {s.msg}
          </span>
          <span className="ml-auto pl-3 text-muted">
            {one ? `~/${tab.id}` : `~/${tab.id}/${item.slug}`}
          </span>
        </footer>

        {s.modal && (
          <div
            className="absolute inset-0 z-5 grid place-items-center bg-[color-mix(in_srgb,var(--background)_60%,transparent)] backdrop-blur-[2px]"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal(false)
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className={clsx(
                'relative flex min-h-0 min-w-0 flex-col rounded-[3px] border border-focus bg-overlay shadow-[0_12px_40px_rgb(0_0_0/.35)] max-md:h-[calc(100%-32px)]',
                s.modal === 'theme' || s.modal === 'palette'
                  ? 'h-[min(560px,calc(100%-64px))] w-[min(560px,calc(100%-24px))]'
                  : s.modal === 'font'
                    ? 'max-h-[calc(100%-64px)] w-[min(480px,calc(100%-24px))]'
                    : 'max-h-[calc(100%-64px)] w-[min(400px,calc(100%-32px))]',
              )}
            >
              <Legend className="bg-overlay">
                <b id="modal-title" className="font-medium text-accent">
                  {
                    {
                      theme: 'theme',
                      font: 'font',
                      palette: 'commands',
                      help: 'keys',
                    }[s.modal]
                  }
                </b>
              </Legend>
              {s.modal !== 'help' && (
                <>
                  <Legend right className="bg-overlay">
                    {mRows.length ? `${s.mIdx + 1}/${mRows.length}` : '0'}
                  </Legend>
                  <label className="mx-3.5 mt-4 mb-1 flex items-center gap-2 rounded-[3px] border border-line bg-bg px-2.5 py-1.5 text-accent focus-within:border-focus">
                    <span aria-hidden="true">›</span>
                    <input
                      ref={qRef}
                      type="text"
                      autoComplete="off"
                      spellCheck={false}
                      aria-label="Filter"
                      aria-controls="modal-body"
                      aria-activedescendant={
                        mRows.length ? `m-${s.mIdx}` : undefined
                      }
                      placeholder={
                        s.modal === 'theme'
                          ? `search ${THEMES.length} themes`
                          : s.modal === 'font'
                            ? `search ${fonts().length + pixels().length} fonts`
                            : 'go to, search work, themes…'
                      }
                      value={s.q}
                      onChange={(e) => filterModal(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-fg outline-0 placeholder:text-subtle"
                    />
                  </label>
                </>
              )}
              <div
                ref={mBodyRef}
                id="modal-body"
                tabIndex={-1}
                className={clsx(scrollCls, 'pt-1.5 pb-2')}
                onPointerMove={(e) => {
                  const m = (e.target as Element).closest<HTMLElement>(
                    '[data-m]',
                  )
                  if (
                    m &&
                    +(m.dataset.m ?? 0) !== s.mIdx &&
                    (s.modal === 'theme' || s.modal === 'font')
                  )
                    setModalIdx(+(m.dataset.m ?? 0))
                }}
              >
                {s.modal === 'help' ? (
                  <Help />
                ) : mRows.length ? (
                  <ModalRows
                    rows={mRows}
                    sel={s.mIdx}
                    current={
                      s.modal === 'theme'
                        ? [before.current.theme]
                        : s.modal === 'font'
                          ? [before.current.font, before.current.pixel]
                          : []
                    }
                    onPick={(k) => {
                      set({ mIdx: k })
                      runModal()
                    }}
                  />
                ) : (
                  <p className="px-4.5 py-2.5 text-sm text-muted">
                    no match for “{s.q}”
                  </p>
                )}
              </div>
              <p className="border-t border-line-subtle px-3.5 py-1.5 text-sm text-muted [&_b]:font-medium [&_b]:text-accent">
                {s.modal === 'help' ? (
                  <>
                    <b>esc</b> close
                  </>
                ) : s.modal === 'palette' ? (
                  <>
                    <b>↑↓</b> move <b>⏎</b> run <b>esc</b> close
                  </>
                ) : (
                  <>
                    <b>↑↓</b> preview <b>⏎</b> apply <b>esc</b> cancel
                  </>
                )}
              </p>
            </section>
          </div>
        )}
      </div>
    </ThemeContext>
  )
}

/* ---------- pieces ---------- */

const scrollCls =
  'min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] focus-visible:outline-none'

function Legend({
  children,
  right,
  className,
}: {
  children: ReactNode
  right?: boolean
  className?: string
}) {
  return (
    <span
      className={clsx(
        'absolute -top-[11px] z-1 px-1.5 whitespace-nowrap text-muted',
        right ? 'right-2.5' : 'left-2.5',
        className ?? 'bg-bg',
      )}
    >
      {children}
    </span>
  )
}

function PaneBox({
  id,
  focus,
  hidden,
  dash,
  className,
  labelledBy,
  onClick,
  left,
  right,
  children,
}: {
  id: string
  focus: boolean
  hidden?: boolean
  dash?: boolean
  className?: string
  labelledBy: string
  onClick: (e: MouseEvent) => void
  left: ReactNode
  right: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      hidden={hidden}
      data-focus={focus || undefined}
      onClick={onClick}
      className={clsx(
        'group relative flex min-h-0 min-w-0 flex-col rounded-[3px] transition-colors',
        dash
          ? 'border-0'
          : clsx(
              'border has-[>div:focus-visible]:shadow-[0_0_0_1px_var(--accent)]',
              focus ? 'border-accent' : 'border-line',
            ),
        className,
      )}
    >
      {!dash && (
        <>
          <Legend>
            <span className="[&_b]:font-medium [&_b]:text-fg group-data-focus:[&_b]:text-accent">
              {left}
            </span>
          </Legend>
          <Legend right>{right}</Legend>
        </>
      )}
      {children}
    </section>
  )
}

const rowCls =
  'group/it grid w-full gap-1.5 py-px pr-3.5 pl-2.5 text-left text-muted hover:bg-hover hover:text-fg active:translate-y-px aria-selected:bg-selected aria-selected:text-on-selected group-data-focus:aria-selected:shadow-[inset_2px_0_0_var(--accent)] max-md:min-h-10 max-md:items-center max-md:py-1'
const Mk = () => (
  <span
    aria-hidden="true"
    className="invisible text-accent group-aria-selected/it:visible"
  >
    ▸
  </span>
)
const grpCls =
  'overflow-hidden pt-2.5 pr-3.5 pb-0.5 pl-2.5 text-sm whitespace-nowrap text-accent before:text-line before:content-["──_"]'
const tableCols =
  // columns are in ch of the 13px row font; rows and header must share that font size or the ch differ
  'grid-cols-[16px_18ch_8ch_15ch_minmax(0,1fr)] gap-2.5 max-xl:grid-cols-[16px_18ch_8ch_minmax(0,1fr)] max-lg:grid-cols-[16px_minmax(0,1fr)_minmax(0,1.3fr)]'

function ListRows({
  tab,
  sel,
  onPick,
}: {
  tab: (typeof TABS)[number]
  sel: number
  onPick: (e: MouseEvent, k: number) => void
}) {
  let group: string | undefined
  return (
    <>
      {tab.layout === 'table' && (
        <div
          role="presentation"
          aria-hidden="true"
          className={clsx(
            'sticky -top-3.5 z-1 grid items-baseline bg-bg pr-3.5 pb-1.5 pl-2.5 text-base text-muted [&>span]:text-xs [&>span]:tracking-[.06em] [&>span]:uppercase',
            tableCols,
          )}
        >
          <span />
          <span>name</span>
          <span className="max-lg:hidden">year</span>
          <span className="max-xl:hidden">role</span>
          <span>quick fact</span>
        </div>
      )}
      {tab.items.map((x, k) => {
        const head = tab.layout === 'table' && x.group !== group
        group = x.group
        const last = k === tab.items.length - 1
        return (
          <Fragment key={x.slug}>
            {head && (
              <div
                role="presentation"
                className={clsx(
                  grpCls,
                  'after:text-line after:content-["_──────────────────────────────────"]',
                )}
              >
                {x.group}
              </div>
            )}
            <button
              type="button"
              role="option"
              tabIndex={-1}
              id={`opt-${tab.id}-${x.slug}`}
              aria-selected={k === sel}
              onClick={(e) => onPick(e, k)}
              className={clsx(
                rowCls,
                tab.layout === 'table'
                  ? tableCols
                  : tab.layout === 'graph'
                    ? 'relative grid-cols-[16px_2ch_minmax(0,1fr)_auto]'
                    : 'grid-cols-[16px_1fr_auto]',
              )}
            >
              <Mk />
              {tab.layout === 'table' ? (
                <>
                  <span className="truncate">{x.key}</span>
                  <span className="truncate text-sm text-hue-3 max-lg:hidden">
                    {x.meta}
                  </span>
                  <span className="truncate text-sm text-hue-6 max-xl:hidden">
                    {x.role}
                  </span>
                  <span className="truncate text-fg group-aria-selected/it:text-accent">
                    {x.result}
                  </span>
                </>
              ) : tab.layout === 'graph' ? (
                <>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'relative text-center',
                      // each company in its brand colour (matched to the theme); otherwise one colour per branch
                      x.color ?? (x.now ? 'text-success' : cycle(k)),
                      !last &&
                        "after:absolute after:top-4 after:left-1/2 after:h-[calc(100%+4px)] after:border-l after:border-line after:content-['']",
                    )}
                  >
                    {x.now ? '●' : '○'}
                  </span>
                  <span>
                    {x.key}
                    {x.now && (
                      <i className="ml-1.5 rounded-[2px] border border-current px-1 align-[1px] text-2xs text-success not-italic">
                        HEAD
                      </i>
                    )}
                  </span>
                  <span className="text-sm text-muted">{x.meta}</span>
                </>
              ) : (
                <>
                  <span>{x.key}</span>
                  <span className="text-sm text-muted">{x.meta}</span>
                </>
              )}
            </button>
          </Fragment>
        )
      })}
    </>
  )
}

function ModalRows({
  rows,
  sel,
  current,
  onPick,
}: {
  rows: Array<Row>
  sel: number
  current: Array<string>
  onPick: (k: number) => void
}) {
  let group: string | undefined
  return (
    <>
      {rows.map((r, k) => {
        const head = r.group && r.group !== group
        group = r.group
        return (
          <Fragment key={`${r.group}/${r.label}`}>
            {head && (
              <div role="presentation" className={grpCls}>
                {r.group}
              </div>
            )}
            <button
              type="button"
              role="option"
              tabIndex={-1}
              id={`m-${k}`}
              data-m={k}
              aria-selected={k === sel}
              onClick={() => onPick(k)}
              className={clsx(rowCls, 'grid-cols-[16px_1fr_auto]')}
            >
              <Mk />
              <span
                className="flex min-w-0 items-center gap-2.5 truncate"
                style={
                  r.font
                    ? {
                        fontFamily: `'${r.font.name}', 'Adwaita Mono', var(--mono-fallback)`,
                        fontSize: `${r.font.size}px`,
                      }
                    : r.pixel
                      ? {
                          fontFamily: `'${r.pixel.name}', var(--mono-fallback)`,
                          fontSize: '22px',
                          lineHeight: '28px',
                        }
                      : undefined
                }
              >
                {r.theme && (
                  <span
                    aria-hidden="true"
                    className="inline-flex flex-none overflow-hidden rounded-[2px] border border-line"
                  >
                    {r.theme.sw.map((c, j) => (
                      <i
                        key={j}
                        className="h-3.5 w-[7px]"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                )}
                {r.label}
                {r.font && (
                  <i className="text-subtle not-italic">{'{ } 0O 1lI'}</i>
                )}
              </span>
              <span className="text-sm text-muted">
                {r.id && current.includes(r.id) && (
                  <b className="font-normal text-success">✓ current </b>
                )}
                {r.meta}
              </span>
            </button>
          </Fragment>
        )
      })}
    </>
  )
}

function Help() {
  const keys: Array<[string, string]> = [
    [`1–${TABS.length}`, 'go to section'],
    ['j / k', 'move, or scroll the reading pane'],
    ['h / l', 'list pane / reading pane'],
    ['⇥', 'switch pane'],
    ['⏎', 'open item, or its link'],
    ['gg / G', 'first / last'],
    ['/', 'search'],
    [`${MOD}K`, 'command palette'],
    ['t', 'theme'],
    ['f', 'font'],
    ['c', 'copy link or address'],
    ['z', 'expand the reading pane'],
    ['esc', 'close · collapse · back'],
    ['?', 'this help'],
  ]
  return (
    <>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4.5 gap-y-1 px-4.5 pt-3.5">
        {keys.map(([k, v]) => (
          <Fragment key={k}>
            <dt>
              <kbd className="text-accent">{k}</kbd>
            </dt>
            <dd className="text-muted">{v}</dd>
          </Fragment>
        ))}
      </dl>
      <p className="px-4.5 py-2.5 text-sm text-muted">
        Mouse and touch work everywhere too.{' '}
        <a href="?plain">Read as a plain page</a>.
      </p>
    </>
  )
}
