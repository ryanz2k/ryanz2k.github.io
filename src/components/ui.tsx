import { motion, useReducedMotion } from 'framer-motion'

/** Synchronous check so reduced-motion users never see hidden-until-animated content. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
import type { ReactNode } from 'react'

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
      transition={{ duration: 0.45, delay, ease: [0.21, 0.6, 0.35, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  )
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
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
