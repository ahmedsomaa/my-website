/* Everything the site says. The plain page and the workspace both render from this. */
import type { ReactNode } from 'react'
import {
  A,
  Branches,
  Cta,
  Dash,
  H,
  Hello,
  Hero,
  Kv,
  Lead,
  LinkBtn,
  Lv,
  P,
  Panel,
  Principles,
  Quote,
  Quotes,
  Sec,
  Shots,
  Skills,
  Small,
  Stats,
  Ul,
  WorkList,
} from '#/components/content'
import { CV, EMAIL } from '#/lib/view'
import { Icon } from '#/icons'
import { Changelog } from './changelog'

export type Layout = 'dash' | 'table' | 'graph' | 'single'

export interface Item {
  /** list label and reading-pane title */
  key: string
  slug: string
  meta?: string
  /** work table columns */
  group?: string
  role?: string
  result?: string
  /** experience graph: the current job */
  now?: boolean
  /** what `c` copies */
  copy?: string
  body: ReactNode
}

export interface Tab {
  id: string
  layout: Layout
  items: Array<Item>
}

export const isSingle = (t: Tab) => t.layout === 'single' || t.layout === 'dash'

const MAIL = `mailto:${EMAIL}`
const Eign = () => <a href="#/experience/eignspaces">Eignspaces</a>

const JOSH: [ReactNode, string] = [
  '“Ahmed helped prove our product was technically feasible. He ramped fast, asked smart questions, and delivered with clarity and reliability.”',
  'Josh Zack · Co-Founder @ Reconciled',
]
const BROCK: [ReactNode, string] = [
  '“Thoughtful, detail-oriented, and impactful. Ahmed consistently improved the product and brought strong execution to every challenge.”',
  'Brock Rumer · Product & Design @ Reconciled',
]

const index: Tab = {
  id: 'index',
  layout: 'dash',
  items: [
    {
      key: 'index',
      slug: 'readme',
      copy: EMAIL,
      body: (
        <Dash>
          <Panel title="whoami" area="who" center>
            <Hello>Hello, I'm</Hello>
            <Hero>Ahmed Abu Qahf</Hero>
            <Lead>Full-stack engineer. Product-minded. Design-driven.</Lead>
            <P>
              I build digital products end to end, combining engineering depth
              with a strong eye for interfaces and user experience.
            </P>
            <Kv
              rows={[
                [
                  'role',
                  <>
                    Senior Full-stack Engineer @{' '}
                    <a href="#/experience/cypienta">Cypienta</a>
                  </>,
                ],
                ['based', 'Tanta, Egypt · remote'],
              ]}
            />
            <Cta>
              <LinkBtn href="#/projects">view projects</LinkBtn>
              <LinkBtn alt href={CV}>
                cv ↗
              </LinkBtn>
              <LinkBtn alt href={MAIL}>
                get in touch ↗
              </LinkBtn>
            </Cta>
          </Panel>

          <Panel title="stats" area="num">
            <Stats
              two
              items={[
                ['7+ yrs', 'shipping products'],
                ['10+', 'products'],
                ['5', 'organizations'],
                [
                  '2 degrees',
                  'MSE Software Eng. (ASU)\nBSc Computer Eng. (AUC)',
                ],
              ]}
            />
          </Panel>

          <Panel title="featured projects" area="work">
            <WorkList
              rows={[
                {
                  slug: 'stayro',
                  name: 'Stayro',
                  years: '2025–26',
                  what: 'guest + host apps, Saudi Arabia',
                  result: 'led a team of 2',
                },
                {
                  slug: 'hivo',
                  name: 'Hivo',
                  years: '2025–26',
                  what: 'rental marketplace, Saudi Arabia',
                  result: '★ 5.0 · 800+ listings',
                },
                {
                  slug: 'reconciled',
                  name: 'Reconciled',
                  years: '2024–25',
                  what: 'invoice reconciliation',
                  result: 'acquired by LaborEdge',
                },
              ]}
            />
            <Small>
              <a href="#/projects">→ all 9 projects</a>
            </Small>
          </Panel>

          <Panel title="testimonials" area="kind">
            <Quotes>
              <Quote small by={JOSH[1]}>
                {JOSH[0]}
              </Quote>
              <Quote small by={BROCK[1]}>
                {BROCK[0]}
              </Quote>
            </Quotes>
            <Small>
              <a href="#/projects/reconciled">→ the Reconciled story</a>
            </Small>
          </Panel>

          <Panel title="connect" area="con">
            <p className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <span className="text-lg text-fg">
                Let's build something thoughtful.
              </span>
              <span>
                <span className="text-muted">email </span>
                <a href={MAIL}>
                  <Icon name="email" />
                  {EMAIL}
                </a>{' '}
                <kbd>c</kbd>
              </span>
              <span>
                <span className="text-muted">cv </span>
                <A href={CV}>download ↗</A>
              </span>
              <a href="#/contact" className="text-sm">
                → all contact
              </a>
            </p>
          </Panel>
        </Dash>
      ),
    },
  ],
}

