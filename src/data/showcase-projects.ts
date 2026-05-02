export interface ShowcaseProject {
  id: string;
  /** Kept for filters / future use; not shown on `/work`. */
  featured: boolean;
  title: string;
  url: string;
  description: string;
  date: string;
  stack: string[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "1",
    featured: true,
    title: "Reconciled",
    url: "https://reconciled.io",
    description: "A reverse invoice management platform for staffing agencies",
    date: "2024",
    stack: ["React", "PostgreSQL", "Node.js"],
  },
  {
    id: "2",
    featured: true,
    title: "Editor Setup",
    url: "https://editorsetup.netlify.app/",
    description: "Find your next optimal VS Code Setup",
    date: "2023",
    stack: ["React", "TypeScript"],
  },
  {
    id: "3",
    featured: true,
    title: "Sharp Studio",
    url: "https://sharpstudio.netlify.app/",
    description: "Hackable image processing",
    date: "2023",
    stack: ["React", "Canvas"],
  },
  {
    id: "4",
    featured: true,
    title: "Open Trivia",
    url: "https://open-trivia-demo.netlify.app/",
    description: "Multi-round trivia game built with Open Trivia API",
    date: "2022",
    stack: ["React", "REST API"],
  },
  {
    id: "5",
    featured: false,
    title: "Face AI",
    url: "https://face-ai.surge.sh/",
    description: "Detect face expressions, age, and gender",
    date: "2020",
    stack: ["React", "TensorFlow.js"],
  },
  {
    id: "6",
    featured: false,
    title: "Konstant Kreative Ad Analyzer",
    url: "https://lead-gen-ai.vercel.app/",
    description: "AI app to analyze image ads using GPT-4 Vision",
    date: "2024",
    stack: ["Next.js", "OpenAI"],
  },
  {
    id: "7",
    featured: false,
    title: "Covid Tracker",
    url: "https://github.com/ahmedsomaa/covid-tracker/",
    description: "An app to track covid patients built with Node, React & Auth0",
    date: "2020",
    stack: ["React", "Node.js", "Auth0"],
  },
  {
    id: "8",
    featured: false,
    title: "Storefront API",
    url: "https://github.com/ahmedsomaa/storefront-api",
    description: "A node API for a store built with Typescript & PostgreSQL",
    date: "2021",
    stack: ["TypeScript", "PostgreSQL", "Express"],
  },
];

export function getAllShowcaseProjects(): ShowcaseProject[] {
  return [...SHOWCASE_PROJECTS].sort((a, b) => Number(a.id) - Number(b.id));
}

export function getFeaturedShowcaseProjects(): ShowcaseProject[] {
  return SHOWCASE_PROJECTS.filter((p) => p.featured).sort((a, b) => Number(a.id) - Number(b.id));
}
