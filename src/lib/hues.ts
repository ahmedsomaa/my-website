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

/** Same name, same colour, everywhere (e.g. a tech in every stack list). */
export function byName(name: string) {
  let h = 0
  for (const c of name.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return cycle(h % 5) // skip red, it reads as an error
}
