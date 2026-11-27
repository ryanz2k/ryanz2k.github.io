import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FiCommand, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import type { Theme } from '../hooks/useTheme'
import type { Route } from '../hooks/useHashRoute'
import { PROFILE } from '../data/content'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

/** The section currently under the navbar, for the sliding highlight. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const onScroll = () => {
      let current: string | null = null
      for (const { id } of LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
      }
      // At the very bottom the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = LINKS[LINKS.length - 1].id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])
  return active
}

export default function Navbar({
  route,
  theme,
  onToggleTheme,
  onOpenPalette,
}: {
  route: Route
  theme: Theme
  onToggleTheme: () => void
  onOpenPalette: () => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(route === 'home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled || open ? 'border-line bg-bg/80' : 'border-transparent bg-bg/0'
      }`}
    >
      <nav className="page flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="text-sm font-semibold tracking-tight text-fg">
          {PROFILE.name}
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center md:flex">
            {LINKS.map((l) => (
              <li key={l.id} className="relative">
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-raised"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors hover:text-fg ${
                    active === l.id ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onOpenPalette}
            className="ml-1 hidden items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-xs text-subtle transition-colors hover:border-subtle hover:text-fg lg:inline-flex"
            aria-label="Open quick navigation"
          >
            Jump to… <kbd>Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            className="rounded-md p-2.5 text-muted transition-colors hover:bg-raised hover:text-fg lg:hidden"
            aria-label="Open quick navigation"
          >
            <FiCommand size={16} />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-md p-2.5 text-muted transition-colors hover:bg-raised hover:text-fg"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2.5 text-muted transition-colors hover:bg-raised hover:text-fg md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="page border-t border-line pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-1 py-3 text-base text-muted hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </header>
  )
}
