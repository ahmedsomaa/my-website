export const PROFILE = {
  name: "Ahmed Ismail",
  handle: "som3aware",
  location: "Tanta, Egypt",
  yearsOfExperience: 7,
  email: "hello@som3aware.dev",
  resumeUrl: "#",
  hashnodeHost: "som3aware.hashnode.dev",
  /** Update if your LinkedIn slug differs */
  githubUrl: "https://github.com/som3aware",
  linkedInUrl: "https://www.linkedin.com/in/som3aware",
  /** Optional: Calendly / TidyCal for intro calls */
  calendlyUrl: "#",
  /** Set when you have a public status page (UptimeRobot, etc.) */
  apiStatusUrl: "",
};

export const BUILD_FLOW = [
  { layer: "Database", tech: "PostgreSQL" },
  { layer: "Server", tech: "Node · tRPC · TypeScript" },
  { layer: "Client", tech: "React · TypeScript · Tailwind" },
  { layer: "Shipping", tech: "Vite · container-ready deploys" },
] as const;

export const METRICS = [
  "Reduced API response time by ~40% on a document sync path using lean queries and targeted caching.",
  "Built and reviewed auth/session flows scoped for five-figure concurrent users in production designs.",
] as const;

export const ABOUT_CONTENT = {
  philosophy:
    "I believe the database is the source of truth, and the UI is a disciplined question-asker. I design systems so contracts between layers stay explicit, testable, and observable.",
  mistake:
    "I once over-cached mutable dashboard aggregates and shipped stale numbers to clients. The fix was tighter row-level truth in Postgres, shorter cache TTLs, and version tokens on API responses — a useful lesson that “fast” without correctness compounds debt.",
  collaboration:
    "I work best with small PRs, documented API surfaces (OpenAPI-style where it helps), and changelogs for anything another team integrates against.",
} as const;

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
  kind: "education" | "experience";
  detail: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2023 — present",
    title: "Senior Software Engineer",
    org: "Eignspaces",
    kind: "experience",
    detail:
      "Architecting product surfaces with a focus on typography systems, design tokens, and DX.",
  },
  {
    year: "2021 — 2023",
    title: "Software Engineer",
    org: "Nodogoro",
    kind: "experience",
    detail:
      "Shipped end-to-end features across web platforms, owning quality from API to pixel.",
  },
  {
    year: "2019 — 2021",
    title: "Software Engineer",
    org: "New Smart Egypt",
    kind: "experience",
    detail:
      "Built internal tools, dashboards, and integrations with a strong eye for the small things.",
  },
  {
    year: "2017 — 2019",
    title: "Software Engineer",
    org: "VOIS (Vodafone Intelligent Solutions)",
    kind: "experience",
    detail:
      "Worked on enterprise-scale services and observability across distributed systems.",
  },
  {
    year: "2020 — 2023",
    title: "Master’s in Software Engineering",
    org: "Tanta University",
    kind: "education",
    detail:
      "Thesis-track research focused on developer experience and human-centric tooling.",
  },
  {
    year: "2013 — 2018",
    title: "Bachelor’s in Computer Engineering",
    org: "Tanta University",
    kind: "education",
    detail:
      "Foundations in systems, algorithms, networks, and embedded design.",
  },
];

export const INTERESTS = [
  "History — late antiquity & medieval cartography",
  "Technical research & long-form documentation",
  "Typography & monospaced typesetting",
  "Mechanical keyboards & input devices",
  "Open-source tooling for developers",
];

/** Canonical copy for home / work listings (matches project cards elsewhere). */
export interface PortfolioProject {
  id: string;
  featured: boolean;
  title: string;
  url: string;
  description: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    featured: true,
    title: "Reconciled",
    url: "https://reconciled.io",
    description: "A reverse invoice management platform for staffing agencies",
  },
  {
    id: "2",
    featured: true,
    title: "Editor Setup",
    url: "https://editorsetup.netlify.app/",
    description: "Find your next optimal VS Code Setup",
  },
  {
    id: "3",
    featured: true,
    title: "Sharp Studio",
    url: "https://sharpstudio.netlify.app/",
    description: "Hackable image processing",
  },
  {
    id: "4",
    featured: true,
    title: "Open Trivia",
    url: "https://open-trivia-demo.netlify.app/",
    description: "Multi-round trivia game built with Open Trivia API",
  },
  {
    id: "5",
    featured: false,
    title: "Face AI",
    url: "https://face-ai.surge.sh/",
    description: "Detect face expressions, age, and gender",
  },
  {
    id: "6",
    featured: false,
    title: "Covid Tracker",
    url: "https://github.com/ahmedsomaa/covid-tracker/",
    description: "An app to track covid patients built with Node, React & Auth0",
  },
  {
    id: "7",
    featured: false,
    title: "Storefront API",
    url: "https://github.com/ahmedsomaa/storefront-api",
    description: "A node API for a store built with Typescript & PostgreSQL",
  },
];