const work: Tab = {
  id: 'projects',
  layout: 'table',
  items: [
    {
      key: 'Stayro',
      slug: 'stayro',
      meta: '2025–26',
      group: 'featured',
      role: 'lead · mobile',
      result: 'KSA integrations live',
      body: (
        <>
          <H>Stayro</H>
          <Lead>Guest and host mobile apps for stays in Saudi Arabia.</Lead>
          <Stats
            items={[
              ['2 apps', 'guest + host'],
              ['team of 2', 'that I led'],
              ['3', 'national integrations'],
            ]}
          />
          <Kv
            rows={[
              ['role', 'engineering lead, mobile and infra'],
              [
                'where',
                <>
                  <Eign /> · 2025–26
                </>,
              ],
              [
                'stack',
                'React Native · Expo · EAS · GitHub Actions · GCP · Celery · Redis',
              ],
            ]}
          />
          <Sec>contributions</Sec>
          <Ul
            items={[
              'led two developers to refine, debug and scale both apps',
              'integrated Nafath national identity, Ministry of Tourism compliance and secure payments',
              'built CI/CD with GitHub Actions and EAS, so builds go straight to the App Store',
              'set up GCP: Cloud Run, Cloud SQL and Redis behind an async Celery backend',
            ]}
          />
        </>
      ),
    },
    {
      key: 'Hivo',
      slug: 'hivo',
      meta: '2025–26',
      group: 'featured',
      role: 'full-stack',
      result: '★ 5.0 · 800+ listings',
      copy: 'https://apps.apple.com/us/app/hivo-%D9%87%D9%8A%DA%A4%D9%88/id6757620973',
      body: (
        <>
          <H>Hivo</H>
          <Lead>Mobile-first rental marketplace for Saudi Arabia.</Lead>
          <Stats
            items={[
              ['★ 5.0', 'App Store rating'],
              ['800+', 'listings after host launch'],
              ['paced', 'host onboarding, from demand'],
            ]}
          />
          <Kv
            rows={[
              ['role', 'full-stack · unit management system · mentor'],
              [
                'where',
                <>
                  <Eign /> · 2025–26
                </>,
              ],
              ['stack', 'React Native · Expo · Node.js · PostgreSQL'],
            ]}
          />
          <Shots
            kind="phone"
            shots={[
              {
                src: '/shots/hivo-1.jpg',
                alt: 'Hivo App Store screenshot: Your home is wherever you are',
                width: 460,
                height: 998,
              },
              {
                src: '/shots/hivo-2.jpg',
                alt: 'Hivo App Store screenshot',
                width: 460,
                height: 998,
              },
              {
                src: '/shots/hivo-3.jpg',
                alt: 'Hivo App Store screenshot',
                width: 460,
                height: 998,
              },
            ]}
          />
          <Sec>context</Sec>
          <P>
            Global booking platforms lacked cultural relevance, trust signals
            and smooth bilingual flows for Saudi travelers and hosts. Hivo
            answers with localized discovery, bilingual flows, secure payments
            and fast booking.
          </P>
          <Sec>contributions</Sec>
          <Ul
            items={[
              'owned the unit management system and core marketplace screens, end to end',
              'worked closely with project managers and designers on pixel-perfect UI',
              'mentored interns on React Native and Expo',
              'brought AI-assisted workflows with Cursor to the team',
            ]}
          />
          <LinkBtn href="https://apps.apple.com/us/app/hivo-%D9%87%D9%8A%DA%A4%D9%88/id6757620973">
            App Store ↗
          </LinkBtn>
        </>
      ),
    },
    {
      key: 'Reconciled',
      slug: 'reconciled',
      meta: '2024–25',
      group: 'featured',
      role: 'frontend lead',
      result: 'acquired by LaborEdge',
      copy: 'https://www.reconciled.io/',
      body: (
        <>
          <H>Reconciled</H>
          <Lead>Invoice reconciliation platform for staffing agencies.</Lead>
          <Stats
            items={[
              ['acquired', 'by LaborEdge, as the flagship'],
              ['−40%', 'technical debt'],
              ['6', 'countries on the team'],
            ]}
          />
          <Kv
            rows={[
              ['role', 'frontend systems · analytics · UI/UX gaps'],
              [
                'where',
                <>
                  <Eign />, with Herwin Software · 2024–25
                </>,
              ],
              [
                'stack',
                'React · Next.js · Node.js · PostgreSQL · Segment · Mixpanel · Hotjar',
              ],
            ]}
          />
          <Shots
            kind="wide"
            shots={[
              {
                src: '/shots/reconciled.png',
                alt: 'Reconciled reconciliation screen: invoices by week with VMS and facility filters',
                width: 1080,
                height: 300,
              },
            ]}
          />
          <Sec>context</Sec>
          <P>
            Manual invoice reconciliation across VMS systems caused errors,
            delays and lost revenue. Reconciled automates invoice matching,
            flags discrepancies and streamlines the whole process.
          </P>
          <Sec>contributions</Sec>
          <Ul
            items={[
              'built scalable React components from Figma, for a more consistent UI',
              'set up product analytics with Segment, Mixpanel and Hotjar',
              'refactored steadily to cut technical debt by 40%',
              'shipped business features directly with the CFO and engineering leadership',
              'mentored juniors and interns on React, Next.js and design patterns',
            ]}
          />
          <Sec>what they said</Sec>
          <Quote by={JOSH[1]}>{JOSH[0]}</Quote>
          <Quote by={BROCK[1]}>{BROCK[0]}</Quote>
          <LinkBtn href="https://www.reconciled.io/">reconciled.io ↗</LinkBtn>
        </>
      ),
    },
    {
      key: 'Outlined AI',
      slug: 'outlined-ai',
      meta: '2023',
      group: 'other work',
      role: 'lead',
      result: 'audio + video → notes',
      body: (
        <>
          <H>Outlined AI</H>
          <Lead>
            AI mobile app that turns audio and video into structured notes.
          </Lead>
          <Stats
            items={[
              ['4', 'outputs: transcript, summary, notes, questions'],
              ['lead', 'end to end'],
            ]}
          />
          <Kv
            rows={[
              ['role', 'development lead'],
              [
                'where',
                <>
                  <a href="#/experience/nodogoro">Nodogoro</a> · 2023
                </>,
              ],
              ['stack', 'React Native · Node.js · OpenAI · Whisper · FFmpeg'],
            ]}
          />
          <Sec>context</Sec>
          <P>
            Getting insights out of audio and video is slow. Outlined AI
            extracts the transcript, then gives you a summary, notes and the
            common questions, in one mobile app.
          </P>
        </>
      ),
    },
    {
      key: 'Sharp Studio',
      slug: 'sharp-studio',
      meta: '2024',
      group: 'other work',
      role: 'solo',
      result: 'configurable pipelines',
      copy: 'https://sharpstudio.netlify.app/',
      body: (
        <>
          <H>Sharp Studio</H>
          <Lead>Hackable image processing: convert, resize and compress.</Lead>
          <Stats
            items={[
              ['solo', 'design to deploy'],
              ['pipelines', 'you configure'],
            ]}
          />
          <Kv rows={[['stack', 'React · Node.js · TypeScript · Sharp']]} />
          <Sec>context</Sec>
          <P>
            Existing image tools are rigid and hard to customize. Sharp Studio
            is a web tool with configurable pipelines, many formats and precise
            control over output.
          </P>
          <LinkBtn href="https://sharpstudio.netlify.app/">
            sharpstudio.netlify.app ↗
          </LinkBtn>
          <LinkBtn alt href="https://github.com/ahmedsomaa/sharp-studio">
            source ↗
          </LinkBtn>
        </>
      ),
    },
    {
      key: 'Editor Setup',
      slug: 'editor-setup',
      meta: '2025',
      group: 'other work',
      role: 'solo',
      result: '8 pairings · open source',
      copy: 'https://editorsetup.som3aware.workers.dev/',
      body: (
        <>
          <H>Editor Setup</H>
          <Lead>Curated VS Code font and theme pairings.</Lead>
          <Stats
            items={[
              ['8', 'hand-picked pairings'],
              ['solo', 'design to deploy'],
              ['static', 'near-zero latency'],
            ]}
          />
          <Kv rows={[['stack', 'Next.js · React · TypeScript · Netlify']]} />
          <Sec>context</Sec>
          <P>
            Developers spend hours on Reddit, blogs and GitHub looking for a
            theme and font that work together. Editor Setup gives 8 pairings,
            each with a code preview and one-click install links.
          </P>
          <Quote by="community feedback">
            “Finally, someone paired JetBrains Mono with One Dark Pro — looks
            amazing”
          </Quote>
          <LinkBtn href="https://editorsetup.som3aware.workers.dev/">
            editorsetup.som3aware.workers.dev ↗
          </LinkBtn>
          <LinkBtn alt href="https://github.com/ahmedsomaa/editor-setup">
            source ↗
          </LinkBtn>
        </>
      ),
    },
    {
      key: 'Open Trivia',
      slug: 'open-trivia',
      meta: '2024',
      group: 'archive',
      role: 'solo',
      result: 'trivia game',
      copy: 'https://github.com/ahmedsomaa/open-trivia',
      body: (
        <>
          <H>Open Trivia</H>
          <Lead>Multi-round trivia game on the Open Trivia API.</Lead>
          <Kv rows={[['stack', 'React · TypeScript']]} />
          <P>A small project to practice game state and API integration.</P>
          <LinkBtn alt href="https://github.com/ahmedsomaa/open-trivia">
            source ↗
          </LinkBtn>
        </>
      ),
    },
    {
      key: 'Covid Tracker',
      slug: 'covid-tracker',
      meta: '2023',
      group: 'archive',
      role: 'solo',
      result: 'patient tracking',
      copy: 'https://github.com/ahmedsomaa/covid-tracker',
      body: (
        <>
          <H>Covid Tracker</H>
          <Lead>App to track COVID patients.</Lead>
          <Kv rows={[['stack', 'React · Node.js · Auth0']]} />
          <P>Patient tracking behind a simple, authenticated interface.</P>
          <LinkBtn alt href="https://github.com/ahmedsomaa/covid-tracker">
            source ↗
          </LinkBtn>
        </>
      ),
    },
    {
      key: 'Storefront API',
      slug: 'storefront-api',
      meta: '2022',
      group: 'archive',
      role: 'solo',
      result: 'typed store API',
      copy: 'https://github.com/ahmedsomaa/storefront-api',
      body: (
        <>
          <H>Storefront API</H>
          <Lead>Node API for a store.</Lead>
          <Kv rows={[['stack', 'Node.js · TypeScript · PostgreSQL']]} />
          <P>A store backend with typed models and a relational database.</P>
          <LinkBtn alt href="https://github.com/ahmedsomaa/storefront-api">
            source ↗
          </LinkBtn>
        </>
      ),
    },
  ],
}

