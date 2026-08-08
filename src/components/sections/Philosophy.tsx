import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// New philosophy phrase — split into two lines for editorial rhythm
const lines = [
  { text: 'Technology should adapt to people.', italic: false },
  { text: 'Not people to technology.', italic: true },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter((el): el is HTMLSpanElement => el !== null)

      // Each word gets its own scrub trigger offset by its index
      // so they cascade smoothly as you scroll through the section
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.06, y: 22, filter: 'blur(5px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${i * 42} 66%`,
              end:   `top+=${i * 42 + 130} 38%`,
              scrub: 0.9,
            },
          }
        )
      })

      // Subtitle drifts in after all words have appeared
      gsap.fromTo(
        '.philo-sub',
        { opacity: 0, y: 14 },
        {
          opacity: 0.5,
          y: 0,
          duration: 0.95,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let globalIdx = 0

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative bg-[#111110] px-12 py-44 text-center overflow-hidden max-md:px-7 max-md:py-28"
    >
      {/* Grain */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px 200px', opacity:0.025,
      }} />

      {/* Section label */}
      <div className="relative flex items-center justify-center gap-4 mb-16 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne/60">
        <span className="block w-8 h-px bg-champagne/40" />
        Philosophy
        <span className="block w-8 h-px bg-champagne/40" />
      </div>

      {/* Lines */}
      <div className="relative">
        {lines.map((line, li) => (
          <p
            key={li}
            className={[
              'font-serif font-light leading-[1.22] tracking-[-0.01em] block mb-3',
              line.italic ? 'italic' : '',
            ].join(' ')}
            style={{ fontSize: 'clamp(26px, 4.6vw, 68px)', color: '#F0EDE8' }}
          >
            {line.text.split(' ').map((word) => {
              const idx = globalIdx++
              // Accent: "Not" and "technology." on the second (italic) line
              const isAccent = li === 1
              return (
                <span
                  key={idx}
                  ref={el => { wordsRef.current[idx] = el }}
                  className={`inline-block mr-[0.22em] ${isAccent ? 'text-champagne' : 'text-[#F0EDE8]'}`}
                  style={{
                    opacity: 0.06,
                    transform: 'translateY(22px)',
                    filter: 'blur(5px)',
                    willChange: 'opacity,transform,filter',
                  }}
                >
                  {word}
                </span>
              )
            })}
          </p>
        ))}
      </div>

      {/* Subtitle */}
      <p
        className="philo-sub relative mt-14 font-sans text-[11px] tracking-[0.3em] uppercase text-white/40"
        style={{ opacity: 0 }}
      >
        — Design &amp; Development Studio, Córdoba
      </p>
    </section>
  )
}
