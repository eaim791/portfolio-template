import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursorContext } from '@/lib/cursorContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)
  const { setVariant } = useCursorContext()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.contact-btn', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.45,
      })
      gsap.from('.contact-links', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.65,
      })
    }, sectionRef)

    // Magnetic button
    const btn = btnRef.current
    if (btn) {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const relX = e.clientX - rect.left - rect.width / 2
        const relY = e.clientY - rect.top  - rect.height / 2
        gsap.to(btn, { x: relX * 0.28, y: relY * 0.28, duration: 0.4, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      return () => {
        ctx.revert()
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      }
    }
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      // Switch cursor to dark/white ring on enter, restore on leave
      onMouseEnter={() => setVariant('dark')}
      onMouseLeave={() => setVariant('default')}
      className="relative min-h-[88vh] bg-[#111110] flex flex-col items-center justify-center text-center px-12 py-24 overflow-hidden max-md:px-7"
    >
      {/* Ghost text */}
      <span
        aria-hidden="true"
        className="absolute font-serif font-light whitespace-nowrap pointer-events-none select-none"
        style={{
          fontSize: 'clamp(100px, 18vw, 240px)',
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.025)',
        }}
      >
        Let's Talk
      </span>

      {/* Label */}
      <div className="relative flex items-center justify-center gap-4 mb-16 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne/50">
        <span className="block w-8 h-px bg-champagne/40" />
        Contact
        <span className="block w-8 h-px bg-champagne/40" />
      </div>

      {/* Title */}
      <h2
        className="contact-title relative font-serif font-light text-white leading-[1.1] tracking-[-0.01em] mb-14"
        style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
      >
        Let's create something<br />
        <em className="italic text-champagne">exceptional.</em>
      </h2>

      {/* CTA — magnetic + hover fill */}
      <a
        ref={btnRef}
        href="#"
        className="contact-btn relative inline-block font-sans text-[11px] tracking-[0.28em] uppercase text-black bg-champagne px-12 py-[18px] overflow-hidden cursor-none group"
        onMouseEnter={() => setVariant('link')}
        onMouseLeave={() => setVariant('dark')}
      >
        <span className="relative z-10">Get In Touch</span>
        {/* Fill sweep on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        />
      </a>

      {/* Social links */}
      <div className="contact-links relative mt-16 flex gap-12 items-center flex-wrap justify-center">
        {[
          { label: 'LinkedIn', href: '#' },
          { label: 'GitHub',   href: '#' },
          { label: 'Behance',  href: '#' },
          { label: 'Resume ↓', href: '#' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/40 border-b border-white/20 pb-0.5 hover:text-white hover:border-champagne transition-colors duration-300 cursor-none"
            onMouseEnter={() => setVariant('link')}
            onMouseLeave={() => setVariant('dark')}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
