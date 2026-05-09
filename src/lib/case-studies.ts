import type { CaseStudy } from "@/types/case-study";

const modules = import.meta.glob("../data/case-studies/**/index.json", {
  eager: true,
  import: "default",
}) as Record<string, CaseStudy>;

function allCaseStudies(): CaseStudy[] {
  return Object.values(modules).map((raw) => raw as CaseStudy);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return allCaseStudies().find((c) => c.slug === slug);
}

/** All featured case studies sorted by `order`. Pass `limit` only when you need a cap (e.g. teasers). */
export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const sorted = allCaseStudies()
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order);
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

export function getAllCaseStudiesSorted(): CaseStudy[] {
  return [...allCaseStudies()].sort((a, b) => a.order - b.order);
}

export function getNextCaseStudySlug(currentSlug: string): string | null {
  const sorted = getAllCaseStudiesSorted();
  const i = sorted.findIndex((c) => c.slug === currentSlug);
  if (i === -1) return null;
  const next = sorted[i + 1];
  return next ? next.slug : null;
}
