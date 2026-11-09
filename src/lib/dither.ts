/* Ordered Bayer dither in two theme colours, so screenshots sit in the palette. */

export interface Gray {
  w: number
  h: number
  g: Float32Array
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
)
const cache = new Map<string, Gray>()
/** Any CSS colour to [r, g, b]. The build minifies `#ffffff` to `#fff`, so let the browser parse it. */
const rgb = (c: string) => {
  const x = document.createElement('canvas').getContext('2d')
  if (!x) return [0, 0, 0]
  x.fillStyle = c.trim()
  x.fillRect(0, 0, 1, 1)
  return Array.from(x.getImageData(0, 0, 1, 1).data.slice(0, 3))
}
const lum = ([r, g, b]: Array<number>) => 0.2126 * r + 0.7152 * g + 0.0722 * b

/** Grayscale copy of a loaded image, one dither dot per 2 css px (1 on small images) so it never moire-scales. */
export function gray(img: HTMLImageElement): Gray {
  const css = img.getBoundingClientRect().width || 200
  const w = Math.max(
    40,
    Math.min(img.naturalWidth, Math.floor(css / (css < 170 ? 1 : 2))),
  )
  const key = `${img.src}@${w}`
  const hit = cache.get(key)
  if (hit) return hit
  const h = Math.round((img.naturalHeight * w) / img.naturalWidth)
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const x = c.getContext('2d', { willReadFrequently: true })
  if (!x) throw new Error('no 2d context')
  x.drawImage(img, 0, 0, w, h)
  const px = x.getImageData(0, 0, w, h).data
  const g = new Float32Array(w * h)
  for (let i = 0; i < g.length; i++)
    g[i] = Math.pow(
      (px[i * 4] * 0.2126 + px[i * 4 + 1] * 0.7152 + px[i * 4 + 2] * 0.0722) /
        255,
      1.15,
    )
  const out = { w, h, g }
  cache.set(key, out)
  return out
}

/** Paint the dither with the current theme's background and foreground. */
export function paint(cv: HTMLCanvasElement, { w, h, g }: Gray) {
  const cs = getComputedStyle(document.documentElement)
  const bg = rgb(cs.getPropertyValue('--background'))
  const ink = rgb(cs.getPropertyValue('--foreground'))
  const dark = lum(bg) < lum(ink) // on dark themes invert, so bright screens sink into the background
  const lo = dark ? bg : ink
  const hi = dark ? ink : bg
  cv.width = w
  cv.height = h
  const x = cv.getContext('2d')
  if (!x) return
  const im = x.createImageData(w, h)
  const d = im.data
  for (let y = 0; y < h; y++)
    for (let i = 0; i < w; i++) {
      const k = y * w + i
      const v = dark ? 1 - g[k] : g[k]
      const c = v > BAYER[(y & 3) * 4 + (i & 3)] ? hi : lo
      d[k * 4] = c[0]
      d[k * 4 + 1] = c[1]
      d[k * 4 + 2] = c[2]
      d[k * 4 + 3] = 255
    }
  x.putImageData(im, 0, 0)
}