const role = (r: string, dates: string, where: string) => (
  <Kv
    rows={[
      ['role', r],
      ['dates', dates],
      ['where', where],
    ]}
  />
)

const experience: Tab = {
  id: 'experience',
  layout: 'graph',
  items: [
    {
      key: 'Cypienta',
      slug: 'cypienta',
      meta: '2026–',
      now: true,
      copy: 'https://cypienta.com',
      body: (
        <>
          <H>Cypienta</H>
          {role('Senior Full-stack Engineer', '2026 – present', 'remote')}
          <Sec>product</Sec>
          <Branches
            items={[
              <>
                <b className="font-medium text-fg">Cypienta</b>: a security data
                platform that condenses and contextualizes telemetry, grouping
                related events, logs and alerts before they reach SIEM, SOAR and
                AI tools
              </>,
            ]}
          />
          <LinkBtn href="https://cypienta.com">cypienta.com ↗</LinkBtn>
        </>
      ),
    },
    {
      key: 'Eignspaces',
      slug: 'eignspaces',
      meta: '2024–26',
      body: (
        <>
          <H>Eignspaces</H>
          {role('Growth Engineer', 'Jan 2024 – 2026', 'remote')}
          <Sec>products</Sec>
          <Branches
            items={[
              <>
                <a href="#/projects/reconciled">Reconciled</a>: invoice
                reconciliation, acquired by LaborEdge
              </>,
              <>
                <a href="#/projects/hivo">Hivo</a>: rental marketplace for Saudi
                Arabia
              </>,
              <>
                <a href="#/projects/stayro">Stayro</a>: guest and host apps
              </>,
            ]}
          />
          <Sec>what I did</Sec>
          <Ul
            items={[
              'led a team of two on Stayro',
              'mentored interns',
              'introduced Cursor-based AI workflows',
              'worked with teams in the USA, Egypt, Mexico, Argentina, Kenya and Sweden',
            ]}
          />
        </>
      ),
    },
    {
      key: 'Nodogoro',
      slug: 'nodogoro',
      meta: '2023',
      body: (
        <>
          <H>Nodogoro</H>
          {role('Software Engineer II', 'May – Dec 2023', 'remote')}
          <Sec>products</Sec>
          <Branches
            items={[
              <>
                <a href="#/projects/outlined-ai">Outlined AI</a>: audio and
                video into structured notes
              </>,
              'ads analyzer: turns feedback on image ads into creative briefs (Next.js, GPT-4 Vision)',
              'Slack bot: answers across Drive, Gmail, Calendar, ClickUp and Fireflies (LangChain, Pinecone)',
              'resume screening tool',
              'price-matching scrapers across online stores (Python, Selenium)',
            ]}
          />
          <Sec>what I did</Sec>
          <Ul
            items={[
              'led development of Outlined AI',
              'built the ads analyzer, the Slack bot and the scrapers',
              'built the resume screening tool at the NodoAI hackathon',
            ]}
          />
        </>
      ),
    },
    {
      key: 'New Smart Egypt',
      slug: 'new-smart-egypt',
      meta: '2021–23',
      body: (
        <>
          <H>New Smart Egypt</H>
          {role(
            'Software Engineer I',
            'Nov 2021 – May 2023',
            'Nasr City, Cairo',
          )}
          <Sec>products</Sec>
          <Branches
            items={[
              'ECARD: an Android app for the Egyptian Company for Agricultural and Rural Development',
              "ad server dashboard for Ramses Station's free Wi-Fi portal",
              'face attendance app',
              'Odoo attendance with ZKTeco fingerprint scanners',
            ]}
          />
          <Sec>what I did</Sec>
          <Ul
            items={[
              'deployed ECARD end to end on the Etisalat cloud',
              'built the ad server dashboard, plus a faster mobile refactor of the portal',
              'built the face attendance app on face-api.js',
              'wired ZKTeco fingerprint scanners into Odoo attendance',
            ]}
          />
        </>
      ),
    },
    {
      key: 'VOIS',
      slug: 'vois',
      meta: '2020–21',
      body: (
        <>
          <H>VOIS</H>
          {role(
            'Software Engineer',
            'Jul 2020 – Oct 2021',
            'Smart Village, Giza',
          )}
          <Sec>products</Sec>
          <Branches
            items={[
              'call-centre dashboard for agent performance',
              'COVID-19 tracker',
              'employee benefits portal',
              "the company's React component library",
            ]}
          />
          <Sec>what I did</Sec>
          <Ul
            items={[
              'built the call-centre dashboard (React, Redux Toolkit, react-vis)',
              'fixes and API work on the COVID-19 tracker (React, Node.js, Mapbox GL)',
              'features for the benefits portal (Angular, .NET Core)',
              'redesigned the component library',
            ]}
          />
          <P>Joined after internships there in 2018 and 2019.</P>
        </>
      ),
    },
  ],
}

