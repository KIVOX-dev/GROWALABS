import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const ease = [0.22, 1, 0.36, 1]

export function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo">
      <rect width="32" height="32" rx="7" fill="#0b2a22" />
      <path d="M7 21c0-6 4-9 9-9h9l-5 5h-4c-3 0-4 1-4 4z" fill="var(--mint)" />
      <path d="M25 11c0 6-4 9-9 9H7l5-5h4c3 0 4-1 4-4z" fill="var(--green-500)" />
    </svg>
  )
}

// Fades and lifts content in once when it enters the viewport.
export function Reveal({ children, delay = 0, y = 20, as = 'div', className, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Parent that staggers its child variants.
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
export const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }

export function Button({ href, variant = 'primary', children, arrow = true, ...rest }) {
  return (
    <a href={href} className={`btn btn-${variant}`} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />}
    </a>
  )
}

export function SectionHead({ eyebrow, title, children }) {
  return (
    <Reveal className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="lede">{children}</p>}
    </Reveal>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
