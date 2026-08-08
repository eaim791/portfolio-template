import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

/**
 * Loader animation — three acts:
 *
 *  Act 1 (0.0 → 0.9s)  A thin champagne line draws across the screen from left to right.
 *  Act 2 (0.7 → 1.8s)  Name + role rise through the line. Line softly dissolves.
 *  Act 3 (2.0 → 2.9s)  Everything fades up. Curtain lifts to reveal the site.
 *
 * Total: ~2.9s — cinematic, unhurried, never boring.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  // Line
  const lineRef    = useRef<HTMLDivElement>(null)
  const lineDotRef = useRef<HTMLDivElement>(null)

  // Text block
  const nameRef    = useRef<HTMLDivElement>(null)
  const roleRef    = useRef<HTMLParagraphElement>(null)

  // Corners + counter
  const countRef   = useRef<HTMLSpanElement>(null)
  const tagRef     = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      },
    })

    /* ── ACT 1 ─ Line draws across ─────────────────────────────────── */
    // Line expands from 0 → full width
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.75, ease: 'power3.inOut' },
      0
    )
    // Dot slides across in lockstep
    tl.fromTo(lineDotRef.current,
      { left: '0%', opacity: 0 },
      { left: '100%', opacity: 1, duration: 0.75, ease: 'power3.inOut' },
      0
    )

    /* ── Corners fade in ─────────────────────────────────────────────*/
    tl.fromTo('.loader-corner',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
      0.1
    )

    /* ── ACT 2 ─ Name + role rise ───────────────────────────────────*/
    tl.fromTo(nameRef.current,
      { y: 28, opacity: 0, filter: 'blur(6px)' },
      { y: 0,  opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
      0.55
    )
    tl.fromTo(roleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.65, ease: 'power2.out' },
      0.88
    )

    // Line fades out as text appears
    tl.to(lineRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.72)
    tl.to(lineDotRef.current, { opacity: 0, duration: 0.3 }, 0.72)

    /* ── Counter ────────────────────────────────────────────────────*/
    tl.fromTo([tagRef.current, countRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      0.7
    )
    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 1.05,
      ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0')
        }
      },
    }, 0.7)

    /* ── Hold at 100 ────────────────────────────────────────────────*/
    tl.to({}, { duration: 0.22 })

    /* ── ACT 3 ─ Everything dissolves up ───────────────────────────*/
    tl.to(
      [nameRef.current, roleRef.current],
      { y: -20, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power3.in' }
    )
    tl.to(
      [countRef.current, tagRef.current, '.loader-corner'],
      { opacity: 0, duration: 0.35, ease: 'power2.in' },
      '<'
    )

    /* ── Curtain lifts ──────────────────────────────────────────────*/
    tl.to(curtainRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: 'power4.inOut',
    }, '-=0.08')

    tl.set(wrapRef.current, { display: 'none' })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  const cornerPositions = [
    { cls: 'top-5 left-6',    borderTop: true,  borderLeft: true  },
    { cls: 'top-5 right-6',   borderTop: true,  borderLeft: false },
    { cls: 'bottom-5 left-6', borderTop: false, borderLeft: true  },
    { cls: 'bottom-5 right-6',borderTop: false, borderLeft: false },
  ]

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[8000] pointer-events-none" aria-hidden="true">
      <div
        ref={curtainRef}
        className="absolute inset-0 flex flex-col items-center justify-center select-none"
        style={{ background: '#0C0C0B' }}
      >
        {/* ── Grain ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:'200px', opacity:0.026,
        }} />

        {/* ── Corner marks ── */}
        {cornerPositions.map(({ cls, borderTop, borderLeft }, i) => (
          <div
            key={i}
            className={`loader-corner absolute ${cls} pointer-events-none`}
            style={{
              width: '14px', height: '14px',
              borderTop:    borderTop    ? '1px solid rgba(215,195,165,0.18)' : 'none',
              borderBottom: !borderTop   ? '1px solid rgba(215,195,165,0.18)' : 'none',
              borderLeft:   borderLeft   ? '1px solid rgba(215,195,165,0.18)' : 'none',
              borderRight:  !borderLeft  ? '1px solid rgba(215,195,165,0.18)' : 'none',
              opacity: 0,
            }}
          />
        ))}

        {/* ── ACT 1 ELEMENT: horizontal line + traveling dot ── */}
        <div
          className="absolute"
          style={{
            left: 'clamp(32px,5vw,64px)',
            right: 'clamp(32px,5vw,64px)',
            top: '50%',
            height: '1px',
          }}
        >
          {/* The line itself */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent, rgba(215,195,165,0.55) 15%, rgba(215,195,165,0.55) 85%, transparent)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
          {/* Traveling dot at the tip */}
          <div
            ref={lineDotRef}
            style={{
              position: 'absolute',
              top: '50%',
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: '#D7C3A5',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px 2px rgba(215,195,165,0.5)',
              opacity: 0,
            }}
          />
        </div>

        {/* ── ACT 2 ELEMENT: name + role centered ── */}
        <div className="relative flex flex-col items-center" style={{ gap: '14px' }}>
          {/* Top rule */}
          <div style={{
            width:'clamp(40px,5vw,64px)', height:'1px',
            background:'rgba(215,195,165,0.3)',
          }} />

          {/* Name */}
          <div
            ref={nameRef}
            style={{ opacity: 0, transform: 'translateY(28px)', filter: 'blur(6px)' }}
          >
            <p
              className="font-serif text-white font-light text-center"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 44px)',
                letterSpacing: '0.44em',
                lineHeight: 1,
                marginRight: '-0.44em', // remove trailing letter-spacing gap
              }}
            >
              NOAH RIVERA
            </p>
          </div>

          {/* Role */}
          <p
            ref={roleRef}
            className="font-sans text-center"
            style={{
              color: 'rgba(215,195,165,0.45)',
              fontSize: 'clamp(8px, 0.8vw, 10px)',
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              opacity: 0,
              marginRight: '-0.36em',
            }}
          >
            Frontend Developer &amp; UX/UI Designer
          </p>

          {/* Bottom rule */}
          <div style={{
            width:'clamp(40px,5vw,64px)', height:'1px',
            background:'rgba(215,195,165,0.3)',
          }} />
        </div>

        {/* ── Counter — bottom right ── */}
        <div className="absolute bottom-9 right-11 max-md:right-7">
          <span
            ref={countRef}
            className="font-serif font-light tabular-nums"
            style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            000
          </span>
        </div>

        {/* ── Year tag — bottom left ── */}
        <div className="absolute bottom-9 left-11 max-md:left-7">
          <span
            ref={tagRef}
            className="font-sans uppercase"
            style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              opacity: 0,
            }}
          >
            Portfolio 2026
          </span>
        </div>
      </div>
    </div>
  )
}
