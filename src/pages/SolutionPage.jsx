import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { bySlug, solutions } from '../data/solutions'
import { extra } from '../data/solutionsExtra'
import { solutionIcons } from '../components/solutionIcons'
import Dashboard from '../components/Dashboard'
import { Reveal, Button, stagger, item, ease } from '../components/Primitives'

export default function SolutionPage() {
  const { slug } = useParams()
  const s = bySlug(slug)
  useEffect(() => {
    if (s) document.title = `${s.title} | GrowALabs`
    return () => { document.title = 'Custom software, SaaS and automation | GrowALabs' }
  }, [s])
  if (!s) return <Navigate to="/" replace />

  const x = extra[s.slug]
  const Icon = solutionIcons[s.icon]
  const related = [...solutions.filter((x) => x.group === s.group && x.slug !== s.slug), ...solutions.filter((x) => x.group !== s.group)].slice(0, 3)

  return (
    <>
      <section className="sp-hero">
        <div className="container">
          <Link to="/" className="sp-back"><ArrowLeft size={14} /> All solutions</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="eyebrow">{s.group}</p>
            <h1><span className="sp-ic">{Icon && <Icon size={26} strokeWidth={1.5} />}</span>{s.title}</h1>
            <p className="lede">{s.headline}</p>
            <div className="sp-actions">
              <Button href="/#contact">Discuss this solution</Button>
              <a href="#sp-dash" className="btn btn-ghost"><span>See the dashboard</span></a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sp-dash-sec" id="sp-dash">
        <div className="container">
          <Reveal>
            <Dashboard d={s.dash} />
            <p className="sp-note">Concept preview with sample data. Your version is built around your own business and numbers.</p>
          </Reveal>
        </div>
      </section>

      {x && (
        <section className="section">
          <div className="container sp-two">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <h2>What we build for you.</h2>
            </Reveal>
            <Reveal delay={0.1} className="sp-prose">
              {x.overview.map((t) => <p key={t}>{t}</p>)}
            </Reveal>
          </div>
          <div className="container">
            <motion.ul className="sp-outcomes" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
              {x.outcomes.map(([t, d]) => (
                <motion.li key={t} variants={item}><h3>{t}</h3><p>{d}</p></motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container sp-two">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2>Why this matters.</h2>
            <p className="lede">{s.problem}</p>
            <p className="sp-aud"><b>Who it is for.</b> {s.audience}</p>
          </Reveal>
          <motion.ol className="sp-steps" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
            {s.steps.map(([t, d], i) => (
              <motion.li key={t} variants={item}>
                <span className="sp-n">0{i + 1}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">What is included</p>
            <h2>Features you can expect.</h2>
          </Reveal>
          <motion.ul className="sp-feats" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
            {s.features.map((f) => (
              <motion.li key={f} variants={item}><span className="tick"><Check size={14} /></span>{f}</motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {x && (
        <section className="section">
          <div className="container sp-two">
            <Reveal>
              <p className="eyebrow">In practice</p>
              <h2>A typical day with it.</h2>
              <blockquote className="sp-scenario">{x.scenario}</blockquote>
              <p className="sp-tools-h">Works with</p>
              <ul className="sp-tools">{x.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">Questions</p>
              <h2>Good to know.</h2>
              <div className="sp-faq">
                {x.faqs.map(([q, a]) => (
                  <details key={q}><summary>{q}</summary><p>{a}</p></details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head"><p className="eyebrow">Related solutions</p><h2>You may also need.</h2></Reveal>
          <div className="sp-related">
            {related.map((r) => {
              const RI = solutionIcons[r.icon]
              return (
                <Link key={r.slug} to={`/solutions/${r.slug}`} className="sp-rel">
                  <span className="mega-ic">{RI && <RI size={20} strokeWidth={1.5} />}</span>
                  <b>{r.title}</b>
                  <small>{r.headline}</small>
                  <span className="sp-more">View solution <ArrowRight size={14} /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta sp-cta">
        <div className="container cta-wrap">
          <div className="cta-frame">
            <Reveal as="h2">Want {s.title.toLowerCase()} for your business?</Reveal>
            <Reveal as="p" delay={0.1} className="cta-sub">Tell us how you work today. We will suggest a practical first version.</Reveal>
            <Reveal delay={0.2}><Button href="/#contact" variant="light">Start the conversation</Button></Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
