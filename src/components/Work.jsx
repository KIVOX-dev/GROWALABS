import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { work, caseDetails } from '../data/content'
import { SectionHead, stagger, item, ease } from './Primitives'

// Realistic interface mockups built from markup, one per project.
function Mock({ id }) {
  const bars = [30, 55, 42, 78, 60, 90, 68]
  if (id === 'ops') {
    return (
      <div className="m m-ops">
        <div className="m-side">{[1, 2, 3, 4].map((k) => <i key={k} />)}</div>
        <div className="m-main">
          <div className="m-kpis">{[0, 1, 2].map((k) => <div key={k}><i /><b /></div>)}</div>
          <div className="m-chart">
            {bars.map((h, i) => (
              <motion.span key={i} style={{ height: `${h}%`, originY: 1 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease }} />
            ))}
          </div>
          <div className="m-table">{[0, 1, 2].map((k) => <p key={k}><i /><i /><i /></p>)}</div>
        </div>
      </div>
    )
  }
  if (id === 'booking') {
    return (
      <div className="m m-book">
        <div className="m-cal">{Array.from({ length: 28 }).map((_, i) => <i key={i} className={[4, 9, 15, 16, 22].includes(i) ? 'on' : ''} />)}</div>
        <div className="m-slots">{['09:00', '10:30', '13:00', '15:30'].map((t, i) => <p key={t} className={i === 1 ? 'on' : ''}>{t}</p>)}</div>
      </div>
    )
  }
  return (
    <div className="m m-flow">
      {['Intake', 'Database', 'Notify'].map((t, i) => (
        <div key={t} className="m-node"><span>{t}</span>{i < 2 && <em />}</div>
      ))}
    </div>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead eyebrow="Selected work" title="Interfaces we design and engineer.">
          The projects below are self-initiated concepts that demonstrate our approach. They are not client work.
        </SectionHead>
        <motion.div className="work-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {work.map((w) => (
            <motion.article key={w.id} className={`project project-${w.size}`} variants={item}>
              <div className="project-media"><div className="project-zoom"><Mock id={w.id} /></div></div>
              <div className="project-body">
                <p className="eyebrow">{w.category}</p>
                <h3>{w.name}</h3>
                <p>{w.text}</p>
                <dl className="case">
                  <div><dt>Problem</dt><dd>{caseDetails[w.id].problem}</dd></div>
                  <div><dt>Approach</dt><dd>{caseDetails[w.id].approach}</dd></div>
                  <div><dt>Scope</dt><dd>{caseDetails[w.id].role}</dd></div>
                </dl>
                <ul className="tags">{w.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                {w.href && <a className="link" href={w.href}>View project <ArrowUpRight size={15} /></a>}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
