import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { ease } from './Primitives'

const warn = /pending|due|overdue|absent|waiting|draft|review|late|queued|degraded|rejected|new|open|steady|preparing|sent|viewed/i

function Count({ to, pre = '', suf = '', on }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!on) return
    if (reduce) { setV(to); return }
    let raf, start
    const step = (t) => {
      start ??= t
      const p = Math.min(1, (t - start) / 1200)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [on, to, reduce])
  const dec = Number.isInteger(to) ? 0 : to < 10 ? 1 : (String(to).split('.')[1] || '').length
  return <>{pre}{v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suf}</>
}

function Chart({ c, on, tick }) {
  const max = Math.max(...c.data) || 1
  const hi = tick % c.data.length
  if (c.type === 'line') {
    const w = 300, h = 120, pad = 8
    const pts = c.data.map((v, i) => [pad + (i * (w - pad * 2)) / (c.data.length - 1), h - pad - (v / max) * (h - pad * 2)])
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
    return (
      <div className="sd-card sd-chart">
        <p className="sd-h">{c.title}</p>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="sd-line" aria-hidden="true">
          <defs><linearGradient id="sdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f8a70" stopOpacity=".25" /><stop offset="1" stopColor="#1f8a70" stopOpacity="0" /></linearGradient></defs>
          {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#e6ece9" vectorEffect="non-scaling-stroke" />)}
          <motion.path d={`${line} L${w - pad} ${h} L${pad} ${h} Z`} fill="url(#sdg)" initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }} />
          <motion.path d={line} fill="none" stroke="#1f8a70" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={{ duration: 1.4, ease: 'easeInOut' }} />
        </svg>
        <div className="sd-x">{c.labels.map((l) => <span key={l}>{l}</span>)}</div>
      </div>
    )
  }
  return (
    <div className="sd-card sd-chart">
      <p className="sd-h">{c.title}</p>
      <div className="sd-bars" aria-hidden="true">
        {c.data.map((v, i) => (
          <div key={i} className="sd-bar-col">
            <motion.i className={i === hi ? 'hi' : ''} initial={{ height: 0 }} animate={on ? { height: `${Math.max(4, (v / max) * 100)}%` } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease }} />
          </div>
        ))}
      </div>
      <div className="sd-x">{c.labels.map((l) => <span key={l}>{l}</span>)}</div>
    </div>
  )
}

const initials = (s) => s.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '•'

// Illustrative light-theme dashboard. All numbers come from the solution's sample data.
export default function Dashboard({ d }) {
  const ref = useRef(null)
  const on = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!on || reduce) return
    const iv = setInterval(() => setTick((t) => t + 1), 2400)
    return () => clearInterval(iv)
  }, [on, reduce])
  const t = d.table
  const cols = { gridTemplateColumns: `1.1fr ${'1fr '.repeat(t.cols.length - 1)}`.trim() }
  const cur = tick % t.rows.length
  const row = t.rows[cur]
  const stepNo = (tick % 3) + 1

  return (
    <div className="sd-stage" ref={ref} role="img" aria-label={`Sample ${d.app} dashboard with illustrative data`}>
      <div className="sd-window">
        <div className="sd-top">
          <span className="sd-ok"><Check size={14} strokeWidth={3} /></span>
          <div><b>{d.app}</b><small>Sample data</small></div>
        </div>
        <div className="sd-body">
          <ul className="sd-nav">
            {d.nav.map((n, i) => <li key={n} className={i === tick % d.nav.length ? 'on' : ''}>{n}</li>)}
          </ul>
          <div className="sd-main">
            <div className="sd-kpis">
              {d.kpis.map((k, i) => (
                <motion.div key={k.l} className="sd-kpi" initial={{ opacity: 0, y: 12 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 * i, duration: 0.5, ease }}>
                  <small>{k.l}</small>
                  <b><Count to={k.n} pre={k.pre} suf={k.suf} on={on} /></b>
                  <span>{k.d}</span>
                </motion.div>
              ))}
            </div>
            <div className="sd-split">
              <Chart c={d.chart} on={on} tick={tick} />
              <div className="sd-card sd-table">
                <p className="sd-h">{t.title}</p>
                <div className="sd-row head" style={cols}>{t.cols.map((c) => <span key={c}>{c}</span>)}</div>
                {t.rows.map((r, ri) => (
                  <motion.div key={ri} className={`sd-row ${ri === cur ? 'hl' : ''}`} style={cols} initial={{ opacity: 0, x: -8 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + ri * 0.08, duration: 0.4, ease }}>
                    {r.map((cell, ci) => ci === t.status
                      ? <span key={ci}><em className={`chip ${warn.test(cell) ? 'warn' : 'ok'}`}>{cell}</em></span>
                      : ci === 0 || ci === 1
                        ? <span key={ci} className="sd-who">{ci === (/^[\d#:]/.test(r[0]) ? 1 : 0) && <i>{initials(cell)}</i>}{cell}</span>
                        : <span key={ci}>{cell}</span>)}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-float" aria-hidden="true">
        <div className="sd-float-head"><b>Latest activity</b><small>Step {stepNo} of 3</small></div>
        <div className="sd-steps">{[1, 2, 3].map((n) => <i key={n} className={n <= stepNo ? 'on' : ''} />)}</div>
        <AnimatePresence mode="wait">
          <motion.div key={cur} className="sd-float-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease }}>
            <p>{row.slice(0, t.status).join(' · ')}</p>
            <em className={`chip ${warn.test(row[t.status]) ? 'warn' : 'ok'}`}>{row[t.status]}</em>
          </motion.div>
        </AnimatePresence>
        <span className="sd-float-btn">Open <ChevronRight size={14} /></span>
      </div>
    </div>
  )
}
