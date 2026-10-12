import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, Globe, Layers, Workflow, Server } from 'lucide-react'
import { nav, services, serviceDetails } from '../data/content'
import { solutionGroups } from '../data/solutions'
import { solutionIcons } from './solutionIcons'
import { Logo, ease } from './Primitives'

// Shared hover, click, outside-click and Escape behaviour for the header dropdowns.
function useDropdown() {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const wrap = useRef(null)
  const show = useCallback(() => { clearTimeout(timer.current); setOpen(true) }, [])
  const hide = useCallback(() => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 160) }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown) }
  }, [open])
  useEffect(() => () => clearTimeout(timer.current), [])
  return { open, setOpen, show, hide, wrap }
}

const serviceIcons = { web: Globe, saas: Layers, auto: Workflow, ai: Server }

function ServicesMenu() {
  const { open, setOpen, show, hide, wrap } = useDropdown()
  return (
    <div className="nav-drop" ref={wrap} onMouseEnter={show} onMouseLeave={hide}>
      <button className={`nav-drop-btn ${open ? 'on' : ''}`} aria-expanded={open} aria-controls="services-menu" onClick={() => setOpen((o) => !o)}>
        Services <ChevronDown size={14} className="chev" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="services-menu" className="mega mega-services" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease }}>
            <div className="mega-grid">
              {services.map((sv, gi) => {
                const Icon = serviceIcons[sv.id]
                return (
                  <div key={sv.id} className="mega-col">
                    <motion.a href="/#services" onClick={() => setOpen(false)} className="mega-svc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * gi, duration: 0.3, ease }}>
                      <span className="mega-ic">{Icon && <Icon size={20} strokeWidth={1.5} />}</span>
                      <b>{sv.title}</b>
                      <small>{sv.text}</small>
                    </motion.a>
                    <ul>
                      {(serviceDetails[sv.id] || []).map((pt, k) => (
                        <motion.li key={pt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * gi + 0.03 * (k + 1), duration: 0.3, ease }}>
                          <a href="/#services" onClick={() => setOpen(false)} className="mega-pt">{pt}</a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SolutionsMenu() {
  const { open, setOpen, show, hide, wrap } = useDropdown()

  return (
    <div className="nav-drop" ref={wrap} onMouseEnter={show} onMouseLeave={hide}>
      <button className={`nav-drop-btn ${open ? 'on' : ''}`} aria-expanded={open} aria-controls="solutions-menu" onClick={() => setOpen((o) => !o)}>
        Solutions <ChevronDown size={14} className="chev" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="solutions-menu" className="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease }}>
            <div className="mega-grid">
              {solutionGroups.map((g, gi) => (
                <div key={g.group} className="mega-col">
                  <p className="mega-h">{g.group}</p>
                  <ul>
                    {g.items.map((it, k) => {
                      const Icon = solutionIcons[it.icon]
                      return (
                        <motion.li key={it.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * gi + 0.03 * k, duration: 0.3, ease }}>
                          <Link to={`/solutions/${it.slug}`} onClick={() => setOpen(false)}>
                            <span className="mega-ic">{Icon && <Icon size={18} strokeWidth={1.5} />}</span>
                            <span><b>{it.title}</b><small>{it.headline}</small></span>
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="container nav-inner">
        <Link to="/" className="nav-brand" aria-label="GrowALabs home"><Logo /><span className="brand-name">GrowALabs</span></Link>
        <nav aria-label="Primary" className="nav-links">
          {nav.map((n) => (n.label === 'Services' ? <ServicesMenu key={n.href} /> : n.label === 'Solutions' ? <SolutionsMenu key={n.href} /> : <a key={n.href} href={`/${n.href}`}>{n.label}</a>))}
        </nav>
        <a href="/#contact" className="btn btn-primary btn-sm nav-cta"><span>Let&rsquo;s talk</span></a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="container mobile-menu-inner">
              {nav.map((n, i) => (
                <motion.a key={n.href} href={`/${n.href}`} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.3 }}>
                  {n.label}
                </motion.a>
              ))}
              <a href="/#contact" className="btn btn-primary" onClick={() => setOpen(false)}><span>Let&rsquo;s talk</span></a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
