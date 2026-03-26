import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  opacity: number
  hue: number
  sat: number
  emoji: string
  emojiSize: number
  isEmoji: boolean
}

// Food theme: healthy vs fastfood
const FOOD_EMOJIS = ["🥦", "🍎", "🥗", "🥕", "🍇", "🥑", "🍓", "🥝", "🌽", "🍔", "🍟", "🍕", "🧁", "🌭", "🥤"]
// Aqua-green-warm palette for Frutiger Aero + food
const HUES = [155, 165, 185, 195, 33, 40, 10, 120]

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

    // Init bubbles — mix of plain aero bubbles and emoji food bubbles
    bubblesRef.current = Array.from({ length: 32 }, (_, i) => {
      const isEmoji = i % 3 === 0
      const r = isEmoji ? 22 + Math.random() * 28 : 14 + Math.random() * 50
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        opacity: isEmoji ? 0.85 : 0.13 + Math.random() * 0.20,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        sat: 60 + Math.random() * 25,
        emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
        emojiSize: r * 1.1,
        isEmoji,
      }
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      bubblesRef.current.forEach(b => {
        const dx = b.x - mx
        const dy = b.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          const force = (130 - dist) / 130
          b.vx += (dx / dist) * force * 0.55
          b.vy += (dy / dist) * force * 0.55
        }

        b.vx *= 0.97
        b.vy *= 0.97
        b.vy -= 0.008

        b.x += b.vx
        b.y += b.vy

        if (b.y + b.r < 0) { b.y = canvas.height + b.r; b.x = Math.random() * canvas.width }
        if (b.x - b.r > canvas.width) b.x = -b.r
        if (b.x + b.r < 0) b.x = canvas.width + b.r

        if (b.isEmoji) {
          // Emoji floating food items with soft glow
          ctx.save()
          ctx.globalAlpha = b.opacity
          // Soft halo
          const halo = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.4)
          halo.addColorStop(0, `hsla(${b.hue}, 80%, 80%, 0.18)`)
          halo.addColorStop(1, `hsla(${b.hue}, 80%, 80%, 0)`)
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r * 1.4, 0, Math.PI * 2)
          ctx.fillStyle = halo
          ctx.fill()
          // Emoji
          ctx.font = `${b.emojiSize}px serif`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.globalAlpha = b.opacity
          ctx.fillText(b.emoji, b.x, b.y)
          ctx.restore()
        } else {
          // Frutiger Aero glass bubble
          const grad = ctx.createRadialGradient(
            b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.08,
            b.x, b.y, b.r
          )
          grad.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, 97%, ${b.opacity * 1.9})`)
          grad.addColorStop(0.35, `hsla(${b.hue}, ${b.sat}%, 82%, ${b.opacity * 1.1})`)
          grad.addColorStop(0.7, `hsla(${b.hue}, ${b.sat}%, 68%, ${b.opacity * 0.6})`)
          grad.addColorStop(1, `hsla(${b.hue}, ${b.sat - 10}%, 55%, ${b.opacity * 0.2})`)

          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()

          // Inner gloss highlight
          const gloss = ctx.createRadialGradient(
            b.x - b.r * 0.25, b.y - b.r * 0.30, 0,
            b.x - b.r * 0.25, b.y - b.r * 0.30, b.r * 0.52
          )
          gloss.addColorStop(0, `rgba(255,255,255,${b.opacity * 1.6})`)
          gloss.addColorStop(1, `rgba(255,255,255,0)`)
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
          ctx.fillStyle = gloss
          ctx.fill()

          // Bottom rim light
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${b.hue}, 70%, 90%, ${b.opacity * 1.2})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
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
      style={{ mixBlendMode: "normal" }}
    />
  )
}
