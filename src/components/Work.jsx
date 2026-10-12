import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { work } from '../data/content'
import { SectionHead, stagger, item } from './Primitives'

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead eyebrow="Selected work" title="Things we have built.">
          A client website, a product of our own, and a custom tool for an organisation. Each one is live, so you can open it and see.
        </SectionHead>
        <motion.div className="wk-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
          {work.map((w) => (
            <motion.article key={w.id} className="wk-card" variants={item}>
              <a className="wk-shot" href={w.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${w.name}`}>
                <span className="wk-bar"><i /><i /><i /><em>{w.host}</em></span>
                <span className="wk-img"><img src={w.img} alt={`${w.name} website screenshot`} loading="lazy" width="1440" height="650" /></span>
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
