import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiMail } from 'react-icons/fi'
import { PROFILE } from '../data/content'
import {
  PAYROLL,
  PAYROLL_FEATURES,
  PAYROLL_PHONES,
  PAYROLL_PROBLEMS,
  PAYROLL_SCREENS,
  PAYROLL_STACK,
} from '../data/payroll'
import { restoreScroll } from '../hooks/useHashRoute'
import Lightbox from './Lightbox'
import PayslipDemo from './PayslipDemo'
import Phone from './Phone'
import { Chips, CountUp, Reveal } from './ui'

const STEPS = [
  ['Time comes in', 'Attendance logs are typed in or imported from a CSV, against each person’s schedule.'],
  ['Requests get decided', 'Leave, overtime and corrections wait for an approver. Only what is approved counts.'],
  ['The pay run is reviewed', 'Gross, contributions, tax and net for everyone in the period, with adjustments and loans.'],
  ['Payday is finalized', 'Payslips are issued and the period is locked as a snapshot.'],
]

export default function PayrollCaseStudy() {
  const [zoom, setZoom] = useState<number | null>(null)
  useEffect(restoreScroll, [])
  useEffect(() => {
    const prev = document.title
    document.title = 'HR & Payroll System — case study · John Ryan Gomez'
    return () => {
      document.title = prev
    }
  }, [])

  const [hero, ...screens] = PAYROLL_SCREENS
  const all = [...PAYROLL_SCREENS, ...PAYROLL_PHONES]

  return (
    <article className="pb-16">
      <header className="page pt-10 sm:pt-14">
        <a href="#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <FiArrowLeft size={14} /> Back to work
        </a>
        <Reveal>
          <p className="eyebrow mt-10">Case study · 2026 · Solo build</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl">{PAYROLL.name}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">
            {PAYROLL.tagline} {PAYROLL.pitch}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            {[
              { k: 'Role', v: 'Design, build, test' },
              { k: 'For', v: 'Small and mid-sized employers' },
              { k: 'Status', v: 'Front-end prototype; no server yet' },
              { k: 'Source', v: 'On request' },
            ].map((d) => (
              <div key={d.k}>
                <dt className="eyebrow">{d.k}</dt>
                <dd className="mt-2 text-sm font-medium text-fg">{d.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* Hero screenshot */}
      <section className="page mt-12">
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-blue-500/10 via-transparent to-sky-500/10 p-4 sm:p-10">
            <button
              type="button"
              onClick={() => setZoom(0)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-xl shadow-2xl shadow-black/40 ring-1 ring-black/10"
              aria-label={`${hero.caption} (view larger)`}
            >
              <img src={hero.src} alt={hero.alt} width={1440} height={900} decoding="async" className="block h-auto w-full" />
            </button>
            <figcaption className="mt-4 text-center text-sm text-subtle">
              Shown on a demo company, “Azure”. The company and every employee in it are made up.
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Problem */}
      <section className="page mt-24 grid gap-10 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">The problem</p>
        <Reveal className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            In a small company, payroll is usually a spreadsheet fed by a biometric export, a group chat of leave
            requests and someone’s memory of who had overtime. Every payday is rebuilt by hand, and nobody can say
            for sure why last month’s figure was what it was.
          </p>
          <p>
            The HR &amp; Payroll System keeps the whole chain in one place: time and requests feed the pay run,
            the pay run produces the payslips, and a payday that has been finalized is a record, not a formula
            that can still move.
          </p>
        </Reveal>
      </section>

      {/* Flow */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">From time log to payslip</p>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, b], i) => (
              <li key={t}>
                <Reveal delay={i * 0.04} className="card h-full p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <p className="mt-4 font-medium text-fg">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Payslip demo */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <p className="eyebrow">One payday, line by line</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-subtle md:block">
              How a monthly salary becomes take-home pay.
            </p>
          </div>
          <Reveal>
            <PayslipDemo />
          </Reveal>
        </div>
      </section>

      {/* Hard parts */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Hard parts</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PAYROLL_PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.05} className="card lift p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">For HR and payroll</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {screens.map((a, i) => (
              <Reveal key={a.src}>
                <figure>
                  <button
                    type="button"
                    onClick={() => setZoom(i + 1)}
                    className="lift block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
                    aria-label={`${a.caption} (view larger)`}
                  >
                    <img src={a.src} alt={a.alt} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
                  </button>
                  <figcaption className="mt-2 text-sm text-subtle">{a.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Phones */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">For the employee</p>
          <Reveal>
            <ul className="flex flex-wrap gap-6 sm:gap-10">
              {PAYROLL_PHONES.map((p, i) => (
                <li key={p.src} className="w-[44%] max-w-[230px]">
                  <button
                    type="button"
                    onClick={() => setZoom(PAYROLL_SCREENS.length + i)}
                    className="block w-full cursor-zoom-in transition-transform duration-300 hover:-translate-y-1.5"
                    aria-label={`${p.caption} (view larger)`}
                  >
                    <Phone src={p.src} alt={p.alt} />
                  </button>
                  <p className="mt-3 text-center text-xs leading-snug text-subtle">{p.caption}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">What it does</p>
          <Reveal>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {PAYROLL_FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Engineering */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Engineering</p>
          <div>
            <Reveal>
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {[
                  { value: '7', label: 'tests on payslip arithmetic and finalizing' },
                  { value: '7', label: 'tests on time records, overtime and approvals' },
                  { value: '8', label: 'tests on periods, loans, imports and access' },
                ].map((q) => (
                  <div key={q.label} className="bg-surface p-5">
                    <dd className="text-2xl font-semibold tracking-tight text-fg">
                      <CountUp value={q.value} />
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-subtle">{q.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                The pay and time rules are plain functions, kept apart from the screens, so the same code runs in
                the browser and under Node’s built-in test runner. The tests pin the awkward cases: tax at each
                bracket boundary, a salary changed after payday, a file imported twice.
              </p>
              <p>
                <span className="text-fg">Where it stands.</span> This is a working front-end prototype, not a
                product in use. Everything is saved in the browser, so there is no server, no real sign-in and
                no shared data between devices yet. Contribution rates and tax brackets are demo defaults that
                have not been checked by an accountant. A server with a real database and audit trail is the
                next step.
              </p>
            </Reveal>
            <Reveal>
              <Chips items={PAYROLL_STACK} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page mt-24">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-fg">Still running payroll from a spreadsheet?</p>
              <p className="mt-1 text-muted">I can walk you through the demo and what it would take to fit your pay rules.</p>
            </div>
            <a href={`mailto:${PROFILE.email}?subject=HR%20%26%20Payroll%20System`} className="btn-primary flex-none">
              <FiMail size={15} /> Get in touch
            </a>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a href="#work" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <FiArrowLeft size={14} /> Back to work
          </a>
          <a href="#/campusshare" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            Next: CampusShare <FiArrowRight size={14} />
          </a>
        </div>
      </section>

      <Lightbox shots={all} index={zoom} onIndex={setZoom} />
    </article>
  )
}
