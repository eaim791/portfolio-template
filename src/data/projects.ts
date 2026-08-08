import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'resuelto',
    number: '01',
    title: 'Resuelto',
    subtitle: 'Luxury Fashion E-Commerce',
    tags: ['UX/UI Design', 'Frontend Development', 'Design System'],
    year: '2026',
    description:
      'A full-stack fashion e-commerce platform built for a contemporary Argentine streetwear brand, combining editorial aesthetics with conversion-focused UX.',
    heroGradient: ['#1a1510', '#2d2218'],
    accentColor: '#D7C3A5',
    // ── PROJECT URL ──────────────────────────────────────────────────────────
    // Replace '#' with the live URL once the project is deployed.
    // Example: 'https://resuelto.vercel.app'
    // See README.md → "How to add project URLs" for full instructions.
    url: '#',
    // ─────────────────────────────────────────────────────────────────────────
    caseStudy: {
      overview:
        'Resuelto is a Buenos Aires–based streetwear brand that needed a digital flagship matching the quality of their physical experience. The challenge was building an e-commerce that felt premium without sacrificing performance or usability.',
      role: 'Lead Designer & Frontend Developer',
      duration: '8 weeks',
      team: 'Solo project',
      problem: {
        title: 'Fashion meets function',
        description:
          "Resuelto's existing online presence was a generic Shopify template that undermined the brand's identity. Users were abandoning carts at a 78% rate, and the bounce rate on mobile exceeded 65%. The brand needed a ground-up redesign that communicated premium quality while streamlining the purchase journey.",
      },
      research: {
        title: 'Understanding the luxury streetwear buyer',
        insights: [
          'Users expect editorial-quality imagery and copy before committing to premium price points',
          'Mobile-first is non-negotiable — 74% of their existing traffic came from mobile devices',
          'Cart abandonment peaked at the shipping cost reveal step',
          'Brand storytelling and "behind the brand" content drove 3× higher conversion among returning visitors',
        ],
        methods: ['User interviews (n=12)', 'Heatmap analysis', 'Competitive audit (6 brands)', 'Cart abandonment funnel analysis'],
      },
      process: [
        {
          phase: '01',
          title: 'Information Architecture',
          description:
            'Mapped the full content hierarchy and user flows, reducing the checkout from 5 steps to 3 through progressive disclosure and smart defaults.',
          deliverables: ['Sitemap', 'User flow diagrams', 'Content audit'],
        },
        {
          phase: '02',
          title: 'Wireframes & Prototyping',
          description:
            'Built low-fidelity wireframes for 14 core screens, then iterated with 3 rounds of usability testing on Figma prototypes with 8 participants.',
          deliverables: ['Lo-fi wireframes', 'Interactive Figma prototype', 'Usability test report'],
        },
        {
          phase: '03',
          title: 'Visual Design',
          description:
            "Developed a design system rooted in a navy/silver palette with Bebas Neue headlines and DM Sans body copy — channeling the brand's sharp, urban identity.",
          deliverables: ['Design system', 'Component library', 'Final mockups (14 screens)'],
        },
        {
          phase: '04',
          title: 'Frontend Development',
          description:
            'Built the full frontend in vanilla HTML/CSS/JS with a Nike-style mega menu, animated cart drawer, and a custom base64 image pipeline for performance.',
          deliverables: ['tienda.html', 'login.html', 'CSS architecture', 'Cart system'],
        },
      ],
      outcome: {
        title: 'Results after launch',
        description:
          "The redesigned storefront launched to Resuelto's existing customer base and drove immediate improvements across all key metrics within the first 30 days.",
        metrics: [
          { value: '−42%', label: 'Cart abandonment' },
          { value: '+38%', label: 'Mobile conversion' },
          { value: '4.2s → 1.8s', label: 'Load time' },
          { value: '+61%', label: 'Session duration' },
        ],
      },
      learnings: [
        'Progressive disclosure in checkout flows reduces cognitive load more effectively than showing all steps upfront.',
        "Brand storytelling isn't a nice-to-have — it directly impacts willingness to pay at premium price points.",
        'Building without a framework forced me to write leaner, more performant CSS than I would have with a library.',
      ],
      nextProject: 'portfolio-studio',
    },
  },
  {
    id: 'portfolio-studio',
    number: '02',
    title: 'Creative Studio',
    subtitle: 'Immersive Agency Portfolio',
    tags: ['Creative Direction', 'GSAP', 'Three.js', 'Vanilla JS'],
    year: '2025',
    description:
      'An immersive, physics-driven portfolio for a digital creative studio, featuring a 3D carousel, FLIP-based transitions, and full scroll-controlled cinematography.',
    heroGradient: ['#0f1419', '#1c2535'],
    accentColor: '#8eb4e0',
    // ── PROJECT URL ──────────────────────────────────────────────────────────
    // Replace '#' with the live URL once the project is deployed.
    // Example: 'https://creative-studio.vercel.app'
    url: '#',
    // ─────────────────────────────────────────────────────────────────────────
    caseStudy: {
      overview:
        'A boutique creative studio needed a portfolio that would itself serve as proof of capability — the site had to demonstrate the same level of craft the studio brings to client work. The brief: no templates, no compromise.',
      role: 'Creative Director & Frontend Developer',
      duration: '6 weeks',
      team: 'Solo project',
      problem: {
        title: 'The portfolio paradox',
        description:
          "For a creative studio, the portfolio site is the pitch. The studio's previous site was clean but static — it listed work without demonstrating the kinetic, interactive quality that defines their output. New business leads were converting at only 12% from the site.",
      },
      research: {
        title: 'What award-winning studios do differently',
        insights: [
          'Sites on Awwwards and Hoverstates generate 4–7× more inbound inquiry than conventional portfolios',
          'Visitors spend 2.4× longer on sites with scroll-driven animation versus static equivalents',
          'Load time is the critical failure point — studios lose 40% of visitors if TTI exceeds 4 seconds',
          'The "wow moment" needs to happen within the first 8 seconds, before the scroll begins',
        ],
        methods: ['Competitive analysis (20 award-winning studios)', 'Heatmap review of existing site', 'Client interview (studio principal)'],
      },
      process: [
        {
          phase: '01',
          title: 'Motion Direction',
          description:
            'Storyboarded the full site as a film sequence — every transition, every scroll-linked move was mapped before a line of code was written.',
          deliverables: ['Motion storyboard', 'Interaction spec', 'Performance budget'],
        },
        {
          phase: '02',
          title: 'Three.js Carousel',
          description:
            'Built a physics-based 3D Cover Flow carousel with momentum lerp, custom easing curves, and touch/drag support — no library, pure WebGL.',
          deliverables: ['3D carousel component', 'Physics engine', 'Touch handler'],
        },
        {
          phase: '03',
          title: 'FLIP Transitions',
          description:
            "Implemented FLIP-based seamless open/close transitions for project reveals, with a 3D page-turn effect on case study entry — the site's signature moment.",
          deliverables: ['FLIP animation system', 'Page-turn effect', 'State machine'],
        },
        {
          phase: '04',
          title: 'Performance Optimization',
          description:
            'Achieved a 97 Lighthouse performance score by implementing lazy loading, WOFF2 subsetting, and a custom asset pipeline that deferred non-critical Three.js initialization.',
          deliverables: ['Performance audit', 'Asset pipeline', 'Lighthouse report'],
        },
      ],
      outcome: {
        title: 'Studio impact',
        description:
          'The new portfolio launched at a moment when the studio was pitching three enterprise clients simultaneously. It became a differentiator in every pitch room.',
        metrics: [
          { value: '+215%', label: 'Inbound inquiries' },
          { value: '97',    label: 'Lighthouse score' },
          { value: '4.8min',label: 'Avg session time' },
          { value: '3×',    label: 'Proposal-to-close rate' },
        ],
      },
      learnings: [
        'Treating the site as a film — with a director\'s eye for pacing, cuts, and climax — produces fundamentally different work than thinking about it as a collection of pages.',
        'FLIP animation is the single most powerful technique for creating the illusion of continuity across state changes.',
        'A performance budget set at the start of a project prevents the compromise conversations that happen at the end.',
      ],
      nextProject: 'level-test',
    },
  },
  {
    id: 'level-test',
    number: '03',
    title: 'Level Test',
    subtitle: 'English Assessment Platform',
    tags: ['React', 'UX Research', 'Accessibility', 'Ed-Tech'],
    year: '2025',
    description:
      'A CEFR-aligned interactive English assessment experience designed to reduce test anxiety through progressive disclosure and calm, editorial UI patterns.',
    heroGradient: ['#1a1320', '#0f0f1a'],
    accentColor: '#b8a9d4',
    // ── PROJECT URL ──────────────────────────────────────────────────────────
    // Replace '#' with the live URL once the project is deployed.
    // Example: 'https://leveltest.vercel.app'
    url: '#',
    // ─────────────────────────────────────────────────────────────────────────
    caseStudy: {
      overview:
        'An educational platform needed to replace their anxiety-inducing, timer-heavy English placement test with an experience that felt supportive rather than evaluative — while maintaining psychometric validity.',
      role: 'UX Designer & Frontend Developer',
      duration: '5 weeks',
      team: '2 people (1 UX researcher)',
      problem: {
        title: 'Testing that tests the wrong thing',
        description:
          "Users taking the existing CEFR placement test reported high anxiety levels, with 34% abandoning mid-test. The visual design was clinical and timed, triggering performance anxiety that skewed results — users were being placed at the wrong level, leading to poor course-fit and churn.",
      },
      research: {
        title: 'Reframing assessment as conversation',
        insights: [
          '74% of users reported feeling stressed or anxious during the original test',
          'Anxiety correlates with lower vocabulary retrieval — the test was measuring anxiety, not proficiency',
          'Removing visible timers reduced perceived pressure by 61% in A/B testing',
          'Progressive question revelation (one question at a time) improved completion rates by 44%',
        ],
        methods: ['Cognitive walkthrough', 'A/B testing (n=240)', 'Post-session surveys', 'Eye-tracking study'],
      },
      process: [
        {
          phase: '01',
          title: 'Anxiety Mapping',
          description:
            'Conducted a cognitive walkthrough with 12 participants, tagging every anxiety trigger in the existing flow. Built a "calm journey map" as the north star for the redesign.',
          deliverables: ['Anxiety audit', 'Calm journey map', 'Design principles'],
        },
        {
          phase: '02',
          title: 'Progressive Disclosure System',
          description:
            'Designed a single-question-per-view layout with adaptive difficulty — the algorithm adjusts in real time so users are always challenged but never overwhelmed.',
          deliverables: ['Question flow system', 'Adaptive difficulty spec', 'Progress visualization'],
        },
        {
          phase: '03',
          title: 'Visual Language',
          description:
            'Developed a calm, editorial visual system — generous white space, soft typographic hierarchy, and no countdown timers visible during the test itself.',
          deliverables: ['Design system', 'Component library (Figma)', 'Accessibility audit'],
        },
        {
          phase: '04',
          title: 'React Implementation',
          description:
            'Built the full assessment UI in React with smooth question transitions (Framer Motion), real-time CEFR scoring logic, and full WCAG 2.1 AA compliance.',
          deliverables: ['React app', 'CEFR scoring engine', 'Accessibility report'],
        },
      ],
      outcome: {
        title: 'Measurable calm',
        description:
          'The redesigned assessment launched to 1,200 users in the first month. Post-session anxiety scores dropped to their lowest recorded level, and placement accuracy improved significantly.',
        metrics: [
          { value: '−68%', label: 'Test anxiety score' },
          { value: '+44%', label: 'Completion rate' },
          { value: '+29%', label: 'Placement accuracy' },
          { value: '4.7★', label: 'User satisfaction' },
        ],
      },
      learnings: [
        "The most impactful UX decision was the simplest: one question at a time. Reducing cognitive load is often about subtraction, not addition.",
        'Accessibility and calm design are deeply aligned — the same decisions that help anxious users help users with cognitive disabilities.',
        'Psychometric validity and good UX are not in conflict. Users perform better in lower-anxiety environments, producing more accurate assessments.',
      ],
      nextProject: 'resuelto',
    },
  },
]

export const getProjectById = (id: string): Project | undefined =>
  projects.find(p => p.id === id)

export const getNextProject = (currentId: string): Project | undefined => {
  const current = projects.find(p => p.id === currentId)
  if (!current) return undefined
  return projects.find(p => p.id === current.caseStudy.nextProject)
}
