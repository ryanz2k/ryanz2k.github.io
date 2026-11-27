import { CERTIFICATIONS, EDUCATION, STACK } from '../data/content'
import { Chips, Reveal, Section } from './ui'

export default function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="Tools I work with"
      intro="Everything here is in code I’ve written and shipped, at work or on the projects above."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {STACK.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 0.04} className={`bg-surface p-6 ${i === 0 ? 'sm:col-span-2' : ''}`}>
            <h3 className={`text-sm font-semibold ${i === 0 ? 'text-accent' : 'text-fg'}`}>{g.group}</h3>
            <Chips items={g.items} className="mt-3" />
          </Reveal>
        ))}
      </div>

      <div id="education" className="mt-16 grid gap-6 md:grid-cols-2">
        <Reveal className="card p-6 sm:p-8">
          <p className="eyebrow">Education</p>
          <ul className="mt-5 space-y-5">
            {EDUCATION.map((e) => (
              <li key={e.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium text-fg">{e.title}</p>
                  <p className="flex-none font-mono text-xs text-subtle">{e.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
                {e.note && <p className="mt-1 text-sm text-accent">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.05} className="card p-6 sm:p-8">
          <p className="eyebrow">Certifications</p>
          <ul className="mt-5 space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] text-muted">
                <span aria-hidden className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
