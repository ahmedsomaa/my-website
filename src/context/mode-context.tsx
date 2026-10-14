import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { UI_PREFS_COOKIE, parseUiPrefs } from '@/lib/ui-prefs'
import type { Theme, UIMode, UIPrefs } from '@/lib/ui-prefs'

interface ModeCtx {
  mode: UIMode
  toggle: () => void
  setMode: (m: UIMode) => void
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ModeCtx | undefined>(undefined)

/** Disable every transition for one frame so a theme swap doesn't smear colour transitions. */
function suppressTransitions() {
  const style = document.createElement('style')
  style.textContent =
    '*,*::before,*::after{transition:none!important;animation-duration:0s!important}'
  document.head.appendChild(style)
  void window.getComputedStyle(document.body).opacity
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
}

function persist(prefs: UIPrefs) {
  const value = encodeURIComponent(JSON.stringify(prefs))
  document.cookie = `${UI_PREFS_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`
}

/**
 * Seeded with defaults so prerendered HTML and hydration agree, then synced from the cookie.
 * The `dark` / `raw-mode` classes live on <html> and are rendered by the root route.
 */
export function ModeProvider({
  initial,
  children,
}: {
  initial: UIPrefs
  children: ReactNode
}) {
  const [prefs, setPrefs] = useState<UIPrefs>(initial)

  // Pages are prerendered with default prefs; adopt the visitor's saved cookie after hydration.
  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${UI_PREFS_COOKIE}=([^;]*)`),
    )
    if (!match) return
    const saved = parseUiPrefs(decodeURIComponent(match[1]))
    setPrefs((prev) =>
      prev.mode === saved.mode && prev.theme === saved.theme ? prev : saved,
    )
  }, [])

  const update = useCallback((next: Partial<UIPrefs>) => {
    setPrefs((prev) => {
      const merged = { ...prev, ...next }
      persist(merged)
      return merged
    })
  }, [])

  const value = useMemo<ModeCtx>(
    () => ({
      mode: prefs.mode,
      theme: prefs.theme,
      setMode: (mode) => update({ mode }),
      setTheme: (theme) => {
        suppressTransitions()
        update({ theme })
      },
      toggle: () =>
        update({ mode: prefs.mode === 'polished' ? 'raw' : 'polished' }),
      toggleTheme: () => {
        suppressTransitions()
        update({ theme: prefs.theme === 'light' ? 'dark' : 'light' })
      },
    }),
    [prefs, update],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useMode() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}
