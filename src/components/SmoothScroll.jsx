import { useEffect } from 'react'
import Lenis from 'lenis'

// Slows the mouse wheel and glides to a stop, so scroll-driven animations have time to play.
// Tune the feel with these two numbers:
//   WHEEL_SPEED: how far one wheel notch travels (1 is normal, lower is slower)
//   GLIDE: how softly it eases (lower is a longer, floatier glide)
const WHEEL_SPEED = 0.35
const GLIDE = 0.05

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const lenis = new Lenis({ lerp: GLIDE, wheelMultiplier: WHEEL_SPEED, smoothWheel: true, anchors: true })
    window.__lenis = lenis
    let raf = requestAnimationFrame(function tick(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
  return null
}
