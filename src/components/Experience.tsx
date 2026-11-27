import { EXPERIENCE } from '../data/content'
import { Chips, Reveal, Section } from './ui'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve been building"
      intro="Enterprise software by day, with a long run of client work for businesses in the US, Australia and the UK."
    >
      <ol className="relative space-y-6">
        {EXPERIENCE.map((job, i) => (
          <li key={job.org + job.role}>
            <Reveal delay={i * 0.05}>
              <article className="card grid gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr]">
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
    </Section>
  )
}
