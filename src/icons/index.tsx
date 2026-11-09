/*
 * Brand icons next to tech and social names. Simple Icons (CC0) first, Devicon for the brands Simple
 * Icons dropped. An icon is decoration beside the word, never instead of it, so it is aria-hidden.
 */
import {
  siAngular,
  siAppstore,
  siAuth0,
  siCelery,
  siCss,
  siCursor,
  siDjango,
  siDotnet,
  siExpo,
  siExpress,
  siFastapi,
  siFfmpeg,
  siFigma,
  siFrontendmentor,
  siGithub,
  siGithubactions,
  siGmail,
  siGooglecloud,
  siHashnode,
  siHotjar,
  siJavascript,
  siLangchain,
  siMixpanel,
  siMongodb,
  siMysql,
  siNestjs,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShadcnui,
  siSharp,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siVercel,
  siX,
} from 'simple-icons'
import { DEVICON } from './devicon'

interface Glyph {
  path: string
  viewBox: string
}
const si = (i: { path: string }): Glyph => ({
  path: i.path,
  viewBox: '0 0 24 24',
})

/** Lower-case name as written on the site → icon. */
const ICONS: Record<string, Glyph> = {
  react: si(siReact),
  'react native': si(siReact),
  typescript: si(siTypescript),
  javascript: si(siJavascript),
  'next.js': si(siNextdotjs),
  'node.js': si(siNodedotjs),
  express: si(siExpress),
  postgresql: si(siPostgresql),
  expo: si(siExpo),
  eas: si(siExpo),
  'github actions': si(siGithubactions),
  gcp: si(siGooglecloud),
  'cloud run': si(siGooglecloud),
  'cloud sql': si(siGooglecloud),
  celery: si(siCelery),
  redis: si(siRedis),
  mixpanel: si(siMixpanel),
  hotjar: si(siHotjar),
  'modern css': si(siCss),
  'tailwind css': si(siTailwindcss),
  'shadcn/ui': si(siShadcnui),
  svelte: si(siSvelte),
  python: si(siPython),
  fastapi: si(siFastapi),
  django: si(siDjango),
  '.net core': si(siDotnet),
  mongodb: si(siMongodb),
  mysql: si(siMysql),
  nestjs: si(siNestjs),
  netlify: si(siNetlify),
  vercel: si(siVercel),
  langchain: si(siLangchain),
  ffmpeg: si(siFfmpeg),
  sharp: si(siSharp),
  auth0: si(siAuth0),
  angular: si(siAngular),
  cursor: si(siCursor),
  figma: si(siFigma),
  aws: DEVICON.amazonwebservices,
  azure: DEVICON.azure,
  dynamodb: DEVICON.dynamodb,
  'sql server': DEVICON.microsoftsqlserver,
  // places
  github: si(siGithub),
  linkedin: DEVICON.linkedin,
  x: si(siX),
  hashnode: si(siHashnode),
  'frontend mentor': si(siFrontendmentor),
  email: si(siGmail),
  'app store': si(siAppstore),
}

export const hasIcon = (name: string) => name.toLowerCase() in ICONS

/** The icon for a name, in a 2.5-cell slot: icon plus a small gap before the word. */
export function Icon({ name }: { name: string }) {
  const g = ICONS[name.toLowerCase()] as Glyph | undefined
  if (!g) return null
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-[2.5ch] shrink-0 indent-0 align-[-0.15em]"
    >
      <svg viewBox={g.viewBox} className="size-[1em] fill-current">
        <path d={g.path} />
      </svg>
    </span>
  )
}
