import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { EXPERIENCE } from '../data/content'
import { Chips, Reveal, Section, onSpot } from './ui'

export default function Experience() {
  // The rail on the left fills in as the list scrolls past.
  const rail = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: rail, offset: ['start 0.75', 'end 0.55'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve been building"
      intro="Enterprise software by day, with a long run of client work for businesses in the US, Australia and the UK."
    >
      <div ref={rail} className="relative">
        <div aria-hidden className="absolute bottom-6 left-[7px] top-9 hidden w-px bg-line md:block">
          <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY: fill }} />
        </div>
        <ol className="relative space-y-6 md:pl-10">
        {EXPERIENCE.map((job, i) => (
          <li key={job.org + job.role} className="relative">
            <span
              aria-hidden
              className="absolute -left-10 top-8 hidden h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg md:block"
            />
            <Reveal delay={i * 0.05}>
              <article onMouseMove={onSpot} className="card spot grid gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr]">
                <header>
                  <p className="font-mono text-xs text-subtle">{job.period}</p>
                  <p className="mt-3 text-base font-semibold text-fg">{job.org}</p>
                  <p className="mt-1 text-sm text-muted">{job.meta}</p>
                </header>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{job.role}</h3>
                  {job.points.length > 0 && (
                    <ul className="mt-4 space-y-3">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.clients && (
                    <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
                      {job.clients.map((c) => (
                        <li key={c.name} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <div>
                            <p className="text-sm font-medium text-fg">
                              {c.name} <span className="font-normal text-subtle">· {c.role}</span>
                            </p>
                            {c.note && <p className="mt-1 text-sm text-muted">{c.note}</p>}
                            {c.results && (
                              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                {c.results.map((r) => (
                                  <li key={r} className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <p className="flex-none font-mono text-xs text-subtle">{c.period}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tags && <Chips items={job.tags} className="mt-5" />}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  )
}
