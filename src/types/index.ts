export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  tags: string[]
  year: string
  description: string
  heroGradient: [string, string]
  accentColor: string
  /**
   * External project URL.
   * Set to the live site or prototype link.
   * Use '#' as a placeholder while the project is unpublished.
   * See README.md → "How to add project URLs" for full instructions.
   */
  url: string
  caseStudy: CaseStudy
}

export interface CaseStudy {
  overview: string
  role: string
  duration: string
  team: string
  problem: {
    title: string
    description: string
  }
  research: {
    title: string
    insights: string[]
    methods: string[]
  }
  process: ProcessStep[]
  outcome: {
    title: string
    description: string
    metrics: Metric[]
  }
  learnings: string[]
  nextProject: string
}

export interface ProcessStep {
  phase: string
  title: string
  description: string
  deliverables: string[]
}

export interface Metric {
  value: string
  label: string
}
