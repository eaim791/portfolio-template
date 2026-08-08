import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// ─── PROFILE PHOTO ────────────────────────────────────────────────────────────
// Replace this import with your actual photo.
// Supported formats: .jpg  .jpeg  .png  .webp  .avif
// File location: src/assets/profile.jpg
// See README.md → "How to replace the profile photo" for full instructions.
import profilePhoto from '@/assets/hero.png'
// ──────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const maskRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(
        textRef.current?.querySelectorAll('h2, p, .about-meta') ?? [],
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          y: 36, opacity: 0, duration: 1, stagger: 0.13, ease: 'power3.out',
        }
      )

      // Image mask wipe
      gsap.to(maskRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: 'top 76%' },
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.4,
        ease: 'power4.inOut',
      })

      // Subtle parallax on the photo
      gsap.to(imageRef.current?.querySelector('.about-photo') ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -30,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-12 py-36 grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:py-24 max-md:px-7"
    >
      {/* ── Text column ── */}
      <div ref={textRef}>
        <div className="flex items-center gap-4 mb-14 font-sans text-[9px] tracking-[0.35em] uppercase text-champagne">
          <span className="block w-8 h-px bg-champagne" />
          About
        </div>

        <h2
          className="font-serif font-light leading-[1.12] tracking-[-0.01em] mb-9 text-black"
          style={{ fontSize: 'clamp(34px, 4.2vw, 60px)' }}
        >
          Design that thinks,<br />
          <em className="italic">code that feels.</em>
        </h2>

        <p className="font-sans text-[14px] text-gray leading-[1.85] max-w-md mb-5">
          I'm Noah — a Product Designer and Frontend Engineer based in Lisbon.
          I bridge the gap between research-driven product thinking and polished
          engineering, building experiences that feel effortless and thoughtful
          as they are on the surface.
        </p>
        <p className="font-sans text-[14px] text-gray leading-[1.85] max-w-md">
          My practice spans research, wireframing, visual design, and production
          code. I believe the best digital experiences are invisible — they simply
          feel right.
        </p>

        <div className="about-meta mt-12 flex gap-12">
          {[
            { n: '4+',   l: 'Years' },
            { n: '18',   l: 'Projects' },
            { n: '100%', l: 'Craft' },
          ].map(({ n, l }) => (
            <div key={l} className="flex flex-col gap-1.5">
              <span className="font-serif font-light text-[42px] leading-none text-black">{n}</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Image column ── */}
      <div className="flex flex-col">
        <div
          ref={imageRef}
          className="relative overflow-hidden"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* Mask that wipes away to reveal */}
          <div
            ref={maskRef}
            className="absolute inset-0 bg-white z-10"
            style={{ transformOrigin: 'top' }}
          />

          {/* Profile photo */}
          <img
            src={profilePhoto}
            alt="Noah Rivera — Product Designer & Frontend Engineer"
            className="about-photo w-full h-full object-cover object-top block"
            // object-top keeps face in frame on portrait photos
            draggable={false}
          />

          {/* Subtle champagne overlay at bottom for text legibility */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(215,195,165,0.18) 0%, transparent 100%)',
            }}
          />
        </div>

        <p className="mt-4 font-sans text-[10px] tracking-[0.18em] uppercase text-gray">
          Noah Rivera — Product Design &amp; Frontend
        </p>
      </div>
    </section>
  )
}