const toolbox: Tab = {
  id: 'toolbox',
  layout: 'single',
  items: [
    {
      key: 'toolbox',
      slug: 'skills',
      body: (
        <>
          <H>Toolbox</H>
          <Lead>
            What I build with, by discipline. Levels are honest:{' '}
            <Lv lv="s">strong</Lv> = shipped in production,{' '}
            <Lv lv="w">working</Lv> = used on real projects,{' '}
            <Lv lv="e">exploring</Lv> = learning now.
          </Lead>
          <Skills
            groups={[
              [
                'frontend engineering',
                [
                  ['s', 'React'],
                  ['s', 'TypeScript'],
                  ['s', 'Next.js'],
                  ['s', 'Modern CSS · Tailwind CSS'],
                  ['s', 'Design systems · shadcn/ui'],
                  ['s', 'UI architecture'],
                  ['w', 'Svelte'],
                ],
              ],
              [
                'mobile engineering',
                [
                  ['s', 'React Native'],
                  ['s', 'Expo · EAS'],
                  ['s', 'Mobile app architecture'],
                ],
              ],
              [
                'backend engineering',
                [
                  ['s', 'Node.js · Express'],
                  ['s', 'REST APIs'],
                  ['s', 'PostgreSQL'],
                  ['w', 'Python · FastAPI · Celery'],
                  ['w', 'Django'],
                  ['w', '.NET Core'],
                  ['w', 'MongoDB · SQL Server · MySQL · DynamoDB · Redis'],
                  ['e', 'NestJS'],
                ],
              ],
              [
                'infrastructure',
                [
                  ['s', 'CI/CD · GitHub Actions'],
                  ['s', 'GCP · Cloud Run · Cloud SQL'],
                  ['w', 'AWS · Azure'],
                  ['w', 'Netlify · Vercel'],
                  ['w', 'Product analytics · Segment · Mixpanel · Hotjar'],
                ],
              ],
              [
                'ai',
                [
                  ['s', 'LLM APIs · OpenAI'],
                  ['s', 'AI-powered product workflows'],
                  ['w', 'LangChain · Pinecone'],
                  ['w', 'Whisper · FFmpeg'],
                  ['e', 'Spec-driven development'],
                  ['e', 'Skills for AI agents'],
                ],
              ],
            ]}
          />
        </>
      ),
    },
  ],
}

