import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectById, getNextProject } from '@/data/projects'
import { useCursorContext } from '@/lib/cursorContext'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setVariant } = useCursorContext()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const project = id ? getProjectById(id) : undefined
  const next    = id ? getNextProject(id) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!project) return

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.cs-hero-number', { opacity: 0, x: -20, duration: 0.8, delay: 0.1 })
      gsap.from('.cs-hero-title',  { y: 60, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.2 })
      gsap.from('.cs-hero-meta',   { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 })
      gsap.from('.cs-hero-tags span', {
        opacity: 0, y: 10, duration: 0.6, stagger: 0.08, delay: 0.7,
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        })
      })

      // Metrics count up feel
      gsap.utils.toArray<HTMLElement>('[data-metric]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          y: 24, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, contentRef)

    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-[32px] font-light text-black">Project not found.</p>
        <Link to="/" className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray hover:text-black border-b border-champagne pb-0.5">
          Back home
        </Link>
      </div>
    )
  }

  const { caseStudy: cs } = project

  return (
    <div ref={contentRef} className="bg-white">

      {/* ── Hero ── */}
      <div
        ref={headerRef}
        className="relative min-h-[70vh] flex flex-col justify-end px-13 pb-16 overflow-hidden max-md:px-7 max-md:min-h-[55vh]"
        style={{ background: `linear-gradient(135deg, ${project.heroGradient[0]}, ${project.heroGradient[1]})` }}
      >
        {/* Back */}
        <Link
          to="/#works"
          className="absolute top-8 left-13 font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2 cursor-none max-md:left-7"
          onMouseEnter={() => setVariant('link')}
          onMouseLeave={() => setVariant('default')}
        >
          ← Back
        </Link>

        <span className="cs-hero-number font-serif text-[11px] tracking-[0.25em] mb-6 block"
          style={{ color: project.accentColor, opacity: 0.7 }}>
          {project.number} — Case Study
        </span>

        <h1
          className="cs-hero-title font-serif font-light text-white leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}
        >
          {project.title}
        </h1>
        <p
          className="cs-hero-title font-serif font-light italic mt-2"
          style={{ fontSize: 'clamp(22px, 3vw, 42px)', color: project.accentColor }}
        >
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div className="cs-hero-meta mt-10 flex gap-10 flex-wrap">
          {[
            { label: 'Role',     value: cs.role },
            { label: 'Duration', value: cs.duration },
            { label: 'Team',     value: cs.team },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-white/40">{label}</span>
              <span className="font-sans text-[12px] text-white/80">{value}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="cs-hero-tags mt-6 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-sans text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 border"
              style={{ color: project.accentColor, borderColor: `${project.accentColor}40` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[900px] mx-auto px-13 py-24 max-md:px-7 max-md:py-16">

        {/* Overview */}
        <section className="mb-24" data-reveal>
          <SectionLabel>Overview</SectionLabel>
          <p className="font-serif font-light leading-[1.7] text-black"
            style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>
            {cs.overview}
          </p>
        </section>

        {/* Problem */}
        <section className="mb-24" data-reveal>
          <SectionLabel>The Problem</SectionLabel>
          <h3 className="font-serif font-light text-black mb-6 leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            {cs.problem.title}
          </h3>
          <p className="font-sans text-[14px] text-gray leading-[1.85]">
            {cs.problem.description}
          </p>
        </section>

        {/* Research */}
        <section className="mb-24">
          <div data-reveal>
            <SectionLabel>Research</SectionLabel>
            <h3 className="font-serif font-light text-black mb-6 leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
              {cs.research.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10 max-md:grid-cols-1" data-reveal>
            {cs.research.insights.map((insight, i) => (
              <div key={i} className="border border-[#E2DDD6] p-6">
                <span className="font-serif text-[11px] text-champagne tracking-[0.15em] block mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-[13px] text-gray leading-[1.75]">{insight}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap" data-reveal>
            {cs.research.methods.map(m => (
              <span key={m}
                className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray border border-[#E2DDD6] px-3 py-1.5">
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-24">
          <div data-reveal>
            <SectionLabel>Process</SectionLabel>
          </div>
          <div className="flex flex-col gap-0">
            {cs.process.map((step, i) => (
              <div
                key={step.phase}
                data-reveal
                className="grid grid-cols-[80px_1fr] gap-8 py-10 border-b border-[#E2DDD6] last:border-b-0 max-md:grid-cols-1 max-md:gap-4"
              >
                <div>
                  <span className="font-serif text-[42px] font-light text-champagne leading-none">
                    {step.phase}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif font-light text-black mb-3 leading-tight"
                    style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}>
                    {step.title}
                  </h4>
                  <p className="font-sans text-[13px] text-gray leading-[1.8] mb-5">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map(d => (
                      <span key={d}
                        className="font-sans text-[9px] tracking-[0.18em] uppercase text-champagne border border-champagne/30 px-2.5 py-1">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section className="mb-24">
          <div data-reveal>
            <SectionLabel>Outcome</SectionLabel>
            <h3 className="font-serif font-light text-black mb-4 leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
              {cs.outcome.title}
            </h3>
            <p className="font-sans text-[14px] text-gray leading-[1.85] mb-12">
              {cs.outcome.description}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-px bg-[#E2DDD6] max-md:grid-cols-2">
            {cs.outcome.metrics.map((m, i) => (
              <div key={i} data-metric className="bg-white p-8 flex flex-col gap-2">
                <span className="font-serif font-light text-black leading-none"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
                  {m.value}
                </span>
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-gray">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Learnings */}
        <section className="mb-24" data-reveal>
          <SectionLabel>Learnings</SectionLabel>
          <div className="flex flex-col gap-6">
            {cs.learnings.map((l, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="font-serif text-champagne text-[13px] tracking-[0.1em] mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-[14px] text-gray leading-[1.85]">{l}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Next project ── */}
      {next && (
        <div
          className="relative overflow-hidden cursor-none group"
          style={{ background: `linear-gradient(135deg, ${next.heroGradient[0]}, ${next.heroGradient[1]})` }}
          onClick={() => navigate(`/work/${next.id}`)}
          onMouseEnter={() => setVariant('project')}
          onMouseLeave={() => setVariant('default')}
        >
          <div className="px-13 py-20 max-md:px-7">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-8"
              style={{ color: next.accentColor, opacity: 0.6 }}>
              Next Project
            </p>
            <h2
              className="font-serif font-light text-white leading-[1.05] tracking-[-0.01em] group-hover:translate-x-2 transition-transform duration-500"
              style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}
            >
              {next.title}
            </h2>
            <p className="font-serif italic mt-2" style={{ fontSize: 'clamp(18px, 2.5vw, 32px)', color: next.accentColor }}>
              {next.subtitle}
            </p>
          </div>
        </div>
      )}

      <footer className="bg-black border-t border-white/[0.06] px-13 py-7 flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:text-center max-md:px-7">
        <p className="font-sans text-[10px] tracking-[0.18em] text-white/25">
          © 2026 Noah Rivera
        </p>
        <Link
          to="/"
          className="font-sans text-[10px] tracking-[0.18em] text-white/25 hover:text-white/60 transition-colors cursor-none"
          onMouseEnter={() => setVariant('link')}
          onMouseLeave={() => setVariant('default')}
        >
          Back to Portfolio
        </Link>
      </footer>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne">
      <span className="block w-8 h-px bg-champagne" />
      {children}
    </div>
  )
}
