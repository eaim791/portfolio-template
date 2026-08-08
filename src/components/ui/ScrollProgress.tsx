import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const pct =
        window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-px bg-champagne z-[500]"
      style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
    />
  )
}
