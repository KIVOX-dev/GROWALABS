import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { services, serviceDetails } from '../data/content'
import { SectionHead, stagger, item } from './Primitives'

const statement =
  'Most software problems are not technology problems. They are clarity problems. We start by understanding how your business actually works, then build only what moves it forward.'

// Words brighten one by one as the section scrolls through the viewport.
function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

export function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = statement.split(' ')
  return (
    <section className="statement" ref={ref} aria-label="Our approach">
      <div className="container">
        <p className="eyebrow">Our approach</p>
        <p className="statement-text">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </p>
      </div>
    </section>
  )
}

// Minimal line illustrations that draw themselves on entry.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: 'easeInOut', delay: 0.15 + i * 0.12 } }),
}
const glyphs = {
  web: [<rect key="a" x="4" y="6" width="40" height="30" rx="3" />, <path key="b" d="M4 14h40" />, <path key="c" d="M10 24h14M10 29h9" />],
  saas: [<path key="a" d="M6 38V22M16 38V12M26 38V26M36 38V16" />, <path key="b" d="M4 40h40" />],
  auto: [<circle key="a" cx="10" cy="24" r="5" />, <circle key="b" cx="38" cy="12" r="5" />, <circle key="c" cx="38" cy="36" r="5" />, <path key="d" d="M15 22l18-8M15 26l18 8" />],
  ai: [<ellipse key="a" cx="24" cy="12" rx="16" ry="6" />, <path key="b" d="M8 12v12c0 3.3 7 6 16 6s16-2.7 16-6V12" />, <path key="c" d="M8 24v12c0 3.3 7 6 16 6s16-2.7 16-6V24" />],
}

function Glyph({ id }) {
  return (
    <motion.svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {glyphs[id].map((p, i) => (
        <motion.g key={i} custom={i} variants={draw}>{p}</motion.g>
      ))}
    </motion.svg>
  )
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead eyebrow="Services" title="Everything you need to build and scale.">
          Four areas of work, one team. Use us for a single piece or the whole product, and expect the same standard of engineering either way.
        </SectionHead>
        <motion.div className="service-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {services.map((s, i) => (
            <motion.article key={s.id} className="service" variants={item}>
              <Glyph id={s.id} />
              <span className="service-idx">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="service-list">
                {serviceDetails[s.id].map((d) => (<li key={d}><Check size={13} aria-hidden="true" />{d}</li>))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
