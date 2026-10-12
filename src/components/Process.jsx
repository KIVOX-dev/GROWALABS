import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Phone, RefreshCw, Rocket } from 'lucide-react'
import { steps, stepDetails } from '../data/content'
import { ease } from './Primitives'

function useTick(ms, on = true) {
  const reduce = useReducedMotion()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (reduce || !on) return
    const iv = setInterval(() => setT((x) => x + 1), ms)
    return () => clearInterval(iv)
  }, [ms, on, reduce])
  return t
}

// 01: a discovery call, with a live waveform and notes being captured.
function DiscoverVisual({ on }) {
  const tick = useTick(1100, on)
  const notes = ['Business goal', 'Who will use it', 'Constraints and deadlines', 'What success looks like']
  const idx = tick % (notes.length + 2)
  return (
    <div className="pv">
      <div className="pv-bar"><Phone size={13} /> Discovery call <span className="pv-live"><span className="pulse-dot" /> 00:{String(12 + (tick % 48)).padStart(2, '0')}</span></div>
      <div className="wave" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 0.12}s`, animationPlayState: on ? 'running' : 'paused' }} />)}
      </div>
      <ul className="notes">
        {notes.map((n, i) => (
          <li key={n} className={i < idx ? 'done' : i === idx ? 'run' : ''}>
            <span className="dot">{i < idx ? <Check size={10} /> : null}</span>{n}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 02: milestones filling in turn while the interface assembles.
function BuildVisual({ on }) {
  const tick = useTick(1000, on)
  const ms = ['Foundations', 'Core features', 'Integrations', 'Polish and review']
  const cycle = tick % (ms.length * 2 + 2)
  const done = Math.min(ms.length, Math.floor(cycle / 2))
  return (
    <div className="pv">
      <div className="pv-bar">Build <code>#{12 + Math.floor(tick / 8)}</code><span className="pv-live">milestone {Math.min(done + 1, ms.length)} of {ms.length}</span></div>
      <div className="build">
        <ul className="miles">
          {ms.map((m, i) => (
            <li key={m} className={i < done ? 'done' : i === done ? 'run' : ''}>
              <span>{m}</span>
              <span className="bar"><motion.i animate={{ scaleX: i < done ? 1 : i === done ? (cycle % 2 ? 0.7 : 0.25) : 0 }} transition={{ duration: 0.9, ease }} /></span>
            </li>
          ))}
        </ul>
        <div className="wire-ui" aria-hidden="true">
          <motion.span className="w-nav" animate={{ opacity: done >= 1 ? 1 : 0.15, y: done >= 1 ? 0 : 6 }} />
          <motion.span className="w-hero" animate={{ opacity: done >= 2 ? 1 : 0.15, y: done >= 2 ? 0 : 6 }} />
          <div className="w-row">
            <motion.span animate={{ opacity: done >= 3 ? 1 : 0.15, y: done >= 3 ? 0 : 6 }} />
            <motion.span animate={{ opacity: done >= 3 ? 1 : 0.15, y: done >= 3 ? 0 : 6 }} transition={{ delay: 0.12 }} />
            <motion.span animate={{ opacity: done >= 4 ? 1 : 0.15, y: done >= 4 ? 0 : 6 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 03: deploy, then keep improving: a rising chart and a loop.
function LaunchVisual({ on }) {
  const tick = useTick(1400, on)
  const visitors = 120 + tick * 7
  return (
    <div className="pv">
      <div className="pv-bar"><Rocket size={13} /> Release v1.{tick % 9}<span className="pv-live"><span className="pulse-dot" /> deployed</span></div>
      <div className="launch">
        <svg viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
          {[22, 44, 66].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="#1f2f29" vectorEffect="non-scaling-stroke" />)}
          <motion.path d="M0 80 C30 74 50 70 80 60 S130 48 160 36 S210 18 240 8 L240 90 L0 90 Z" fill="rgba(94,234,212,0.10)" stroke="none"
            initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 1.6, duration: 0.8 }} />
          <motion.path d="M0 80 C30 74 50 70 80 60 S130 48 160 36 S210 18 240 8" fill="none" stroke="var(--mint)" strokeWidth="2" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={{ duration: 2.2, ease: 'easeInOut' }} />
        </svg>
        <div className="stats">
          <div><small>Visitors today</small><b>{visitors.toLocaleString('en-US')}</b></div>
          <div><small>Load time</small><b>{(1.4 - (tick % 5) * 0.04).toFixed(2)}s</b></div>
          <div className="loop"><RefreshCw size={14} className="spin-slow" /> Measure, learn, improve</div>
        </div>
      </div>
    </div>
  )
}

const side = [
  { time: 'Typically 1 week', quote: 'We start by listening, so we build the right thing.', asks: ['Your goals and constraints', 'Examples you like', 'A decision maker to talk to'] },
  { time: 'Typically 2 to 8 weeks', quote: 'Short milestones, so you see progress, not promises.', asks: ['Quick feedback on each build', 'Content and brand assets', 'Sign-off at each milestone'] },
  { time: 'Ongoing', quote: 'Launch is the start. We measure and keep improving.', asks: ['Access to your hosting or domain', 'Real user feedback', 'Priorities for the next release'] },
]

function SidePanel({ active }) {
  const d = side[active]
  return (
    <div className="pr-side">
      <div className="pr-prog" aria-hidden="true">
        <motion.i animate={{ scaleY: (active + 1) / side.length }} transition={{ duration: 0.7, ease }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} className="pr-side-body" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
          <span className="pr-big">{steps[active].n}<small>/03</small></span>
          <p className="pr-time">{d.time}</p>
          <p className="pr-quote">{d.quote}</p>
          <p className="pr-asks-h">What we need from you</p>
          <ul>
            {d.asks.map((a, k) => (
              <motion.li key={a} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.1, duration: 0.4, ease }}>{a}</motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const visuals = [DiscoverVisual, BuildVisual, LaunchVisual]

// Original layered-hills scenes in the brand greens, used as card backdrops.
const scenes = [
  { sky: ['#0b2a22', '#14594d'], sun: '#5eead4', sx: 610, sy: 120, hills: ['#14594d', '#0e4a40', '#0a3a32'] },
  { sky: ['#cdeee4', '#8fd6c3'], sun: '#ffffff', sx: 170, sy: 110, hills: ['#4fb79c', '#2f9a83', '#1a7a68'] },
  { sky: ['#10372f', '#2a8c75'], sun: '#d5f7ee', sx: 400, sy: 150, hills: ['#1f7a66', '#155f51', '#0d4a3f'] },
]

function Backdrop({ i }) {
  const sc = scenes[i]
  const id = `sky-${i}`
  return (
    <svg className="pr-scene" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sc.sky[0]} /><stop offset="1" stopColor={sc.sky[1]} /></linearGradient>
        <radialGradient id={`${id}s`}><stop offset="0" stopColor={sc.sun} stopOpacity=".9" /><stop offset="1" stopColor={sc.sun} stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="420" fill={`url(#${id})`} />
      <circle className="pr-sun" cx={sc.sx} cy={sc.sy} r="110" fill={`url(#${id}s)`} />
      <circle cx={sc.sx} cy={sc.sy} r="26" fill={sc.sun} opacity=".95" />
      <g className="pr-cloud" opacity=".16" fill="#fff"><ellipse cx="140" cy="90" rx="70" ry="11" /><ellipse cx="190" cy="80" rx="46" ry="9" /></g>
      <g className="pr-cloud b" opacity=".12" fill="#fff"><ellipse cx="470" cy="60" rx="80" ry="10" /><ellipse cx="520" cy="72" rx="50" ry="8" /></g>
      <path d="M0 260 C120 210 220 250 340 215 S560 170 680 205 S780 230 800 220 V420 H0Z" fill={sc.hills[0]} />
      <path d="M0 310 C140 270 260 320 400 280 S640 250 800 290 V420 H0Z" fill={sc.hills[1]} />
      <path d="M0 360 C160 330 300 370 460 335 S700 320 800 345 V420 H0Z" fill={sc.hills[2]} />
    </svg>
  )
}

