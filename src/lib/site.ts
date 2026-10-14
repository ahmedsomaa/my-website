/** Canonical origin. Set `VITE_SITE_URL` in the deploy environment (no trailing slash). */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  'https://som3aware.netlify.app'
).replace(/\/$/, '')

export const SITE_NAME = 'Som3aware'
export const DEFAULT_OG_IMAGE = '/og-bg.png'

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

interface SeoInput {
  title: string
  description: string
  /** Pathname including leading slash, e.g. `/work/hivo`. */
  path: string
  /** Site-relative or absolute image URL. */
  image?: string
}

/** Per-route head: title, description, canonical and social tags that all agree. */
export function seo({ title, description, path, image }: SeoInput) {
  const url = absoluteUrl(path)
  const img = absoluteUrl(image ?? DEFAULT_OG_IMAGE)
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: img },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: img },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export const HOME_TITLE = 'Ahmed Ismail - Software Engineer'
export const HOME_DESCRIPTION =
  'Turning complex ideas into intuitive digital experiences ✨'
