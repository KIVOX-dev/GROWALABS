import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Plus, Check, Layers, Rocket, RefreshCw, ChevronDown } from 'lucide-react'
import { why, faqs, moreFaqs, site, nav, services, engagements, techGroups } from '../data/content'
import { solutions } from '../data/solutions'
import { logoStack, TechLogo } from './StackTiles'
import { SectionHead, Reveal, Button, Logo, stagger, item, ease } from './Primitives'

export function Why() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <Reveal className="ab-head">
          <div>
            <p className="eyebrow">Why work with us</p>
            <h2>Small team. Thoughtful engineering. Real outcomes.</h2>
          </div>
          <p className="lede">We are deliberately small. That means no account managers between you and the people writing the code, and no process for the sake of process.</p>
        </Reveal>

        <div className="ab-story">
          <Reveal className="ab-lead">
            <p className="ab-tag"><MapPin size={14} aria-hidden="true" /> Coimbatore, Tamil Nadu, India</p>
            <h3>Big ideas should not need big budgets.</h3>
            <p className="ab-sub">Built for first-time founders and small businesses who were told that tech is too costly.</p>
          </Reveal>
          <Reveal className="ab-copy" delay={0.1}>
            <p>We are a small team from Coimbatore, a city that runs on small businesses and big hustle. We grew up around people who start with one idea, one shop and a lot of courage.</p>
            <p>Then they hear the quote for a website or an app, and the dream goes quiet. &ldquo;Tech is too costly.&rdquo; We have heard it a hundred times.</p>
            <p>So we do it differently. We start small, build what matters first, and grow the product as your business grows. No bloated packages, no jargon, no surprise bills. Just honest software at a price a new founder can say yes to.</p>
            <p className="ab-end">First business? First app? Start here.</p>
          </Reveal>
        </div>

        <motion.ul className="ab-cards" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
          {why.map((w, i) => (
            <motion.li key={w.title} variants={item}>
              <span className="ab-n">0{i + 1}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

const engageIcons = [Layers, Rocket, RefreshCw]

function EngageItem({ e, i }) {
  return (
    <motion.article className="eg-item" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease }}>
      <span className="eg-n">0{i + 1}</span>
      <h3>{e.title}</h3>
      <p>{e.text}</p>
      <p className="eg-fit">{e.fit}</p>
    </motion.article>
  )
}

// A 4 second looping "video": each step appears in turn, the dashed line draws to the next,
// then it holds for a second and plays again.
const NODE_AT = [0.2, 1.5, 2.8]
const LINE_AT = [0.9, 2.2]

function EngageFlow() {
  const reduce = useReducedMotion()
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (reduce) return
    const iv = setInterval(() => setRun((r) => r + 1), 5000)
    return () => clearInterval(iv)
  }, [reduce])
  return (
    <motion.div key={run} className="eg-flow" initial={{ opacity: 1 }} animate={reduce ? {} : { opacity: [1, 1, 0] }} transition={{ duration: 5, times: [0, 0.92, 1], ease: 'linear' }}>
      {engagements.map((e, i) => {
        const Icon = engageIcons[i % engageIcons.length]
        return (
          <div key={e.title} className="eg-step">
            <motion.div className="eg-node" initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: reduce ? 0 : NODE_AT[i], duration: 0.6, ease }}>
              <span className="eg-circle"><Icon size={26} strokeWidth={1.5} /></span>
              <b>{e.title}</b>
              <small>{e.fit}</small>
            </motion.div>
            {i < engagements.length - 1 && (
              <div className="eg-link">
                <motion.i initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: reduce ? 0 : LINE_AT[i], duration: 0.55, ease: 'linear' }} />
                <motion.span initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : LINE_AT[i] + 0.5, duration: 0.2 }}><ChevronDown size={14} /></motion.span>
              </div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

export function Engagement() {
  return (
    <section className="section" id="engagement">
      <div className="container">
        <SectionHead eyebrow="Working together" title="Ways to work with us.">
          There is no single package. We agree the shape of the engagement around your goals, and we are upfront about what is and is not a good fit.
        </SectionHead>
        <div className="eg">
          <div className="eg-list">
            {engagements.map((e, i) => <EngageItem key={e.title} e={e} i={i} />)}
          </div>
          <div className="eg-visual" aria-hidden="true"><EngageFlow /></div>
        </div>
      </div>
    </section>
  )
}

export function Tech() {
  return (
    <section className="tech">
      <div className="container">
        <p className="eyebrow">Technology we work with</p>
        <motion.div className="tech-groups" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {techGroups.map((g) => (
            <motion.div key={g.label} variants={item}>
              <h3>{g.label}</h3>
              <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState(0)
  const [paused, setPaused] = useState(false)
  const list = [...faqs, ...moreFaqs]
  const reduce = useReducedMotion()
  const AUTO_MS = 5000
  // Auto-advance through the questions; pauses on hover/focus.
  // A manual click restarts the timer because `open` changes.
  useEffect(() => {
    if (reduce || paused || open < 0) return
    const t = setTimeout(() => setOpen((o) => (o + 1) % list.length), AUTO_MS)
    return () => clearTimeout(t)
  }, [open, paused, reduce, list.length])
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <SectionHead eyebrow="FAQ" title="Questions, answered.">
          Straight answers to what people usually ask first. If yours is not here, just send it over.
        </SectionHead>
        <Reveal className="faq-list" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          {list.map((f, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" key={f.q}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}><Plus size={18} /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="faq-panel"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }}>
                      <p>{f.a}</p>
                      {!reduce && <span className="faq-timer" aria-hidden="true"><i key={`${open}-${paused}`} style={{ animationDuration: `${AUTO_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></span>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Opens the visitor's email client with the message prefilled. No backend, no fake success.
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const { email: to } = site.contact

  const validate = (v) => {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.'
    if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
    return e
  }
  const onChange = (k) => (ev) => {
    const next = { ...values, [k]: ev.target.value }
    setValues(next)
    if (errors[k]) setErrors({ ...errors, [k]: validate(next)[k] })
  }
  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    if (Object.keys(e).length) return
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Project enquiry from ' + values.name.trim())}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = (k, label, props = {}) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {k === 'message'
        ? <textarea id="f-message" rows="5" value={values.message} onChange={onChange(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? 'e-message' : undefined} {...props} />
        : <input id={`f-${k}`} value={values[k]} onChange={onChange(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />}
      <AnimatePresence>
        {errors[k] && <motion.p id={`e-${k}`} className="err" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{errors[k]}</motion.p>}
      </AnimatePresence>
    </div>
  )

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {field('name', 'Your name', { autoComplete: 'name' })}
      {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
      {field('message', 'What are you building?', { placeholder: 'A few lines on the problem, who it is for and any deadlines.' })}
      <button type="submit" className="btn btn-light"><span>Send as email</span></button>
      <p className="form-note" aria-live="polite">
        {sent
          ? `Your email app should now open with the message ready to send. If nothing opened, write to ${to} directly.`
          : 'This opens your email app with your message prefilled. Nothing is stored on this site.'}
      </p>
    </form>
  )
}

// Kept in the side margins so no card ever sits behind the message or the form.
const floaters = [
  { i: 0, x: '2.5%', y: '8%', d: 0 }, { i: 3, x: '7%', y: '38%', d: 1.2 }, { i: 6, x: '3%', y: '68%', d: 2.1 },
  { i: 1, x: '93%', y: '10%', d: 0.6 }, { i: 4, x: '89%', y: '42%', d: 1.8 }, { i: 7, x: '94%', y: '72%', d: 0.9 },
]

export function FinalCTA() {
  const { email } = site.contact
  return (
    <section className="cta" id="contact">
      <div className="cta-field" aria-hidden="true">
        {floaters.map((f, k) => (
          <span key={k} className="float-tile" style={{ left: f.x, top: f.y, animationDelay: `${-f.d}s` }}><TechLogo name={logoStack[f.i % logoStack.length].name} size={32} /></span>
        ))}
      </div>
      <div className="container cta-wrap">
        <div className="cta-frame">
          <Reveal as="h2">Have a problem worth solving?</Reveal>
          <Reveal as="p" delay={0.1} className="cta-sub">Tell us what you&rsquo;re building. We&rsquo;ll help you figure out the right next step.</Reveal>
          <Reveal as="ul" delay={0.2} className="cta-points">
            <li><Check size={14} /> A real reply from the people who would build it</li>
            <li><Check size={14} /> Honest advice, including when software is not the answer</li>
            <li><Check size={14} /> No obligation and no pressure</li>
          </Reveal>
          <Reveal delay={0.3}>
            <Button href={`mailto:${email}?subject=Project%20enquiry`} variant="light">Let&rsquo;s talk about your project</Button>
            <p className="cta-mail">{email}</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="cta-form"><ContactForm /></Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const { contact, socials, description } = site
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-lock"><Logo size={32} /><span className="brand-name">GrowALabs</span></span>
          <p>{description}</p>
        </div>
        <nav aria-label="Footer navigation">
          <h4>Navigate</h4>
          <ul>{nav.map((n) => <li key={n.href}><a href={`/${n.href}`}>{n.label}</a></li>)}</ul>
        </nav>
        <div className="footer-solutions">
          <h4>Solutions offered</h4>
          <ul>{solutions.map((s) => <li key={s.slug}><Link to={`/solutions/${s.slug}`}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{services.map((s) => <li key={s.id}><a href="/#services">{s.title}</a></li>)}</ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            {contact.phone && <li><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>}
            {contact.location && <li>{contact.location}</li>}
            {socials.map((s) => <li key={s.href}><a href={s.href} rel="noopener noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container footer-base">
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="footer-legal"><Link to="/terms">Terms and conditions</Link><Link to="/privacy">Privacy policy</Link></span>
      </div>
    </footer>
  )
}
