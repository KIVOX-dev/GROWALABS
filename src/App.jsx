import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Statement, Services } from './components/Services'
import Process from './components/Process'
import Solutions from './components/Solutions'
import Work from './components/Work'
import StackTiles from './components/StackTiles'
import { Why, Engagement, Tech, FAQ, FinalCTA, Footer } from './components/Closing'
import { ScrollProgress } from './components/Primitives'
import SolutionPage from './pages/SolutionPage'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Solutions />
      <Process />
      <Work />
      <Why />
      <Engagement />
      <Tech />
      <StackTiles />
      <FAQ />
      <FinalCTA />
    </>
  )
}

// New page: start at the top. Same page with a hash: let the browser scroll to it.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
