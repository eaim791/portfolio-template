import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header reveal ────────────────────────────────────────────────────
      gsap.fromTo(
        '.works-header',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.works-header', start: 'top 82%' },
        }
      )

      // ── Per-card animation: each row fades + slides in independently ─────
      // This fires as soon as the top of the card enters the viewport (80%),
      // so cards appear one by one as you scroll — never all at once, never late.
      const cards = sectionRef.current?.querySelectorAll('[data-project-card]') ?? []

      cards.forEach((card) => {
        // Image: a clean vertical wipe using clipPath
        const imageEl = card.querySelector<HTMLElement>('[data-card-image]')
        // Info text block
        const infoEl  = card.querySelector<HTMLElement>('[data-card-info]')
        // Row number
        const numEl   = card.querySelector<HTMLElement>('[data-card-num]')

        if (imageEl) {
          gsap.fromTo(imageEl,
            { clipPath: 'inset(0% 0 100% 0)', opacity: 1 },
            {
              clipPath: 'inset(0% 0 0% 0)',
              duration: 1.0,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',  // fires when card enters the bottom 20% of viewport
              },
            }
          )
        }

        if (numEl) {
          gsap.fromTo(numEl,
            { opacity: 0, x: -10 },
            {
              opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 80%' },
              delay: 0.15,
            }
          )
        }

        if (infoEl) {
          gsap.fromTo(infoEl,
            { opacity: 0, x: 18 },
            {
              opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 78%' },
              delay: 0.25,
            }
          )
        }
      })

      // ── Arrow hover via event delegation ─────────────────────────────────
      cards.forEach(card => {
        const arrow = card.querySelector<HTMLElement>('.project-arrow')
        if (!arrow) return
        card.addEventListener('mouseenter', () =>
          gsap.to(arrow, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' })
        )
        card.addEventListener('mouseleave', () =>
          gsap.to(arrow, { opacity: 0, x: -10, duration: 0.28, ease: 'power2.out' })
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="works" ref={sectionRef} className="pt-32 pb-20">

      {/* ── Header ── */}
      <div className="works-header flex items-end justify-between px-12 mb-20 max-md:px-7">
        <div>
          <div className="flex items-center gap-4 mb-14 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne">
            <span className="block w-8 h-px bg-champagne" />
            Selected Works
          </div>
          <h2
            className="font-serif font-light tracking-[-0.01em] leading-[1.05] text-black"
            style={{ fontSize: 'clamp(40px, 5.5vw, 78px)' }}
          >
            Recent<br />
            <em className="italic">Projects</em>
          </h2>
        </div>
        <span className="font-serif text-[13px] text-gray tracking-[0.1em] pb-2 max-md:hidden">
          2024 — 2026
        </span>
      </div>

      {/* ── Project list ── */}
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}

    </section>
  )
}
