export interface CaseStudySection {
  heading: string;
  description: string;
}

export interface CaseStudyImpact extends CaseStudySection {
  metrics: string[];
}

export interface CaseStudy {
  slug: string;
  featured: boolean;
  order: number;
  /** Shown on `/work` index (e.g. year or range). */
  date: string;
  title: string;
  oneLiner: string;
  impactMetric: string;
  techTags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  featuredImage: string;
  problem: CaseStudySection;
  myRole: CaseStudySection;
  solution: CaseStudySection;
  impact: CaseStudyImpact;
}
