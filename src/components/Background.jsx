import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0.5, y: 0.5 }
    let frameId
    let width = 0
    let height = 0
    let nodes = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      nodes = Array.from({ length: Math.min(34, Math.max(18, Math.floor(width / 38))) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.08 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      nodes.forEach((node, index) => {
        const x = node.x + Math.sin(time * 0.0004 * node.speed + node.phase) * 10 + (pointer.x - 0.5) * 10
        const y = node.y + Math.cos(time * 0.0003 * node.speed + node.phase) * 10 + (pointer.y - 0.5) * 10
        node.renderX = x
        node.renderY = y
        for (let next = index + 1; next < nodes.length; next += 1) {
          const other = nodes[next]
          const distance = Math.hypot(x - other.renderX, y - other.renderY)
          if (distance < 130) {
            context.strokeStyle = `rgba(110, 211, 255, ${0.08 * (1 - distance / 130)})`
            context.beginPath()
            context.moveTo(x, y)
            context.lineTo(other.renderX, other.renderY)
            context.stroke()
          }
        }
        context.fillStyle = index % 5 === 0 ? 'rgba(255, 174, 104, .65)' : 'rgba(110, 211, 255, .42)'
        context.beginPath()
        context.arc(x, y, index % 5 === 0 ? 1.5 : 1, 0, Math.PI * 2)
        context.fill()
      })
      if (!reduceMotion) frameId = requestAnimationFrame(draw)
    }

    const move = (event) => {
      pointer.x = event.clientX / window.innerWidth
      pointer.y = event.clientY / window.innerHeight
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-background" aria-hidden="true" />
}