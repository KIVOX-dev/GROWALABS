import { AnimatePresence, motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { useLiveLogs, useLiveSeries, linePath } from './live'

// Live request log with a memory graph, in the spirit of an observability console.
export default function LiveLogs() {
  const logs = useLiveLogs(6, 1300)
  const mem = useLiveSeries(32, 900, { min: 8, max: 34, step: 4 })
  const cpu = useLiveSeries(32, 900, { min: 14, max: 38, step: 5 })

  return (
    <div className="hv-window live" aria-hidden="true">
      <div className="live-bar">
        <span className="live-filter">All logs <ChevronDown size={12} /></span>
        <span className="live-search"><Search size={12} /> Search</span>
        <span className="live-badge"><span className="pulse-dot" /> Live</span>
      </div>
      <div className="live-grid">
        <ul className="live-logs">
          <AnimatePresence initial={false}>
            {logs.map((l) => (
              <motion.li key={l.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <time>{l.t}</time>
                <b className={`m-${l.m}`}>{l.m}</b>
                <code>{l.p}</code>
                <span className="st">{l.s}</span>
                <span className="ms">{l.ms}ms</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="live-chart">
          <span className="live-chart-title">Memory and CPU</span>
          <svg viewBox="0 0 220 48" preserveAspectRatio="none">
            <path d={linePath(cpu, 220, 4)} fill="none" stroke="#2f6f60" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <path d={linePath(mem, 220, 4)} fill="none" stroke="var(--mint)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  )
}
