import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { restoreScroll, useHashRoute } from './hooks/useHashRoute'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedPos from './components/FeaturedPos'
import FeaturedCampusShare from './components/FeaturedCampusShare'
import FeaturedBookings from './components/FeaturedBookings'
import BookingsCaseStudy from './components/BookingsCaseStudy'
import FeaturedPayroll from './components/FeaturedPayroll'
import PayrollCaseStudy from './components/PayrollCaseStudy'
import Services from './components/Services'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PosCaseStudy from './components/PosCaseStudy'
import CampusShareCaseStudy from './components/CampusShareCaseStudy'
import CommandPalette from './components/CommandPalette'
import { prefersReducedMotion } from './components/ui'

function Home() {
  useEffect(restoreScroll, [])
  return (
    <>
      <Hero />
      <FeaturedPos />
      <FeaturedBookings />
      <FeaturedPayroll />
      <FeaturedCampusShare />
      <Services />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}

export default function App() {
  const route = useHashRoute()
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const reduce = prefersReducedMotion()

  // Ctrl/⌘+K opens the command palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--cx', `${e.clientX}px`)
        root.style.setProperty('--cy', `${e.clientY}px`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div id="top" className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      {/* Soft glow that follows the cursor across the whole page */}
      <div
        aria-hidden
        className="cursor-glow pointer-events-none fixed inset-0 -z-10"
      />
      <Navbar route={route} theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={route}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {route === 'pos' ? (
              <PosCaseStudy />
            ) : route === 'campusshare' ? (
              <CampusShareCaseStudy />
            ) : route === 'bookings' ? (
              <BookingsCaseStudy />
            ) : route === 'payroll' ? (
              <PayrollCaseStudy />
            ) : (
              <Home />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggle}
      />
    </div>
  )
}
