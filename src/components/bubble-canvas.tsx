import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  opacity: number
  hue: number
}

export function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const bubblesRef = useRef<Bubble[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMouse)

    // Init bubbles
    bubblesRef.current = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 12 + Math.random() * 52,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.4,
      opacity: 0.12 + Math.random() * 0.22,
      hue: 180 + Math.random() * 60,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      bubblesRef.current.forEach(b => {
        // Mouse repulsion
        const dx = b.x - mx
        const dy = b.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          b.vx += (dx / dist) * force * 0.5
          b.vy += (dy / dist) * force * 0.5
        }

        // Friction
        b.vx *= 0.97
        b.vy *= 0.97

        // Float up baseline
        b.vy -= 0.01

        b.x += b.vx
        b.y += b.vy

        // Wrap
        if (b.y + b.r < 0) { b.y = canvas.height + b.r; b.x = Math.random() * canvas.width }
        if (b.x - b.r > canvas.width) b.x = -b.r
        if (b.x + b.r < 0) b.x = canvas.width + b.r

        // Draw bubble
        const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r)
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 95%, ${b.opacity * 1.8})`)
        grad.addColorStop(0.4, `hsla(${b.hue}, 70%, 80%, ${b.opacity})`)
        grad.addColorStop(1, `hsla(${b.hue}, 60%, 60%, ${b.opacity * 0.3})`)

        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Gloss highlight
        ctx.beginPath()
        ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.22, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${b.opacity * 1.2})`
        ctx.fill()

        // Border
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${b.hue}, 60%, 85%, ${b.opacity * 1.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.85 }}
    />
  )
}
