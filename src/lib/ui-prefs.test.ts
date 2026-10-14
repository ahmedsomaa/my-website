import { describe, expect, it } from 'vitest'
import { DEFAULT_UI_PREFS, parseUiPrefs } from './ui-prefs'

describe('parseUiPrefs', () => {
  it('defaults when the cookie is absent or garbage', () => {
    expect(parseUiPrefs(undefined)).toEqual(DEFAULT_UI_PREFS)
    expect(parseUiPrefs('not json')).toEqual(DEFAULT_UI_PREFS)
  })

  it('reads valid prefs', () => {
    expect(parseUiPrefs('{"mode":"raw","theme":"light"}')).toEqual({
      mode: 'raw',
      theme: 'light',
    })
  })

  it('repairs invalid fields individually', () => {
    expect(parseUiPrefs('{"mode":"nope","theme":"light"}')).toEqual({
      mode: 'polished',
      theme: 'light',
    })
  })
})
