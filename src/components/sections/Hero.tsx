import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCursorContext } from '@/lib/cursorContext'
import { scrollToSection } from '@/lib/scroll'

interface HeroProps {
  animate: boolean
}

export default function Hero({ animate }: HeroProps) {
  const { setVariant } = useCursorContext()
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const decoRef     = useRef<HTMLDivElement>(null)
  const metaRef     = useRef<HTMLDivElement>(null)
  const dividerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return
    const tl = gsap.timeline({ delay: 0.05 })

    // Decorative ring fades in first
    tl.fromTo(decoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' }, 0)

    // Divider line draws in
    tl.fromTo(dividerRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0.1)

    // Lines rise — NO overflow:hidden on parent, just translate from below
    tl.to([line1Ref.current, line2Ref.current], {
      y: 0, duration: 1.2, stagger: 0.14, ease: 'power4.out',
    }, 0.2)

    tl.to(eyebrowRef.current,  { opacity: 1, duration: 0.75, ease: 'power2.out' }, '-=0.65')
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.55')
    tl.to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7,  ease: 'power2.out' }, '-=0.45')
    tl.to(metaRef.current,     { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
  }, [animate])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end px-12 overflow-hidden max-md:px-7"
      style={{ paddingBottom: 'clamp(72px, 9vh, 108px)' }}
    >
      <style>{`
        @keyframes blob1     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-2%,3%) scale(1.04)} }
        @keyframes blob2     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(3%,-2%) scale(0.97)} }
        @keyframes rotateCW  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rotateCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulseRing { 0%,100%{opacity:0.16} 50%{opacity:0.34} }
        @keyframes heroFadeDot { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
      `}</style>

      {/* ── Background blobs ── */}
      <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,#EAE0D2 0%,transparent 70%)', opacity:0.28, filter:'blur(90px)', animation:'blob1 20s ease-in-out infinite' }} />
      <div aria-hidden="true" className="absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,#e8e0d8 0%,transparent 70%)', opacity:0.15, filter:'blur(110px)', animation:'blob2 26s ease-in-out infinite' }} />

      {/* Grain */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px', opacity:0.022,
      }} />

      {/* ── Left vertical rule ── */}
      <div aria-hidden="true" className="absolute left-12 top-0 bottom-0 w-px pointer-events-none max-md:hidden"
        style={{ background:'linear-gradient(to bottom, transparent 8%, rgba(215,195,165,0.16) 30%, rgba(215,195,165,0.16) 70%, transparent 92%)' }} />

      {/* ── Decorative ring cluster — upper right ── */}
      <div
        ref={decoRef}
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          opacity: 0,
          top: 'clamp(48px, 8vh, 88px)',
          right: 'clamp(32px, 5vw, 72px)',
        }}
      >
        {/* Outer rotating ring */}
        <div style={{
          position:'absolute',
          width:'clamp(200px,20vw,280px)', height:'clamp(200px,20vw,280px)',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          borderRadius:'50%',
          border:'1px solid rgba(215,195,165,0.2)',
          animation:'rotateCW 70s linear infinite, pulseRing 7s ease-in-out infinite',
        }}>
          {/* Tick marks at every 30° */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position:'absolute', top:'50%', left:'50%',
              width: i % 3 === 0 ? '7px' : '3.5px',
              height:'1px',
              background: i % 3 === 0 ? 'rgba(215,195,165,0.6)' : 'rgba(215,195,165,0.22)',
              transformOrigin:'0 0',
              transform:`rotate(${i * 30}deg) translateX(calc(clamp(100px,10vw,140px)))`,
            }} />
          ))}
        </div>

        {/* Middle counter-rotating ring */}
        <div style={{
          position:'absolute',
          width:'clamp(130px,13vw,180px)', height:'clamp(130px,13vw,180px)',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          borderRadius:'50%',
          border:'1px solid rgba(215,195,165,0.1)',
          animation:'rotateCCW 40s linear infinite',
        }} />

        {/* Inner dashed accent ring */}
        <div style={{
          position:'absolute',
          width:'clamp(72px,7vw,96px)', height:'clamp(72px,7vw,96px)',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          borderRadius:'50%',
          border:'1px dashed rgba(215,195,165,0.18)',
        }} />

        {/* Center content */}
        <div style={{
          position:'relative',
          width:'clamp(200px,20vw,280px)', height:'clamp(200px,20vw,280px)',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:'10px',
        }}>
          <div style={{
            width:'5px', height:'5px', borderRadius:'50%',
            background:'#D7C3A5', opacity:0.75,
            animation:'heroFadeDot 3s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily:'Inter,sans-serif', fontSize:'8px',
            letterSpacing:'0.34em', textTransform:'uppercase',
            color:'rgba(215,195,165,0.45)',
            marginRight:'-0.34em',
          }}>Córdoba</span>
          <span style={{
            fontFamily:'Inter,sans-serif', fontSize:'7px',
            letterSpacing:'0.24em', textTransform:'uppercase',
            color:'rgba(107,107,107,0.35)',
            marginRight:'-0.24em',
          }}>2026</span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl">

        <p
          ref={eyebrowRef}
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray mb-7"
          style={{ opacity: 0 }}
        >
          Portfolio 2026 — Córdoba, Argentina
        </p>

        {/*
          TYPOGRAPHY FIX:
          The overflow:hidden clip on the line-wrapper was cutting descenders
          (g, y in "Designer"). Fix: remove overflow:hidden from the outer
          span. The entrance animation uses translateY so the text slides in
          from below — descenders are never clipped because the parent has
          no overflow constraint. A generous lineHeight (1.08) and
          paddingBottom on the section give the glyphs room to breathe.
        */}
        <h1
          className="font-serif font-light text-black"
          style={{
            fontSize: 'clamp(50px, 8vw, 122px)',
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            /* Extra bottom room so tails of g, y, p don't touch the subtitle */
            paddingBottom: '0.12em',
          }}
        >
          {/* Clip wrapper removed — plain span, text translates in from below */}
          <span className="block" style={{ overflow: 'visible' }}>
            <span
              ref={line1Ref}
              className="block"
              style={{ transform: 'translateY(1.2em)', display: 'block' }}
            >
              Frontend Developer
            </span>
          </span>
          <span className="block" style={{ overflow: 'visible' }}>
            <span
              ref={line2Ref}
              className="block"
              style={{ transform: 'translateY(1.2em)', display: 'block' }}
            >
              &amp; UX/UI Designer
            </span>
          </span>
        </h1>

        {/* Horizontal divider — elegant spacer between title and body */}
        <div
          ref={dividerRef}
          className="mt-8 mb-6 max-md:hidden"
          style={{
            height: '1px',
            width: 'clamp(48px, 6vw, 80px)',
            background: 'linear-gradient(to right, #D7C3A5, transparent)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />

        <p
          ref={subtitleRef}
          className="font-sans text-gray max-w-[400px] leading-[1.78] max-md:mt-6"
          style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', opacity: 0, transform: 'translateY(10px)' }}
        >
          Crafting elegant digital experiences through thoughtful design and modern development.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex items-center gap-5"
          style={{ opacity: 0, transform: 'translateY(14px)' }}
        >
          <button
            onClick={() => scrollToSection('works')}
            onMouseEnter={() => setVariant('link')}
            onMouseLeave={() => setVariant('default')}
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-white bg-black border border-black px-8 py-3.5 hover:bg-transparent hover:text-black transition-all duration-[400ms] cursor-none"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            onMouseEnter={() => setVariant('link')}
            onMouseLeave={() => setVariant('default')}
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-gray border-b border-champagne pb-0.5 hover:text-black transition-colors duration-300 cursor-none bg-transparent border-t-0 border-l-0 border-r-0"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* ── Right-side scroll indicator ── */}
      <div
        ref={metaRef}
        aria-hidden="true"
        className="absolute right-12 bottom-20 flex flex-col items-center gap-3 pointer-events-none max-md:hidden"
        style={{ opacity: 0 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-champagne/35" />
        <span
          className="font-sans text-gray/40 uppercase"
          style={{ fontSize:'8px', letterSpacing:'0.28em', writingMode:'vertical-rl', textOrientation:'mixed' }}
        >
          Scroll to explore
        </span>
      </div>

      {/* ── Bottom-left tag ── */}
      <div aria-hidden="true" className="absolute bottom-10 left-12 flex items-center gap-3 pointer-events-none max-md:hidden">
        <div className="w-8 h-px bg-champagne/30" />
        <span className="font-sans text-gray/35 uppercase" style={{ fontSize:'8px', letterSpacing:'0.28em' }}>
          UX · Design · Code
        </span>
      </div>
    </section>
  )
}
