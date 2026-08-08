import { useEffect, useRef, useState } from 'react'

export type CursorVariant = 'default' | 'project' | 'link' | 'dark'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [variant, setVariant] = useState<CursorVariant>('default')

  useEffect(() => {
    // Direct GPU-composited positioning — zero interpolation lag
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return { cursorRef, variant, setVariant }
}
