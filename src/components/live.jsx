import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// A rolling random-walk series, so charts keep moving. Static when motion is reduced.
export function useLiveSeries(length, ms, { min = 4, max = 42, step = 7 } = {}) {
  const reduce = useReducedMotion()
  const [series, setSeries] = useState(() => {
    let v = (min + max) / 2
    return Array.from({ length }, () => (v = Math.min(max, Math.max(min, v + (Math.random() - 0.5) * step * 2))))
  })
  useEffect(() => {
    if (reduce) return
    const iv = setInterval(() => {
      setSeries((s) => {
        const next = Math.min(max, Math.max(min, s[s.length - 1] + (Math.random() - 0.5) * step * 2))
        return [...s.slice(1), next]
      })
    }, ms)
    return () => clearInterval(iv)
  }, [ms, min, max, step, reduce])
  return series
}

export const linePath = (arr, w = 220, pad = 4) =>
  arr.map((y, i) => `${i ? 'L' : 'M'}${((i * w) / (arr.length - 1)).toFixed(1)} ${(y + pad).toFixed(1)}`).join(' ')

const pad2 = (n) => String(n).padStart(2, '0')
const stamp = (d) => `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`

const routes = [
  ['GET', '/api/orders', 200], ['GET', '/api/orders/:id', 200], ['POST', '/api/auth/login', 200],
  ['GET', '/api/reports', 200], ['PUT', '/api/customers/:id', 204], ['POST', '/api/bookings', 201],
  ['GET', '/api/health', 200], ['POST', '/api/webhooks/payment', 200],
]

// Generates a rolling log of plausible request lines.
export function useLiveLogs(count, ms) {
  const reduce = useReducedMotion()
  const make = (id) => {
    const r = routes[Math.floor(Math.random() * routes.length)]
    return { id, t: stamp(new Date()), m: r[0], p: r[1], s: r[2], ms: 20 + Math.floor(Math.random() * 140) }
  }
  const [logs, setLogs] = useState(() => Array.from({ length: count }, (_, i) => make(i)))
  useEffect(() => {
    if (reduce) return
    let id = count
    const iv = setInterval(() => setLogs((l) => [...l.slice(1), make(id++)]), ms)
    return () => clearInterval(iv)
  }, [count, ms, reduce])
  return logs
}
