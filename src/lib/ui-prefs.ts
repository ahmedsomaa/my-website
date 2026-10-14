import { z } from 'zod'

export const UI_PREFS_COOKIE = 'ui-prefs'

export const uiPrefsSchema = z.object({
  mode: z.enum(['polished', 'raw']).catch('polished'),
  theme: z.enum(['light', 'dark']).catch('dark'),
})

export type UIPrefs = z.infer<typeof uiPrefsSchema>
export type UIMode = UIPrefs['mode']
export type Theme = UIPrefs['theme']

export const DEFAULT_UI_PREFS: UIPrefs = { mode: 'polished', theme: 'dark' }

export function parseUiPrefs(raw: string | undefined): UIPrefs {
  if (!raw) return DEFAULT_UI_PREFS
  try {
    return uiPrefsSchema.parse(JSON.parse(raw))
  } catch {
    return DEFAULT_UI_PREFS
  }
}
