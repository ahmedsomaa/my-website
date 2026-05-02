export const PROFILE = {
  name: "Ahmed Ismail",
  handle: "som3aware",
  location: "Tanta, Egypt",
  yearsOfExperience: 7,
  email: "hello@som3aware.dev",
  resumeUrl: "#",
};

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
    detail: "Architecting product surfaces with a focus on typography systems, design tokens, and DX.",
  },
  {
    year: "2021 — 2023",
    title: "Software Engineer",
    org: "Nodogoro",
    kind: "experience",
    detail: "Shipped end-to-end features across web platforms, owning quality from API to pixel.",
  },
  {
    year: "2019 — 2021",
    title: "Software Engineer",
    org: "New Smart Egypt",
    kind: "experience",
    detail: "Built internal tools, dashboards, and integrations with a strong eye for the small things.",
  },
  {
    year: "2017 — 2019",
    title: "Software Engineer",
    org: "VOIS (Vodafone Intelligent Solutions)",
    kind: "experience",
    detail: "Worked on enterprise-scale services and observability across distributed systems.",
  },
  {
    year: "2020 — 2023",
    title: "Master’s in Software Engineering",
    org: "Tanta University",
    kind: "education",
    detail: "Thesis-track research focused on developer experience and human-centric tooling.",
  },
  {
    year: "2013 — 2018",
    title: "Bachelor’s in Computer Engineering",
    org: "Tanta University",
    kind: "education",
    detail: "Foundations in systems, algorithms, networks, and embedded design.",
  },
];

export const INTERESTS = [
  "History — late antiquity & medieval cartography",
  "Technical research & long-form documentation",
  "Typography & monospaced typesetting",
  "Mechanical keyboards & input devices",
  "Open-source tooling for developers",
];

export interface Project {
  id: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  url?: string;
  status: "shipped" | "wip" | "archived";
}

export const PROJECTS: Project[] = [
  {
    id: "p01",
    title: "Atlas",
    year: "2025",
    role: "Design Engineer",
    stack: ["React", "TypeScript", "Tailwind", "Vite"],
    summary: "Visual planning tool for distributed teams. Built around keyboard primitives and a strict grid system.",
    status: "shipped",
  },
  {
    id: "p02",
    title: "Hairline",
    year: "2024",
    role: "Founder / Engineer",
    stack: ["Next-style routing", "tRPC", "Postgres"],
    summary: "A monospaced writing surface for engineers — outline, draft, and ship long-form documents.",
    status: "shipped",
  },
  {
    id: "p03",
    title: "Blueprint UI",
    year: "2024",
    role: "Maintainer",
    stack: ["React", "Radix", "CSS Variables"],
    summary: "An open component library tuned for technical interfaces — terminals, dashboards, and IDE panels.",
    status: "shipped",
  },
  {
    id: "p04",
    title: "Som3a CLI",
    year: "2023",
    role: "Author",
    stack: ["Node", "TypeScript", "Ink"],
    summary: "A command-line companion for managing notes, todos, and reading queues — entirely offline.",
    status: "shipped",
  },
  {
    id: "p05",
    title: "Cartograph",
    year: "2023",
    role: "Engineer",
    stack: ["WebGL", "MapLibre", "TS"],
    summary: "Historical mapping experiment overlaying medieval routes onto modern geographies.",
    status: "wip",
  },
  {
    id: "p06",
    title: "Voltage",
    year: "2022",
    role: "Engineer",
    stack: ["React Native", "Rust"],
    summary: "Mobile control surface for hardware experiments. Archived after the prototype phase.",
    status: "archived",
  },
];