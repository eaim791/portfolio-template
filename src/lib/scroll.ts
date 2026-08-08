import { getLenis } from '@/hooks/useLenis'

/**
 * Smooth-scroll to a section by ID.
 * Prefers Lenis; falls back to native scrollIntoView.
 */
export function scrollToSection(id: string, offset = -72) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/**
 * Smooth-scroll to the very top of the page (logo click / home).
 * Works immediately — does not wait for Lenis to be ready.
 */
export function scrollToTop(instant = false) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { duration: instant ? 0 : 1.2 })
  } else {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
  }
}