function StageCard({ s, i, detail, onActive }) {
  const ref = useRef(null)
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const seen = useInView(ref, { once: true, margin: '-12% 0px' })
  useEffect(() => { if (active) onActive(i) }, [active, i, onActive])
  const Visual = visuals[i]
  return (
    <motion.article ref={ref} id={`stage-${i}`} className="pr-card" initial={{ opacity: 0, y: 50 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }}>
      <div className="pr-media">
        <Backdrop i={i} />
        <motion.div className="pr-ui" aria-hidden="true" initial={{ opacity: 0, y: 36, scale: 0.96 }} animate={seen ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.9, ease, delay: 0.25 }}>
          <Visual on={seen} />
        </motion.div>
      </div>
      <div className="pr-cap">
        <p className="pr-eyebrow">Stage {s.n} <span>·</span> {detail.output.replace('Output: ', '')}</p>
        <h3>{s.title}</h3>
        <p className="pr-text">{s.text}</p>
        <ul>
          {detail.gets.map((g, k) => (
            <motion.li key={g} initial={{ opacity: 0, x: -10 }} animate={seen ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + k * 0.12, duration: 0.5, ease }}><Check size={13} aria-hidden="true" />{g}</motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Process() {
  const [active, setActive] = useState(0)
  const onActive = useCallback((i) => setActive(i), [])
  const jump = (i) => {
    const el = document.getElementById(`stage-${i}`)
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -Math.max(80, (window.innerHeight - el.offsetHeight) / 2), duration: 2.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return (
    <section className="process" id="process">
      <div className="container">
        <motion.div className="process-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
          <p className="eyebrow">How we work</p>
          <h2>A clear path from problem to product.</h2>
          <p className="lede">Three stages, each with a tangible result. You always know what is happening, what comes next and what you will have at the end of it.</p>
        </motion.div>
        <div className="pr-layout">
          <div className="pr-rail">
            <nav className="pr-nav" aria-label="Stages">
              {steps.map((s, i) => (
                <button key={s.n} className={i === active ? 'on' : ''} onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined}>
                  <span className="sq" /> {s.title}
                </button>
              ))}
            </nav>
            <SidePanel active={active} />
          </div>
          <div className="pr-cards">
            {steps.map((s, i) => <StageCard key={s.n} s={s} i={i} detail={stepDetails[i]} onActive={onActive} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
