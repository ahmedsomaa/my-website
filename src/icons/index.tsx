/*
 * Brand icons next to tech and social names. Simple Icons (CC0) first, Devicon for the brands Simple
 * Icons dropped. An icon is decoration beside the word, never instead of it, so it is aria-hidden.
 */
import {
  siApple,
  siBruno,
  siClaude,
  siCloudflare,
  siDatagrip,
  siDbeaver,
  siFedora,
  siFirefox,
  siGooglechrome,
  siLinuxmint,
  siMapbox,
  siRedux,
  siSst,
  siUbuntu,
  siVite,
  siWarp,
  siZorin,
  siZedindustries,
  siZenbrowser,
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
  siTanstack,
  siTypescript,
  siVercel,
  siX,
} from 'simple-icons'
import { DEVICON, OPENAI } from './devicon'

interface Glyph {
  /** vector icon, drawn in the text colour */
  path?: string
  viewBox?: string
  /** or a small multi-colour logo image (public/icons), for brands with no vector icon */
  img?: string
  /** official brand colour, hex without '#' */
  hex: string
}
const si = (i: { path: string; hex: string }): Glyph => ({
  path: i.path,
  viewBox: '0 0 24 24',
  hex: i.hex,
})
/** Devicon glyphs carry no colour; these are the brands' official ones. */
const dev = (g: { path: string; viewBox: string }, hex: string): Glyph => ({
  ...g,
  hex,
})
/** A logo taken from the product's own site, in public/icons. */
const logo = (file: string, hex: string): Glyph => ({
  img: `/icons/${file}`,
  hex,
})

/** Lower-case name as written on the site → icon. */
const ICONS: Record<string, Glyph> = {
  react: si(siReact),
  'react native': si(siReact),
  typescript: si(siTypescript),
  javascript: si(siJavascript),
  'next.js': si(siNextdotjs),
  'tanstack start': si(siTanstack),
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
  aws: dev(DEVICON.amazonwebservices, 'FF9900'),
  azure: dev(DEVICON.azure, '0078D4'),
  dynamodb: dev(DEVICON.dynamodb, '4053D6'),
  'sql server': dev(DEVICON.microsoftsqlserver, 'CC2927'),
  // tools
  vite: si(siVite),
  redux: si(siRedux),
  'mapbox gl': si(siMapbox),
  sst: si(siSst),
  cloudflare: si(siCloudflare),
  warp: si(siWarp),
  firefox: si(siFirefox),
  chrome: si(siGooglechrome),
  bruno: si(siBruno),
  datagrip: si(siDatagrip),
  dbeaver: si(siDbeaver),
  'claude code': si(siClaude),
  macbook: si(siApple),
  fedora: si(siFedora),
  'linux mint': si(siLinuxmint),
  'zorin os': si(siZorin),
  ubuntu: si(siUbuntu),
  zed: si(siZedindustries),
  'zen browser': si(siZenbrowser),
  'vs code': dev(DEVICON.vscode, '007ACC'),
  openai: dev(OPENAI, '412991'),
  livecodes: logo('livecodes.png', '5BBAD5'),
  paper: logo('paper.png', '6A9BE8'),
  tinycast: logo('tinycast.svg', '863BFF'),
  bettershot: logo('bettershot.png', '7B4DFF'),
  macusb: logo('macusb.png', '222222'),
  'dbstudio.sh': logo('dbstudio.png', '222222'),
  pinecone: logo('pinecone.png', '000000'),
  segment: logo('segment.png', '52BD94'),
  // places
  github: si(siGithub),
  linkedin: dev(DEVICON.linkedin, '0A66C2'),
  x: si(siX),
  hashnode: si(siHashnode),
  'frontend mentor': si(siFrontendmentor),
  email: si(siGmail),
  'app store': si(siAppstore),
}

export const hasIcon = (name: string) => name.toLowerCase() in ICONS

/** The brand's official colour (hex without '#'), if the name has an icon. */
export const brandHex = (name: string): string | undefined =>
  (ICONS[name.toLowerCase()] as Glyph | undefined)?.hex

/** The icon for a name, in a 2.5-cell slot: icon plus a small gap before the word. */
export function Icon({ name }: { name: string }) {
  const g = ICONS[name.toLowerCase()] as Glyph | undefined
  if (!g) return null
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-[2.5ch] shrink-0 indent-0 align-[-0.15em]"
    >
      {g.img ? (
        <img src={g.img} alt="" className="size-[1em] rounded-[2px]" />
      ) : (
        <svg viewBox={g.viewBox} className="size-[1em] fill-current">
          <path d={g.path} />
        </svg>
      )}
    </span>
  )
}
