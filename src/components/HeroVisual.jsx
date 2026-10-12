import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Server, Database, Workflow, Check, LoaderCircle } from 'lucide-react'
import { ease } from './Primitives'
import { useLiveSeries, linePath } from './live'

const services = [
  { name: 'app-frontend', Icon: Globe, status: 'live', inst: 2, rps: 412 },
  { name: 'app-api', Icon: Server, status: 'deploying', inst: 3, rps: 1284 },
  { name: 'app-database', Icon: Database, status: 'available', inst: 1, rps: 96 },
  { name: 'app-worker', Icon: Workflow, status: 'live', inst: 2, rps: 38 },
  { name: 'app-admin', Icon: Globe, status: 'live', inst: 1, rps: 54 },
  { name: 'app-cache', Icon: Database, status: 'available', inst: 1, rps: 2210 },
]

const statusText = { live: 'Live', deploying: 'Deploying', available: 'Available' }

function Spark({ label, unit, scale, offset = 0, delay = 0 }) {
  const s = useLiveSeries(22, 1100 + delay, { min: 6, max: 34, step: 5 })
  const last = s[s.length - 1]
  return (
    <div className="rv-metric">
      <div className="rv-metric-head"><span>{label}</span><b>{Math.round(offset + last * scale)}{unit}</b></div>
      <svg viewBox="0 0 220 40" preserveAspectRatio="none" aria-hidden="true">
        <path d={linePath(s, 220, 3)} fill="none" stroke="var(--green-500)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function Requests({ base }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(base)
  useEffect(() => {
    if (reduce) return
    const iv = setInterval(() => setN(Math.max(1, Math.round(base * (1 + (Math.random() - 0.5) * 0.12)))), 1300)
    return () => clearInterval(iv)
  }, [base, reduce])
  return <b>{n.toLocaleString('en-US')}</b>
}

function Card({ s, i }) {
  const { Icon } = s
  return (
    <motion.article className="rv-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.1 }}>
      <header>
        <span className="rv-name"><Icon size={13} /> {s.name}</span>
        <span className={`rv-status st-${s.status}`}>
          {s.status === 'deploying' ? <LoaderCircle size={12} className="spin" /> : <Check size={12} />}
          {statusText[s.status]}
        </span>
      </header>
      <div className="rv-metrics">
        <Spark label="Memory" unit=" MB" scale={11} offset={90} delay={i * 90} />
        <Spark label="CPU" unit="%" scale={1.7} delay={i * 90 + 40} />
      </div>
      <footer>
        <span>Instances <b>{s.inst}</b></span>
        <span>Req / min <Requests base={s.rps} /></span>
      </footer>
    </motion.article>
  )
}

export default function HeroVisual() {
  return (
    <div className="rv" role="img" aria-label="Illustration of a production dashboard with live service cards showing status, memory, CPU and request metrics">
      <div className="rv-cells" aria-hidden="true" />

      <motion.div className="rv-push" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease }} aria-hidden="true">
        <span className="rv-chip">$ git push</span>
        <svg className="rv-wire" width="37" height="64" viewBox="0 0 37 64" fill="none">
          <path d="M1 0V40a8 8 0 0 0 8 8H37" stroke="#2c4139" strokeWidth="1" />
          <motion.path d="M1 0V40a8 8 0 0 0 8 8H37" stroke="var(--green-500)" strokeWidth="1.5" strokeDasharray="6 70"
            animate={{ strokeDashoffset: [0, -76] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} />
        </svg>
      </motion.div>

      <span className="rv-sq rv-sq-a" aria-hidden="true"><i /><i /></span>
      <span className="rv-sq rv-sq-b" aria-hidden="true"><i /><i /><i /></span>

      <motion.div className="rv-panel" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }}>
        <p className="rv-label">Production</p>
        <div className="rv-cards">
          {services.map((s, i) => <Card key={s.name} s={s} i={i} />)}
        </div>
      </motion.div>
    </div>
  )
}
