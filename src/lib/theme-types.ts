export interface Theme {
  id: string
  name: string
  scheme: string
  variant: string
  appearance: 'light' | 'dark' | string
  /** swatch colours: background, foreground, accent, success, danger */
  sw: Array<string>
}
