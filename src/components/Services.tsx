import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { SERVICES, WORKING_TERMS } from '../data/content'
import { CountUp, Reveal, Section, onSpot, prefersReducedMotion } from './ui'

const inView = (delay: number) =>
  prefersReducedMotion()
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.35, delay },
      }

/** Sales queue on a till: three rows, the last one still waiting to sync. */
function SystemsArt() {
  const rows = [
    ['Flat white', 'synced'],
    ['Croissant', 'synced'],
    ['Iced mocha', 'queued'],
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 font-mono text-[10px]">
      {rows.map(([item, status], i) => (
        <motion.div
          key={item}
          {...inView(0.15 + i * 0.12)}
          className="flex items-center justify-between rounded-md border border-line bg-surface px-2.5 py-1.5 text-muted"
        >
          <span>{item}</span>
          <span className={status === 'synced' ? 'text-accent' : 'text-amber-500'}>{status}</span>
        </motion.div>
      ))}
    </div>
  )
}

/** A browser window with a page skeleton that fills in. */
function WebsiteArt() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-1.5 w-1.5 rounded-full bg-fg/20" />
        ))}
        <span className="ml-2 h-2 flex-1 rounded-full bg-raised" />
      </div>
      <div className="grid flex-1 grid-cols-[1.2fr_1fr] gap-2 p-2.5">
        <div className="flex flex-col justify-center gap-1.5">
          <motion.span {...inView(0.15)} className="h-2 w-4/5 rounded-full bg-fg/30" />
          <motion.span {...inView(0.25)} className="h-1.5 w-full rounded-full bg-fg/10" />
          <motion.span {...inView(0.3)} className="h-1.5 w-2/3 rounded-full bg-fg/10" />
          <motion.span {...inView(0.4)} className="mt-1 h-3 w-12 rounded bg-accent/70" />
        </div>
        <motion.div {...inView(0.3)} className="rounded-md bg-gradient-to-br from-accent/25 to-sky-500/20" />
      </div>
    </div>
  )
}

/** Bars that grow when scrolled into view: enquiries going up. */
function AdsArt() {
  const bars = [28, 36, 33, 48, 58, 72, 88]
  const reduce = prefersReducedMotion()
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`flex-1 origin-bottom rounded-t ${i >= 4 ? 'bg-accent/80' : 'bg-fg/15'}`}
          style={{ height: `${h}%` }}
          {...(reduce
            ? {}
            : {
                initial: { scaleY: 0 },
                whileInView: { scaleY: 1 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
              })}
        />
      ))}
    </div>
  )
}

const ART: Record<string, ReactNode> = {
  systems: <SystemsArt />,
  websites: <WebsiteArt />,
  ads: <AdsArt />,
}

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="For businesses"
      title="What I can build for you"
      intro="I take on a small number of client projects alongside my engineering work. Three things I do well, each with work on this page to back it up."
    >
      <ul className="grid gap-6 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <li key={s.id}>
            <Reveal delay={i * 0.07} className="h-full">
              <article onMouseMove={onSpot} className="card spot lift flex h-full flex-col p-6 sm:p-7">
                <div aria-hidden className="h-28 rounded-xl border border-line bg-bg p-3">
                  {ART[s.id]}
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-muted">
                      <FiCheck className="mt-0.5 flex-none text-accent" size={14} />
                      {p}
                    </li>
                  ))}
                </ul>

                {s.results && (
                  <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-line bg-bg p-4">
                    {s.results.map((r) => (
                      <div key={r.label}>
                        <dd className="text-lg font-semibold tracking-tight text-accent">
                          <CountUp value={r.value} />
                        </dd>
                        <dt className="mt-1 text-[11px] leading-snug text-subtle">{r.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}
                {s.resultsNote && <p className="mt-2 text-xs leading-snug text-subtle">{s.resultsNote}</p>}

                <a
                  href={s.proof.href}
                  className="group relative z-[2] mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg hover:text-accent"
                >
                  {s.proof.label}
                  <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {WORKING_TERMS.map((t) => (
            <li key={t.title} className="bg-surface p-5">
              <p className="text-sm font-semibold text-fg">{t.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
