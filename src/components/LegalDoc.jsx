import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlignLeft, FileText, Home, Mail, ShieldCheck } from 'lucide-react'
import { site } from '../data/content'
import { solutions } from '../data/solutions'

// Shared docs-style layout for legal pages: sidebar, numbered content and a live "On this page" list.
// `sections`: [{ id, title, clauses: [{ title, text }] }]
export default function LegalDoc({ path, title, intro, updated, sections, showSolutionsIn, note }) {
  const fill = (t) => t.replaceAll('{name}', site.name).replaceAll('{email}', site.contact.email)

  const subs = useMemo(() => sections.flatMap((s, i) => s.clauses.map((c, k) => ({
    id: `${s.id}-${k + 1}`, sectionId: s.id, label: `${i + 1}.${k + 1}`, title: c.title, text: c.text,
  }))), [sections])
  const subSection = useMemo(() => Object.fromEntries(subs.map((x) => [x.id, x.sectionId])), [subs])

  const [activeSub, setActiveSub] = useState(subs[0].id)
  const activeSection = subSection[activeSub]
  const tocRef = useRef(null)

  useEffect(() => {
    document.title = `${title} | ${site.name}`
    return () => { document.title = `Custom software, SaaS and automation | ${site.name}` }
  }, [title])

  // Scroll spy: the active subsection is the last one whose heading has passed 30% of the screen height.
  useEffect(() => {
    setActiveSub(subs[0].id)
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.3
      let current = subs[0].id
      for (const x of subs) {
        const el = document.getElementById(x.id)
        if (el && el.getBoundingClientRect().top <= line) current = x.id
        else if (el) break
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = subs[subs.length - 1].id
      setActiveSub(current)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [subs])

  // Keep the active entry of the "On this page" list in view.
  useEffect(() => {
    const box = tocRef.current
    const link = box?.querySelector('a.sub.on')
    if (!box || !link) return
    const top = link.offsetTop - box.clientHeight / 2 + link.clientHeight / 2
    box.scrollTo({ top, behavior: 'smooth' })
  }, [activeSub])

  return (
    <>
      <section className="sp-hero td-hero">
        <div className="container">
          <Link to="/" className="sp-back"><ArrowLeft size={14} /> Back to home</Link>
          <p className="eyebrow">Legal</p>
          <h1 className="terms-h1">{title}</h1>
          <p className="lede">{fill(intro)}</p>
          <p className="terms-date">Last updated {updated}</p>
        </div>
      </section>

      <div className="container td">
        <aside className="td-left" aria-label="Legal pages">
          <p className="td-label">Legal</p>
          <Link to="/terms" className={`td-link ${path === '/terms' ? 'on' : ''}`}><FileText size={15} /> Terms and conditions</Link>
          <Link to="/privacy" className={`td-link ${path === '/privacy' ? 'on' : ''}`}><ShieldCheck size={15} /> Privacy policy</Link>
          <p className="td-label">Company</p>
          <Link to="/" className="td-link"><Home size={15} /> Home</Link>
          <a href="/#contact" className="td-link"><Mail size={15} /> Contact us</a>
        </aside>

        <main className="td-main">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="td-sec">
              <h2>{i + 1}. {s.title}</h2>
              {subs.filter((x) => x.sectionId === s.id).map((x) => (
                <div key={x.id} id={x.id} className="td-sub">
                  <h3>{x.label} {x.title}</h3>
                  <p>{fill(x.text)}</p>
                </div>
              ))}
              {s.id === showSolutionsIn && (
                <div className="terms-sol td-sol">
                  <p>Example solutions we can build:</p>
                  <ul>{solutions.map((x) => <li key={x.slug}><Link to={`/solutions/${x.slug}`}>{x.title}</Link></li>)}</ul>
                </div>
              )}
            </section>
          ))}
          <p className="terms-note">{note}</p>
        </main>

        <nav className="td-right" aria-label="On this page" ref={tocRef}>
          <p className="td-on"><AlignLeft size={16} /> On this page</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`sec ${activeSection === s.id ? 'on' : ''}`}>{i + 1}. {s.title}</a>
                {activeSection === s.id && (
                  <ol className="td-subs">
                    {subs.filter((x) => x.sectionId === s.id).map((x) => (
                      <li key={x.id}><a href={`#${x.id}`} className={`sub ${activeSub === x.id ? 'on' : ''}`}>{x.label} {x.title}</a></li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  )
}
