import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!desktop) return undefined

    const move = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
      setVisible(true)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <span className={`custom-cursor ${visible ? 'is-visible' : ''}`} aria-hidden="true" />
}