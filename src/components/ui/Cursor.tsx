import { forwardRef } from 'react'
import type { CursorVariant } from '@/hooks/useCursor'

interface CursorProps {
  variant: CursorVariant
}

const Cursor = forwardRef<HTMLDivElement, CursorProps>(({ variant }, ref) => {
  const isProject = variant === 'project'
  const isLink    = variant === 'link'
  const isDark    = variant === 'dark'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transform: 'translate(-200px, -200px)' }}
      className={[
        'fixed top-0 left-0 pointer-events-none z-[9999]',
        'rounded-full flex items-center justify-center',
        'transition-[width,height,background-color,border-color] duration-[220ms] ease-out',
        isProject
          ? 'w-20 h-20 bg-white border-2 border-white'
          : isLink
          ? 'w-2.5 h-2.5 bg-champagne border border-champagne'
          : isDark
          ? 'w-[18px] h-[18px] bg-transparent border border-white/70'
          : 'w-[18px] h-[18px] bg-transparent border border-black',
      ].join(' ')}
    >
      {isProject && (
        <span className="text-black font-sans text-[9px] tracking-[0.18em] uppercase font-medium select-none">
          View
        </span>
      )}
    </div>
  )
})

Cursor.displayName = 'Cursor'
export default Cursor
