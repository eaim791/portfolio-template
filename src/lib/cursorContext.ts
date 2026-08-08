import { createContext, useContext } from 'react'
import type { CursorVariant } from '@/hooks/useCursor'

interface CursorContextType {
  setVariant: (v: CursorVariant) => void
}

export const CursorContext = createContext<CursorContextType>({
  setVariant: () => {},
})

export const useCursorContext = () => useContext(CursorContext)
