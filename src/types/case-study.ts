export interface CaseStudySection {
  heading: string
  description: string
}

export interface CaseStudyImpact extends CaseStudySection {
  metrics: string[]
}

export interface CaseStudyCover {
  /** Full-width image for the case study page and social cards. */
  src?: string
  /** Square-cropped, responsive variants for the home cards. */
  card?: { src: string; srcSet: string }
}

export interface CaseStudy {
  slug: string
  featured: boolean
  order: number
  /** Shown on `/work` index (e.g. year or range). */
  date: string
  title: string
  oneLiner: string
  impactMetric: string
  techTags: string[]
  cover?: CaseStudyCover
  liveUrl: string | null
  repoUrl: string | null
  problem: CaseStudySection
  myRole: CaseStudySection
  solution: CaseStudySection
  impact: CaseStudyImpact
}
