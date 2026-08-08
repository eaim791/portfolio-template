import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const columns = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'GSAP', 'CSS / Tailwind'],
  },
  {
    label: 'Design',
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'Adobe XD'],
  },
  {
    label: 'Motion & Tools',
    skills: ['Framer Motion', 'Three.js', 'Lenis', 'Git / Vite', 'Accessibility'],
  },
]

export default function Skills() {
  const sectionRef    = useRef<HTMLElement>(null)
  const col0Ref       = useRef<HTMLDivElement>(null)
  const col1Ref       = useRef<HTMLDivElement>(null)
  const col2Ref       = useRef<HTMLDivElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section label ────────────────────────────────────────────────────
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
        }
      )

      // ── Each column gets its own trigger so Frontend fires on its own ────
      // trigger: the column itself, start: top of column hits 82% viewport height
      const colRefs = [col0Ref.current, col1Ref.current, col2Ref.current]

      colRefs.forEach((col) => {
        if (!col) return
        const items = col.querySelectorAll<HTMLLIElement>('[data-skill-item]')

        gsap.fromTo(
          items,
          { opacity: 0, x: -16, filter: 'blur(3px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: col,
              start: 'top 82%',    // fires when THIS column's top enters the viewport
            },
          }
        )

        // Column label
        const label = col.querySelector<HTMLElement>('[data-col-label]')
        if (label) {
          gsap.fromTo(label,
            { opacity: 0 },
            {
              opacity: 1, duration: 0.5, ease: 'power2.out',
              scrollTrigger: { trigger: col, start: 'top 84%' },
            }
          )
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const colRefs = [col0Ref, col1Ref, col2Ref]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-12 py-28 max-md:px-7 max-md:py-20"
    >
      <div ref={headerRef} className="flex items-center gap-4 mb-16 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne" style={{ opacity: 0 }}>
        <span className="block w-8 h-px bg-champagne" />
        Expertise
      </div>

      <div className="grid grid-cols-3 border-t border-[#E2DDD6] max-md:grid-cols-1">
        {columns.map((col, ci) => (
          <div
            key={col.label}
            ref={colRefs[ci]}
            className={[
              'py-14',
              ci === 0 ? 'pr-12 border-r border-[#E2DDD6]' : '',
              ci === 1 ? 'px-12 border-r border-[#E2DDD6]' : '',
              ci === 2 ? 'pl-12' : '',
              'max-md:border-r-0 max-md:border-t max-md:border-[#E2DDD6] max-md:pt-10 max-md:pb-10 max-md:px-0',
            ].join(' ')}
          >
            <p
              data-col-label
              className="font-sans text-[9px] tracking-[0.32em] uppercase text-champagne mb-9"
              style={{ opacity: 0 }}
            >
              {col.label}
            </p>

            <ul className="list-none flex flex-col gap-3.5">
              {col.skills.map(skill => (
                <li
                  key={skill}
                  data-skill-item
                  className="font-serif font-light text-black hover:text-champagne transition-colors duration-300 cursor-default"
                  style={{
                    fontSize: 'clamp(20px, 2vw, 30px)',
                    opacity: 0,
                    transform: 'translateX(-16px)',
                    filter: 'blur(3px)',
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
