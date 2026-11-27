import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

/** Synchronous check so reduced-motion users never see hidden-until-animated content. */
// eslint-disable-next-line react-refresh/only-export-components
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const EASE = [0.21, 0.6, 0.35, 1] as [number, number, number, number]

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion() || prefersReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Counts up to the number inside `value` ("4,100+", "~59k", "100%") the first
 * time it scrolls into view. Screen readers always get the final value.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = prefersReducedMotion()
  const match = value.match(/^(\D*)([\d,]+)(.*)$/)
  const animated = !reduce && !!match

  useEffect(() => {
    const node = ref.current
    const m = value.match(/^(\D*)([\d,]+)(.*)$/)
    if (!node || !m || reduce || !inView) return
    const target = Number(m[2].replace(/,/g, ''))
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = m[1] + Math.round(v).toLocaleString('en-US') + m[3]
      },
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {animated && match ? `${match[1]}0${match[3]}` : value}
      </span>
    </span>
  )
}

/** Mouse handler for `.spot` elements: moves the soft highlight under the cursor. */
// eslint-disable-next-line react-refresh/only-export-components
export function onSpot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-24">
      <div className="page">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export function Chips({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ExternalLink({
  href,
  children,
  className = '',
  onMouseMove,
}: {
  href: string
  children: ReactNode
  className?: string
  onMouseMove?: (e: MouseEvent<HTMLElement>) => void
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onMouseMove={onMouseMove}>
      {children}
    </a>
  )
}
