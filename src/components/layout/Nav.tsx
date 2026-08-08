import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCursorContext } from '@/lib/cursorContext'
import { scrollToSection, scrollToTop } from '@/lib/scroll'

interface NavProps {
  /** Becomes true once the loader animation finishes. Nav is invisible until then. */
  ready: boolean
}

export default function Nav({ ready }: NavProps) {
  const { setVariant } = useCursorContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const lastScrollY = useRef(0)

  const handleLogoClick = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToTop(), 80)
    } else {
      scrollToTop()
    }
  }, [location.pathname, navigate])

  const handleSectionClick = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToSection(id), 160)
    } else {
      scrollToSection(id)
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => scrollToSection(id), 120)
      return () => clearTimeout(timer)
    }
  }, [location])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 60)
      setHidden(y >= 60 && y > lastScrollY.current + 4)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'About',   id: 'about'   },
    { label: 'Work',    id: 'works'   },
    { label: 'Skills',  id: 'skills'  },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[200] flex items-center justify-between',
        'px-12 py-6 max-md:px-7',
        // Visibility controlled by ready + scroll state
        // Use opacity + pointer-events so it's in the DOM but fully hidden during load
        ready ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        hidden ? '-translate-y-full' : 'translate-y-0',
        // Smooth transitions only after ready to avoid flash
        ready ? 'transition-all duration-500 ease-out' : '',
        !atTop && ready
          ? 'bg-white/85 backdrop-blur-md border-b border-black/[0.04]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <button
        onClick={handleLogoClick}
        onMouseEnter={() => setVariant('link')}
        onMouseLeave={() => setVariant('default')}
        className="font-serif text-[13px] tracking-[0.25em] text-black hover:text-champagne transition-colors duration-300 cursor-none bg-transparent border-0 p-0"
        aria-label="Scroll to top"
      >
        Noah Rivera
      </button>

      <ul className="flex gap-10 list-none m-0 p-0 max-md:hidden">
        {navLinks.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => handleSectionClick(id)}
              onMouseEnter={() => setVariant('link')}
              onMouseLeave={() => setVariant('default')}
              className="font-sans text-[10px] tracking-[0.18em] uppercase text-gray hover:text-black transition-colors duration-300 cursor-none bg-transparent border-0 p-0"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
