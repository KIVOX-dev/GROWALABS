import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronsDown, Search, Bot, Send } from 'lucide-react'
import { solutions, bookingCards } from '../data/content'
import { SectionHead, ease } from './Primitives'

const N = solutions.length
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// Pin the section only on larger screens and when motion is allowed.
function usePinned() {
  const [pinned, setPinned] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 860px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return pinned
}

function useTyped(text, speed = 20, delay = 0) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) return
    let iv
    const t = setTimeout(() => {
      let i = 0
      iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv) }, speed)
    }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, speed, delay, reduce])
  return text.slice(0, n)
}

function useTick(ms) {
  const reduce = useReducedMotion()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (reduce) return
    const iv = setInterval(() => setT((x) => x + 1), ms)
    return () => clearInterval(iv)
  }, [ms, reduce])
  return t
}

const orders = [['#1042', 'Harbor Supply'], ['#1043', 'Lakeside Dental'], ['#1044', 'North Street Café'], ['#1045', 'Greenfield Co-op'], ['#1046', 'Westbrook Studio']]
const states = ['Packed', 'Shipped', 'Pending']

function TableMock() {
  const tick = useTick(1500)
  return (
    <div className="sm sm-table2">
      <div className="sm-top"><b>Orders</b><span className="sm-search"><Search size={11} /> Search</span><span className="sm-live"><span className="pulse-dot" /> Live</span></div>
      <div className="sm-row2 head"><span>ID</span><span>Customer</span><span>Status</span></div>
      {orders.map(([id, name], r) => {
        const s = states[(r + tick) % 3]
        return (
          <motion.div key={id} className="sm-row2" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + r * 0.09, duration: 0.45, ease }}>
            <code>{id}</code><span>{name}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.em key={s} className={`chip-${s}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>{s}</motion.em>
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

// Original flat illustrations for the booking cards (brand greens only).
function CardArt({ id }) {
  const m = 'var(--mint)'
  const art = {
    studio: (
      <>
        <circle cx="62" cy="40" r="25" fill="none" stroke={m} strokeWidth="2" />
        <circle cx="62" cy="40" r="14" fill={m} opacity="0.25" />
        <circle cx="62" cy="40" r="5" fill={m} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="62" y1="8" x2="62" y2="3" stroke={m} strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 62 40)`} opacity="0.7" />
        ))}
        <g className="art-float">
          <rect x="118" y="26" width="56" height="34" rx="5" fill="#0f3d31" stroke={m} strokeWidth="1.5" />
          <circle cx="146" cy="43" r="10" fill="none" stroke={m} strokeWidth="2" />
          <circle cx="146" cy="43" r="4" fill={m} />
          <rect x="128" y="21" width="16" height="6" rx="2" fill={m} opacity="0.8" />
        </g>
      </>
    ),
    consult: (
      <>
        <g className="art-float">
          <rect x="22" y="14" width="86" height="34" rx="9" fill="#0f3d31" stroke={m} strokeWidth="1.5" />
          <path d="M40 48l-4 12 16-12" fill="#0f3d31" stroke={m} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="34" y="26" width="52" height="3.5" rx="1.7" fill={m} />
          <rect x="34" y="34" width="34" height="3.5" rx="1.7" fill={m} opacity="0.5" />
        </g>
        <g className="art-float b">
          <rect x="96" y="38" width="82" height="30" rx="9" fill={m} opacity="0.9" />
          <path d="M156 68l5 9-17-9" fill={m} opacity="0.9" />
          <rect x="108" y="48" width="48" height="3.5" rx="1.7" fill="#0b2a22" />
          <rect x="108" y="56" width="30" height="3.5" rx="1.7" fill="#0b2a22" opacity="0.5" />
        </g>
      </>
    ),
    workshop: (
      <>
        <rect x="26" y="12" width="148" height="52" rx="4" fill="#0b2a22" stroke={m} strokeWidth="1.5" />
        {[[38, 22, 0.95], [66, 22, 0.55], [94, 22, 0.8], [38, 42, 0.55], [66, 42, 0.95], [122, 30, 0.7]].map(([x, y, o], i) => (
          <rect key={i} x={x} y={y} width="22" height="16" rx="2" fill={m} opacity={o} className={i % 2 ? 'art-float' : 'art-float b'} />
        ))}
        <line x1="122" y1="52" x2="162" y2="52" stroke={m} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="122" y1="44" x2="150" y2="44" stroke={m} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="60" y1="64" x2="52" y2="76" stroke={m} strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="64" x2="148" y2="76" stroke={m} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    followup: (
      <>
        <rect x="30" y="12" width="84" height="58" rx="6" fill="#0f3d31" stroke={m} strokeWidth="1.5" />
        <rect x="30" y="12" width="84" height="14" rx="6" fill={m} opacity="0.9" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={44 + (i % 4) * 20} cy={38 + Math.floor(i / 4) * 12} r="3" fill={m} opacity={i === 6 ? 1 : 0.35} />
        ))}
        <g className="art-float">
          <circle cx="146" cy="42" r="22" fill="#0b2a22" stroke={m} strokeWidth="2" />
          <path d="M135 42l8 8 15-17" fill="none" stroke={m} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </>
    ),
  }
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMid slice" className="sm-art" aria-hidden="true">
      {art[id]}
    </svg>
  )
}

