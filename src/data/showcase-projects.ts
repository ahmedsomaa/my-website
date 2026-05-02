import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

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

const SHOWCASE_META: Record<string, { date: string; stack: string[] }> = {
  "1": { date: "2024", stack: ["React", "PostgreSQL", "Node.js"] },
  "2": { date: "2023", stack: ["React", "TypeScript"] },
  "3": { date: "2023", stack: ["React", "Canvas"] },
  "4": { date: "2022", stack: ["React", "REST API"] },
  "5": { date: "2020", stack: ["React", "TensorFlow.js"] },
  "6": { date: "2020", stack: ["React", "Node.js", "Auth0"] },
  "7": { date: "2021", stack: ["TypeScript", "PostgreSQL", "Express"] },
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = PORTFOLIO_PROJECTS.map((p) => {
  const meta = SHOWCASE_META[p.id];
  if (!meta) {
    throw new Error(`showcase-projects: missing SHOWCASE_META for id ${p.id}`);
  }
  return {
    id: p.id,
    featured: p.featured,
    title: p.title,
    url: p.url,
    description: p.description,
    date: meta.date,
    stack: meta.stack,
  };
});

export function getAllShowcaseProjects(): ShowcaseProject[] {
  return [...SHOWCASE_PROJECTS].sort((a, b) => Number(a.id) - Number(b.id));
}

export function getFeaturedShowcaseProjects(): ShowcaseProject[] {
  return SHOWCASE_PROJECTS.filter((p) => p.featured).sort((a, b) => Number(a.id) - Number(b.id));
}
