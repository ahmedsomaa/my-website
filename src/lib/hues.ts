import { brandHex } from '#/icons'

/*
 * The theme's six terminal colours (ANSI slots 1-6: red, green, yellow, blue, magenta, cyan)
 * as Tailwind classes. Written out in full so Tailwind finds them.
 */
export const TEXT = [
  'text-hue-1',
  'text-hue-2',
  'text-hue-3',
  'text-hue-4',
  'text-hue-5',
  'text-hue-6',
] as const
export const BG = [
  'bg-hue-1',
  'bg-hue-2',
  'bg-hue-3',
  'bg-hue-4',
  'bg-hue-5',
  'bg-hue-6',
] as const

/** Order for things that cycle: blue, green, magenta, yellow, cyan, then red (red reads as an error, so it comes last). */
const ORDER = [3, 1, 4, 2, 5, 0]

/** Colour class for the i-th item of a cycling list. */
export const cycle = (i: number) => TEXT[ORDER[i % 6]]
export const cycleBg = (i: number) => BG[ORDER[i % 6]]

/**
 * Hue ranges (degrees, upper bound) → theme slot, following how people name colours:
 * cyan is narrow, blue runs 200-250°, purples read as magenta, oranges as yellow.
 */
const RANGES: Array<[number, number]> = [
  [20, 0], // red
  [75, 2], // orange, yellow
  [165, 1], // green
  [200, 5], // cyan
  [250, 3], // blue
  [335, 4], // purple, magenta
  [360, 0], // red again
]

/**
 * The theme colour closest to a brand's official colour, so React is cyan and Node.js green in
 * every theme. Black, white and grey brands (Next.js, Express, GitHub) use the normal text colour.
 */
export function nearestHue(hex: string) {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(
    (v) => v / 255,
  )
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (s < 0.2 || l < 0.15 || l > 0.92) return 'text-fg'
  let h =
    max === r
      ? ((g - b) / d) % 6
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4
  h = (h * 60 + 360) % 360
  const slot = RANGES.find(([end]) => h < end) ?? RANGES[0]
  return TEXT[slot[1]]
}

/**
 * Same name, same colour, everywhere (e.g. a tech in every stack list).
 * Brands use their official colour, matched to the theme; anything else gets a stable colour from its name.
 */
export function byName(name: string) {
  const hex = brandHex(name)
  if (hex) return nearestHue(hex)
  let h = 0
  for (const c of name.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return cycle(h % 5) // skip red, it reads as an error
}
