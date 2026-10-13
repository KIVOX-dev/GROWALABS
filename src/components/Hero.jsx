import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, ease } from './Primitives'

const lead = ['We', 'build', 'software', 'that', 'moves', 'your']

// Words cycle in the headline; each has its own brand-green gradient.
const rotating = [
  { word: 'business', bg: 'linear-gradient(90deg, #7ff0d6, #5eead4 55%, #b5f5e6)' },
  { word: 'team', bg: 'linear-gradient(90deg, #a7f3d0, #5eead4 60%, #d5f7ee)' },
  { word: 'customers', bg: 'linear-gradient(90deg, #b8f5c8, #6ee7a8 60%, #e0fbe9)' },
  { word: 'operations', bg: 'linear-gradient(90deg, #8ff5ea, #4fe0d2 60%, #d0faf5)' },
]

// Types a word, holds, deletes it, then types the next one.
function RotatingWord() {
  const reduce = useReducedMotion()
  const [wi, setWi] = useState(0)
  const [n, setN] = useState(reduce ? rotating[0].word.length : 0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (reduce) return
    const full = rotating[wi].word
    let t
    if (phase === 'typing') {
      if (n < full.length) t = setTimeout(() => setN(n + 1), n === 0 ? 1100 : 85)
      else t = setTimeout(() => setPhase('deleting'), 1800)
    } else if (n > 0) {
      t = setTimeout(() => setN(n - 1), 45)
    } else {
      t = setTimeout(() => { setWi((wi + 1) % rotating.length); setPhase('typing') }, 250)
    }
    return () => clearTimeout(t)
  }, [n, phase, wi, reduce])

  const cur = rotating[wi]
  return (
    <span className="rot">
      <span className="rot-word" style={{ backgroundImage: cur.bg }}>{cur.word.slice(0, n) || '​'}</span>
      <span className={`type-caret ${reduce ? 'still' : ''}`} />
    </span>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.p className="availability" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="pulse-dot" /> Based in Coimbatore, Tamil Nadu, India
          </motion.p>
          <h1 aria-label="We build software that moves your business forward.">
            {lead.map((w, i) => (
              <span className="word-mask" key={i} aria-hidden="true">
                <motion.span className="word" initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.07 }}>{w}</motion.span>
              </span>
            ))}
            <span className="h1-line" aria-hidden="true">
              <motion.span className="rot-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.65 }}>
                <RotatingWord />
                <span className="forward">forward.</span>
              </motion.span>
            </span>
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.8 }}>
            From high-performing websites to custom platforms and intelligent automation, we turn complex business problems into software that works.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.95 }}>
            <Button href="#contact">Start a project</Button>
            <Button href="#work" variant="ghost-dark">Explore our work</Button>
          </motion.div>
          <motion.p className="hero-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}>
            Software for small businesses and first-time founders
          </motion.p>
        </div>
      </div>
    </section>
  )
}
