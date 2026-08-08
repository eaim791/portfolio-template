import { useRef } from 'react'
import gsap from 'gsap'
import type { Project } from '@/types'
import { useCursorContext } from '@/lib/cursorContext'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { setVariant } = useCursorContext()
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setVariant('project')
    const inner = imageRef.current?.querySelector<HTMLElement>('[data-card-inner]')
    if (inner) gsap.to(inner, { scale: 1.04, duration: 0.8, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    setVariant('default')
    const inner = imageRef.current?.querySelector<HTMLElement>('[data-card-inner]')
    if (inner) gsap.to(inner, { scale: 1.0, duration: 0.8, ease: 'power2.out' })
  }

  const handleClick = () => {
    if (project.url && project.url !== '#') {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <article
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="grid items-end px-12 mb-2 relative cursor-none max-md:px-7 max-md:grid-cols-[32px_1fr]"
        style={{ gridTemplateColumns: '52px 1fr 320px' }}
        data-project
        data-project-card          /* ← Works.tsx queries this for per-card triggers */
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} project`}
        onKeyDown={e => e.key === 'Enter' && handleClick()}
      >
        {/* ── Row number ── */}
        <span
          data-card-num
          className="font-serif text-[11px] text-champagne tracking-[0.1em] self-end pb-6"
          style={{ opacity: 0 }}   /* start invisible — GSAP animates in */
        >
          {project.number}
        </span>

        {/* ── Image ── */}
        <div
          ref={imageRef}
          data-card-image
          className="overflow-hidden"
          style={{
            aspectRatio: '16/10',
            // Start with bottom 100% clipped — wipes downward to reveal
            clipPath: 'inset(0% 0 100% 0)',
          }}
        >
          {/* Inner wrapper is what we scale on hover — keeps clip intact */}
          <div data-card-inner className="w-full h-full">
            <svg viewBox="0 0 900 560" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
              <defs>
                <linearGradient id={`p-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor={project.heroGradient[0]} />
                  <stop offset="100%" stopColor={project.heroGradient[1]} />
                </linearGradient>
              </defs>
              <rect width="900" height="560" fill={`url(#p-grad-${index})`} />
              <text x="60" y="220" fontFamily="Cormorant Garamond,serif" fontSize="80"
                fill={project.accentColor} fillOpacity="0.08" letterSpacing="-2">
                {project.title.toUpperCase()}
              </text>
              <rect x="60" y="260" width="440" height="200" rx="2"
                fill={project.accentColor} fillOpacity="0.05" />
              <text x="60" y="310" fontFamily="Cormorant Garamond,serif" fontSize="11"
                fill={project.accentColor} fillOpacity="0.5" letterSpacing="4">
                {project.subtitle.toUpperCase()}
              </text>
              <text x="840" y="520" fontFamily="Cormorant Garamond,serif" fontSize="11"
                fill={project.accentColor} fillOpacity="0.3" textAnchor="end" letterSpacing="3">
                {project.year}
              </text>
            </svg>
          </div>
        </div>

        {/* ── Info column ── */}
        <div
          data-card-info
          className="pl-10 pb-6 flex flex-col justify-end max-md:hidden"
          style={{ opacity: 0 }}   /* start invisible — GSAP animates in */
        >
          <h3
            className="font-serif font-light leading-[1.1] tracking-[-0.01em] mb-4 text-black"
            style={{ fontSize: 'clamp(24px, 2.6vw, 40px)' }}
          >
            {project.title}
          </h3>
          <p className="font-sans text-[12px] text-gray leading-relaxed mb-4 max-w-xs">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <span key={tag}
                className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray border border-[#ddd] px-2.5 py-1.5">
                {tag}
              </span>
            ))}
          </div>
          <span className="font-sans text-[10px] tracking-[0.18em] text-champagne">
            {project.year}
          </span>
        </div>

        {/* ── Arrow — animated by Works.tsx hover delegation ── */}
        <span
          className="project-arrow absolute right-12 bottom-6 text-[22px] text-black pointer-events-none max-md:hidden"
          aria-hidden="true"
          style={{ opacity: 0, transform: 'translateX(-10px)' }}
        >
          →
        </span>
      </article>

      <div className="h-px bg-[#E2DDD6] mx-12 max-md:mx-7" />
    </>
  )
}
