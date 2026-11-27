import { useEffect, useState } from 'react'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'
import { PROFILE } from '../data/content'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <ul className="hidden items-center gap-1 sm:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
            className="rounded-md p-2.5 text-muted transition-colors hover:bg-raised hover:text-fg"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2.5 text-muted transition-colors hover:bg-raised hover:text-fg sm:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="page border-t border-line pb-4 pt-2 sm:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-1 py-3 text-base text-muted hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
