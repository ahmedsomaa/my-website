import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { UI_PREFS_COOKIE, parseUiPrefs } from '@/lib/ui-prefs'

/** Reads theme/mode from the request cookie so the first paint matches the visitor's choice. */
export const getUiPrefs = createServerFn({ method: 'GET' }).handler(() =>
  parseUiPrefs(getCookie(UI_PREFS_COOKIE)),
)
