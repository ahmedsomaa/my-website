/** Set up by the boot script in index.html, before first paint. */
interface TuiFont {
  id: string
  name: string
  /** px at which the x-height matches JetBrains Mono at 13px */
  size: number
  css: Array<string>
  note?: string
}

interface Window {
  TUI_FONTS: Array<TuiFont>
  TUI_LOAD_FONT: (f: TuiFont) => void
  TUI_SET_FONT: (id: string | null) => TuiFont
}