function CardsMock() {
  const tick = useTick(1800)
  return (
    <div className="sm sm-cards">
      {bookingCards.map(({ title: t, art: id, img, alt }, c) => (
        <motion.div key={t} className="sm-card" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1 + c * 0.1, duration: 0.5, ease }}>
          <div className="sm-img">{img ? <img src={img} alt={alt} loading="lazy" className="sm-photo" /> : <CardArt id={id} />}<span className="shimmer" style={{ animationDelay: `${c * 0.4}s` }} /></div>
          <span className="sm-card-t">{t}</span>
          <span className={`sm-btn ${tick % 4 === c ? 'on' : ''}`}>{tick % 4 === c ? 'Booked' : 'Book'}</span>
        </motion.div>
      ))}
    </div>
  )
}

const flowSteps = ['Form submitted', 'Record saved', 'Team notified', 'Report updated']

function FlowMock() {
  const tick = useTick(900)
  const idx = tick % (flowSteps.length + 2)
  return (
    <div className="sm sm-flow2">
      {flowSteps.map((t, i) => (
        <motion.div key={t} className={`sm-step2 ${i < idx ? 'done' : i === idx ? 'run' : ''}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 0.4, ease }}>
          <span className="dot">{i < idx ? <Check size={11} /> : null}</span>
          <span className="lbl">{t}</span>
          <span className="meta">{i < idx ? 'done' : i === idx ? 'running' : 'queued'}</span>
        </motion.div>
      ))}
    </div>
  )
}

function ChatMock() {
  const answer = useTyped('Three orders are past their expected date. Two share the same supplier. Want a draft message to them?', 18, 1300)
  const done = answer.length > 90
  return (
    <div className="sm sm-chat">
      <div className="bot-card">
        <div className="bot-head">
          <span className="bot-av"><Bot size={16} /></span>
          <div><b>Your custom AI assistant</b><small><span className="bot-on" /> Trained on your orders and suppliers</small></div>
        </div>
        <div className="bot-msgs">
          <motion.p className="q" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Which orders are delayed this week?</motion.p>
          <motion.div className="dots" initial={{ opacity: 0 }} animate={{ opacity: answer.length ? 0 : 1 }} transition={{ delay: answer.length ? 0 : 0.5 }}><i /><i /><i /></motion.div>
          {answer && <p className="a">{answer}<span className="caret-s" /></p>}
          <motion.div className="sm-chip" initial={{ opacity: 0 }} animate={{ opacity: done ? 1 : 0 }}>Sources: orders, suppliers</motion.div>
        </div>
        <div className="bot-input">Ask your assistant anything<span><Send size={13} /></span></div>
      </div>
    </div>
  )
}

const mocks = { table: TableMock, cards: CardsMock, flow: FlowMock, chat: ChatMock }

function TabBar({ progress, i }) {
  const scaleX = useTransform(progress, (v) => clamp(v * N - i))
  return <motion.span className="tab-bar" style={{ scaleX }} aria-hidden="true" />
}

export default function Solutions() {
  const pinned = usePinned()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (pinned) setActive(Math.min(N - 1, Math.floor(clamp(v) * N * 0.999)))
  })

  const goTo = (i) => {
    if (!pinned) return setActive(i)
    const el = trackRef.current
    const range = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (range * (i + 0.5)) / N, behavior: 'smooth' })
  }

  const s = solutions[active]
  const Mock = mocks[s.mock]

  return (
    <section className="section sol-section" id="solutions">
      <div className="container">
        <SectionHead eyebrow="Solutions" title="Software shaped around how you work.">
          Every business has a different bottleneck. Keep scrolling and we will walk through the four places we most often help, and what that looks like in practice.
        </SectionHead>
      </div>
      <div className="sol-track" ref={trackRef} style={pinned ? { height: `${N * 250 + 40}vh` } : undefined}>
        <div className={pinned ? 'sol-sticky' : ''}>
          <div className="container">
            <div className="sol">
              <div className="sol-tabs" role="tablist" aria-label="Solution areas">
                {solutions.map((t, i) => (
                  <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={i === active} aria-controls={`panel-${t.id}`} tabIndex={i === active ? 0 : -1}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo((active + 1) % N) }
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo((active - 1 + N) % N) }
                    }}>
                    {i === active && <motion.span layoutId="tab-ind" className="tab-ind" transition={{ duration: 0.35, ease }} />}
                    <span className="tab-n">0{i + 1}</span><span>{t.tab}</span>
                    {pinned && <TabBar progress={scrollYProgress} i={i} />}
                  </button>
                ))}
              </div>
              <div className="sol-panel" role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`}>
                <AnimatePresence mode="wait">
                  <motion.div key={s.id} className="sol-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45, ease }}>
                    <div className="sol-copy">
                      <motion.span className="sol-count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>0{active + 1} / 0{N}</motion.span>
                      <motion.h3 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease }}>{s.title}</motion.h3>
                      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease }}>{s.text}</motion.p>
                      <ul>
                        {s.points.map((p, k) => (
                          <motion.li key={p} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.1, duration: 0.45, ease }}>
                            <ArrowRight size={14} aria-hidden="true" />{p}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <motion.div className="sol-visual" aria-hidden="true" initial={{ opacity: 0, scale: 0.96, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
                      <Mock />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {pinned && (
              <p className="sol-hint" aria-hidden="true"><ChevronsDown size={14} /> {active < N - 1 ? 'Keep scrolling' : 'Scroll on'}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
