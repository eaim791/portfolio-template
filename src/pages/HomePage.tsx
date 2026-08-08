import { useState } from 'react'
import Loader from '@/components/ui/Loader'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Works from '@/components/sections/Works'
import Philosophy from '@/components/sections/Philosophy'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

interface HomePageProps {
  onLoaderDone: () => void
}

export default function HomePage({ onLoaderDone }: HomePageProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = () => {
    setLoaded(true)
    onLoaderDone()
  }

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <Hero animate={loaded} />
      <About />
      <Works />
      <Philosophy />
      <Skills />
      <Contact />
      <footer className="bg-black border-t border-white/[0.06] px-12 py-7 flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:text-center max-md:px-7">
        <p className="font-sans text-[10px] tracking-[0.18em] text-white/25">
          © 2026 Noah Rivera
        </p>
        <p className="font-sans text-[10px] tracking-[0.18em] text-white/25">
          Designed &amp; Built with precision
        </p>
      </footer>
    </>
  )
}
