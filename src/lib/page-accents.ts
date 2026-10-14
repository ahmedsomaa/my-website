/**
 * HSL triplets matching the `--brand-*` tokens, one pair per page. Each route declares one via
 * `staticData.accent`; the root layout exposes it as `--page-accent-light/-dark`, and
 * `--accent-page` picks the right one per theme (SSR-safe).
 *
 * The light values are darkened so accent text clears 4.5:1 on the light background
 * (the raw brand yellow was 1.3:1). The dark values clear 4.5:1 on the dark one.
 */
export interface PageAccent {
  light: string
  dark: string
}

export const PAGE_ACCENTS = {
  // React cyan
  home: { light: '193 95% 30%', dark: '193 95% 50%' },
  // Node green
  about: { light: '120 41% 30%', dark: '120 41% 45%' },
  // JavaScript yellow
  work: { light: '43 95% 27%', dark: '53 93% 60%' },
  // Tailwind teal (stack-derived palette)
  blog: { light: '189 94% 27%', dark: '189 94% 55%' },
} as const satisfies Record<string, PageAccent>
