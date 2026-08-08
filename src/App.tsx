import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Cursor from '@/components/ui/Cursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Nav from '@/components/layout/Nav'
import HomePage from '@/pages/HomePage'
import { useCursor } from '@/hooks/useCursor'
import { useLenis } from '@/hooks/useLenis'
import { CursorContext } from '@/lib/cursorContext'
import { useState } from 'react'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
}

function AnimatedRoutes({ onLoaderDone }: { onLoaderDone: () => void }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage onLoaderDone={onLoaderDone} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppInner() {
  const { cursorRef, variant, setVariant } = useCursor()
  // navReady starts false — Nav stays invisible until loader finishes
  const [navReady, setNavReady] = useState(false)
  useLenis()

  return (
    <CursorContext.Provider value={{ setVariant }}>
      <Cursor ref={cursorRef} variant={variant} />
      <ScrollProgress />
      {/* Nav is in the DOM from the start but invisible + non-interactive until loader completes */}
      <Nav ready={navReady} />
      <AnimatedRoutes onLoaderDone={() => setNavReady(true)} />
    </CursorContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