const about: Tab = {
  id: 'about',
  layout: 'single',
  items: [
    {
      key: 'about',
      slug: 'me',
      body: (
        <>
          <H>About</H>
          <Lead>
            Full-stack engineer in Tanta, Egypt, with 7+ years building
            single-page apps, mobile apps and RESTful APIs.
          </Lead>
          <P>
            I grew up around computers and wrote my first code in preparatory
            school, in Visual Basic .NET. These days I care most about the part
            people touch, and I'm growing toward design engineering. See{' '}
            <a href="#/experience">experience</a> for where, and{' '}
            <a href="#/principles">principles</a> for how.
          </P>

          <Sec id="/about/mentorship">mentorship</Sec>
          <P>
            I mentor junior and mid-level engineers and interns on React, React
            Native, Next.js and design patterns, and I've trained teams on
            AI-assisted workflows with Cursor.
          </P>

          <Sec id="/about/education">education</Sec>
          <Kv
            wide
            rows={[
              [
                '2022–23',
                <>
                  <b>MSE, Software Engineering</b> · Arizona State University ·
                  4.0 GPA · AGFE OLS scholarship
                </>,
              ],
              [
                '2014–19',
                <>
                  <b>BSc, Computer Engineering</b> · The American University in
                  Cairo · Egyptian Public Schools scholarship
                </>,
              ],
              [
                'courses',
                'McKinsey Forward Program (2024) · Udacity Advanced Full-Stack (2022) · Udacity React (2022)',
              ],
              [
                'hackathons',
                'Hajj Hackathon, Jeddah (2018): Kun 3awnan, IoT help for pilgrims · Dell EMC 423x (2019)',
              ],
            ]}
          />

          <Sec id="/about/life">off the clock</Sec>
          <Kv
            wide
            rows={[
              ['reading', 'History, technology and long-form essays.'],
              [
                'writing',
                <>
                  Product decisions and lessons from shipping, on{' '}
                  <A href="https://som3aware.hashnode.dev">Hashnode</A>.
                </>,
              ],
              ['exploring', 'New tools and side projects.'],
              [
                'life',
                'Family and football. Recently married, so learning that renovating an apartment is a very different kind of engineering.',
              ],
            ]}
          />
        </>
      ),
    },
  ],
}

