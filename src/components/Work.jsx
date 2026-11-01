import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { work } from '../data/content'
import { SectionHead, stagger, item } from './Primitives'

const STAMP_COLOR = { Completed: '#5a9f16', 'Under review': '#c27a10', 'Under maintenance': '#b4281e' }
const star = (cx, cy, r) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 ? r * 0.45 : r
    return `${(cx + d * Math.cos(a)).toFixed(1)},${(cy + d * Math.sin(a)).toFixed(1)}`
  }).join(' ')

// Round rubber-stamp seal: double ring, curved text, stars, check mark and a tilted banner.
function Stamp({ label }) {
  const c = STAMP_COLOR[label] || '#5a9f16'
  const text = label.toUpperCase()
  const fs = text.length > 14 ? 11 : text.length > 10 ? 17 : 22
  const arc = text.length > 14 ? 11 : 14
  const id = text.replace(/\W/g, '')
  return (
    <svg className="wk-stamp" viewBox="0 0 200 200" role="img" aria-label={label}>
      <defs>
        <filter id={`rough-${id}`}><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" /><feDisplacementMap in="SourceGraphic" scale="2.2" /></filter>
        <path id={`top-${id}`} d="M 23,100 A 77 77 0 0 1 177,100" />
        <path id={`bot-${id}`} d="M 17,100 A 83 83 0 0 0 183,100" />
      </defs>
      <g filter={`url(#rough-${id})`} fill={c} stroke={c}>
        <circle cx="100" cy="100" r="97" fill="#fff" fillOpacity="0.82" stroke="none" />
        <circle cx="100" cy="100" r="93" fill="none" strokeWidth="4" />
        <circle cx="100" cy="100" r="62" fill="none" strokeWidth="2" />
        <text fontSize={arc} fontWeight="700" letterSpacing="2" stroke="none" textAnchor="middle"><textPath href={`#top-${id}`} startOffset="50%">{`• ${text} •`}</textPath></text>
        <text fontSize={arc} fontWeight="700" letterSpacing="2" stroke="none" textAnchor="middle"><textPath href={`#bot-${id}`} startOffset="50%">{`• ${text} •`}</textPath></text>
        <polygon points={star(100, 55, 9)} stroke="none" />
        <polygon points={star(80, 62, 6)} stroke="none" />
        <polygon points={star(120, 62, 6)} stroke="none" />
        <path d="M 84 143 L 95 154 L 118 126" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <g transform="rotate(-10 100 100)">
          <rect x="14" y="78" width="172" height="44" rx="6" stroke="none" />
          <rect x="18" y="82" width="164" height="36" rx="4" fill="none" stroke="#fff" strokeWidth="1.2" />
          <text x="100" y="100" fontSize={fs} fontWeight="800" letterSpacing={text.length > 14 ? 0.4 : 1.5} textAnchor="middle" dominantBaseline="central" fill="#fff" stroke="none">{text}</text>
        </g>
      </g>
    </svg>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead eyebrow="Selected work" title="Things we have built.">
          Client websites, a product of our own, and a custom tool for an organisation. Each one is live, so you can open it and see.
        </SectionHead>
        <motion.div className="wk-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
          {work.map((w) => (
            <motion.article key={w.id} className="wk-card" variants={item}>
              <a className="wk-shot" href={w.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${w.name}`}>
                <span className="wk-bar"><i /><i /><i /><em>{w.host}</em></span>
                <span className="wk-img"><img src={w.img} alt={`${w.name} website screenshot`} loading="lazy" width="1440" height="650" /></span>
                {w.stamp && <Stamp label={w.stamp} />}
              </a>
              <div className="wk-body">
                <p className="eyebrow">{w.category}</p>
                <h3>{w.name}</h3>
                <p>{w.text}</p>
                <ul className="tags">{w.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a className="link" href={w.href} target="_blank" rel="noopener noreferrer">Visit {w.host} <ArrowUpRight size={15} /></a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
