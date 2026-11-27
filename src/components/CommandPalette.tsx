import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiBriefcase,
  FiCalendar,
  FiCopy,
  FiFileText,
  FiGithub,
  FiGrid,
  FiHome,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSearch,
  FiShoppingBag,
  FiSmartphone,
  FiSun,
  FiTool,
} from 'react-icons/fi'
import { PROFILE } from '../data/content'
import { goToSection } from '../hooks/useHashRoute'
import type { Theme } from '../hooks/useTheme'

interface Command {
  id: string
  group: string
  label: string
  hint?: string
  icon: ReactNode
  run: () => void | Promise<void>
  /** Keep the palette open and show this text after running. */
  feedback?: string
}

const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

export default function CommandPalette({
  open: isOpen,
  onClose,
  theme,
  onToggleTheme,
}: {
  open: boolean
  onClose: () => void
  theme: Theme
  onToggleTheme: () => void
}) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo<Command[]>(
    () => [
      { id: 'top', group: 'Go to', label: 'Home', icon: <FiHome />, run: () => goToSection('top') },
      { id: 'pos', group: 'Go to', label: 'Ryan’s POS case study', hint: 'Offline-first point of sale', icon: <FiShoppingBag />, run: () => void (window.location.hash = '#/pos') },
      { id: 'bookings', group: 'Go to', label: 'Ryan’s Bookings case study', hint: 'Booking with deposits', icon: <FiCalendar />, run: () => void (window.location.hash = '#/bookings') },
      { id: 'campus', group: 'Go to', label: 'CampusShare case study', hint: 'Android marketplace', icon: <FiSmartphone />, run: () => void (window.location.hash = '#/campusshare') },
      { id: 'services', group: 'Go to', label: 'Services for businesses', icon: <FiTool />, run: () => goToSection('services') },
      { id: 'experience', group: 'Go to', label: 'Experience', icon: <FiBriefcase />, run: () => goToSection('experience') },
      { id: 'projects', group: 'Go to', label: 'Projects', icon: <FiGrid />, run: () => goToSection('projects') },
      { id: 'stack', group: 'Go to', label: 'Stack, education and certifications', icon: <FiLayers />, run: () => goToSection('stack') },
      { id: 'contact', group: 'Go to', label: 'Contact', icon: <FiMail />, run: () => goToSection('contact') },
      { id: 'resume', group: 'Hire me', label: 'Open résumé (PDF)', icon: <FiFileText />, run: () => void open(PROFILE.resume) },
      {
        id: 'copy-email',
        group: 'Hire me',
        label: 'Copy email address',
        hint: PROFILE.email,
        icon: <FiCopy />,
        run: () => navigator.clipboard.writeText(PROFILE.email),
        feedback: 'Email copied',
      },
      { id: 'email', group: 'Hire me', label: 'Write me an email', icon: <FiMail />, run: () => void (window.location.href = `mailto:${PROFILE.email}`) },
      { id: 'linkedin', group: 'Hire me', label: 'LinkedIn', icon: <FiLinkedin />, run: () => void open(PROFILE.linkedin) },
      { id: 'github', group: 'Hire me', label: 'GitHub', icon: <FiGithub />, run: () => void open(PROFILE.github) },
      {
        id: 'theme',
        group: 'Preferences',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        icon: theme === 'dark' ? <FiSun /> : <FiMoon />,
        run: onToggleTheme,
        feedback: 'Theme switched',
      },
    ],
    [theme, onToggleTheme],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (!isOpen) return
    restoreFocus.current = document.activeElement as HTMLElement | null
    setQuery('')
    setIndex(0)
    setFeedback(null)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = prevOverflow
      restoreFocus.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const run = async (c: Command | undefined) => {
    if (!c) return
    try {
      await c.run()
    } catch {
      /* clipboard can be blocked; nothing else here can fail */
    }
    if (c.feedback) {
      setFeedback(c.feedback)
      window.setTimeout(onClose, 700)
    } else onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      void run(results[index])
    } else if (e.key === 'Tab') {
      e.preventDefault() // focus stays in the search box; arrows move the selection
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <FiSearch className="flex-none text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where to?"
                className="h-12 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
              />
              <kbd>Esc</kbd>
            </div>
            <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-subtle">Nothing matches “{query}”.</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup
                lastGroup = c.group
                return (
                  <li key={c.id} role="presentation">
                    {header && <p className="eyebrow px-3 pb-1.5 pt-3">{c.group}</p>}
                    <div
                      id={`cmd-${c.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => void run(c)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        i === index ? 'bg-raised text-fg' : 'text-muted'
                      }`}
                    >
                      <span className={i === index ? 'text-accent' : 'text-subtle'}>{c.icon}</span>
                      <span className="flex-1">{c.label}</span>
                      {c.hint && <span className="hidden truncate text-xs text-subtle sm:block">{c.hint}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-subtle">
              <span aria-live="polite" className={feedback ? 'text-accent' : ''}>
                {feedback ?? 'Tip: press Ctrl K anywhere'}
              </span>
              <span className="hidden gap-3 sm:flex">
                <span><kbd>↑</kbd> <kbd>↓</kbd> move</span>
                <span><kbd>Enter</kbd> open</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