const principles: Tab = {
  id: 'principles',
  layout: 'single',
  items: [
    {
      key: 'principles',
      slug: 'how-i-work',
      body: (
        <>
          <H>How I work</H>
          <Principles
            items={[
              [
                'Simplicity in complexity',
                'Make complex systems feel simple, intuitive, and effortless to use without losing depth.',
              ],
              [
                'Attention to detail',
                'Treat small details as meaningful decisions. They often define the difference between good and great products.',
              ],
              [
                'Interface craftsmanship',
                'Build pixel-perfect interfaces where spacing, structure, and interaction feel intentional and consistent.',
              ],
              [
                'Engineering quality',
                'Balance speed with maintainability. Ship fast without creating fragile systems.',
              ],
              [
                'Writing & knowledge sharing',
                'Share engineering and product thinking through writing, to transfer knowledge and reflect on real-world experience.',
              ],
              [
                'Mentorship & growth',
                'Help junior and mid-level engineers grow through guidance, feedback, and practical engineering insight.',
              ],
            ]}
          />
        </>
      ),
    },
  ],
}

const contact: Tab = {
  id: 'contact',
  layout: 'single',
  items: [
    {
      key: 'contact',
      slug: 'me',
      copy: EMAIL,
      body: (
        <>
          <H>Contact</H>
          <Lead>Let's build something thoughtful.</Lead>
          <P>Email is the fastest way to reach me. I usually reply quickly.</P>
          <Cta>
            <LinkBtn href={MAIL}>{EMAIL} ↗</LinkBtn>
            <LinkBtn alt href={CV}>
              download cv ↗
            </LinkBtn>
          </Cta>
          <Sec>everywhere</Sec>
          <Kv
            wide
            rows={[
              [
                'email',
                <>
                  <a href={MAIL}>
                    <Icon name="email" />
                    {EMAIL}
                  </a>{' '}
                  <kbd>c</kbd> copies it
                </>,
              ],
              [
                'linkedin',
                <A href="https://linkedin.com/in/som3aware">
                  <Icon name="linkedin" />
                  linkedin.com/in/som3aware
                </A>,
              ],
              [
                'github',
                <A href="https://github.com/ahmedsomaa">
                  <Icon name="github" />
                  github.com/ahmedsomaa
                </A>,
              ],
              [
                'x',
                <A href="https://x.com/som3aware">
                  <Icon name="x" />
                  x.com/som3aware
                </A>,
              ],
              [
                'hashnode',
                <A href="https://som3aware.hashnode.dev">
                  <Icon name="hashnode" />
                  som3aware.hashnode.dev
                </A>,
              ],
              [
                'mentor',
                <A href="https://www.frontendmentor.io/profile/ahmedsomaa">
                  <Icon name="frontend mentor" />
                  frontendmentor.io/profile/ahmedsomaa
                </A>,
              ],
              ['cv', <A href={CV}>Ahmed_Abu_Qahf_cv.pdf ↗</A>],
            ]}
          />
        </>
      ),
    },
  ],
}

const changelog: Tab = {
  id: 'changelog',
  layout: 'single',
  items: [{ key: 'changelog', slug: 'log', body: <Changelog /> }],
}

export const TABS: Array<Tab> = [
  index,
  work,
  experience,
  toolbox,
  about,
  principles,
  contact,
  changelog,
]
