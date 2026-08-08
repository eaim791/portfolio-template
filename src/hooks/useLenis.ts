import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

// Module-level singleton so Nav / scroll utils can reach it
let globalLenis: Lenis | null = null
export const getLenis = () => globalLenis

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis
    globalLenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      globalLenis = null
    }
  }, [])

  return lenisRef
}
