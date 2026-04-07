import { useEffect, useRef } from 'react'

// 3 camadas com velocidades diferentes para efeito de profundidade
function createLayer(count, w, h, rMin, rMax, scrollSpeed) {
  return {
    scrollSpeed,
    stars: Array.from({ length: count }, () => ({
      x:      Math.random() * w,
      y:      Math.random() * h,
      r:      Math.random() * (rMax - rMin) + rMin,
      base:   Math.random() * 0.5 + 0.3,
      speed:  Math.random() * 0.006 + 0.002,
      offset: Math.random() * Math.PI * 2,
    })),
  }
}

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let layers = []
    let lastScroll = window.scrollY
    let scrollVel = 0
    let scrollAccum = 0

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      layers = [
        createLayer(180, canvas.width, canvas.height, 0.15, 0.6,  0.10), // longe
        createLayer(120, canvas.width, canvas.height, 0.4,  1.0,  0.25), // meio
        createLayer(60,  canvas.width, canvas.height, 0.8,  1.4,  0.50), // perto
      ]
    }

    function onScroll() {
      const sy = window.scrollY
      scrollVel = sy - lastScroll
      lastScroll = sy
    }

    function draw(t) {
      const W = canvas.width
      const H = canvas.height

      // Acumula o deslocamento com inércia suave
      scrollAccum += scrollVel * 0.7
      scrollVel   *= 0.85

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      for (const layer of layers) {
        for (const s of layer.stars) {
          // Desloca para cima conforme o scroll, com wrap
          const y = ((s.y - scrollAccum * layer.scrollSpeed) % H + H) % H

          const alpha = s.base + Math.sin(t * s.speed + s.offset) * (s.base * 0.4)
          ctx.globalAlpha = Math.min(1, Math.max(0, alpha))
          ctx.beginPath()
          ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          if (s.r > 0.8) {
            ctx.shadowColor = '#fff'
            ctx.shadowBlur  = 4
          }
          ctx.fill()
          ctx.shadowBlur  = 0
          ctx.globalAlpha = 1
        }
      }

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
