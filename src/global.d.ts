/** Set up by the boot script in index.html, before first paint. */
interface TuiFont {
  id: string
  name: string
  /** px at which the x-height matches JetBrains Mono at 13px */
  size: number
  css: Array<string>
  note?: string
}

/** Pixel font for headings. */
interface TuiPixel {
  id: string
  name: string
  css: Array<string>
}

interface Window {
  TUI_FONTS: Array<TuiFont>
  TUI_PIXELS: Array<TuiPixel>
  TUI_LOAD_FONT: (f: { css: Array<string> }) => void
  TUI_SET_FONT: (id: string | null) => TuiFont
  TUI_SET_PIXEL: (id: string | null) => TuiPixel
}
