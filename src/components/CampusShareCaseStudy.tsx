import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiMail } from 'react-icons/fi'
import { PROFILE } from '../data/content'
import {
  CAMPUS,
  CAMPUS_ADMIN_SHOTS,
  CAMPUS_FEATURES,
  CAMPUS_PROBLEMS,
  CAMPUS_SHOTS,
  CAMPUS_STACK,
  campusShot,
} from '../data/campusshare'
import { restoreScroll } from '../hooks/useHashRoute'
import HoldFlow from './HoldFlow'
import Lightbox, { type Shot } from './Lightbox'
import Phone from './Phone'
import { Chips, CountUp, Reveal } from './ui'

const withSrc = (list: { name: string; alt: string; caption: string }[]): Shot[] =>
  list.flatMap((s) => {
    const src = campusShot(s.name)
    return src ? [{ src, alt: s.alt, caption: s.caption }] : []
  })

export default function CampusShareCaseStudy() {
  const [zoom, setZoom] = useState<number | null>(null)
  useEffect(restoreScroll, [])
  useEffect(() => {
    const prev = document.title
    document.title = 'CampusShare — case study · John Ryan Gomez'
    return () => {
      document.title = prev
    }
  }, [])

  const phones = withSrc(CAMPUS_SHOTS)
  const admin = withSrc(CAMPUS_ADMIN_SHOTS)
  const all = [...phones, ...admin]

  return (
    <article className="pb-16">
      <header className="page pt-10 sm:pt-14">
        <a href="#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <FiArrowLeft size={14} /> Back to work
        </a>
        <Reveal>
          <p className="eyebrow mt-10">Case study · 2026 · Solo build</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl">{CAMPUS.name}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">
            {CAMPUS.tagline} {CAMPUS.pitch}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            {[
              { k: 'Role', v: 'Design, build, test' },
              { k: 'Platform', v: 'Android · web admin panel' },
              { k: 'Status', v: 'Pre-launch, test payments' },
              { k: 'Source', v: 'Private, on request' },
            ].map((d) => (
              <div key={d.k}>
                <dt className="eyebrow">{d.k}</dt>
                <dd className="mt-2 text-sm font-medium text-fg">{d.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* Phone screens */}
      {phones.length > 0 && (
        <div className="page mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10 p-5 sm:p-10">
              <ul className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 lg:grid-cols-6 lg:gap-5">
                {phones.map((p, i) => (
                  <li key={p.src} className="w-[58%] flex-none snap-center sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setZoom(i)}
                      className="block w-full cursor-zoom-in transition-transform duration-300 hover:-translate-y-1.5"
                      aria-label={`${p.caption} (view larger)`}
                    >
                      <Phone src={p.src} alt={p.alt} />
                    </button>
                    <p className="mt-3 text-center text-xs leading-snug text-subtle">{p.caption}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-sm text-subtle">
              Screens from a local build running on demo data. Every name and listing is made up.
            </p>
          </Reveal>
        </div>
      )}

      {/* Problem */}
      <section className="page mt-24 grid gap-10 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">The problem</p>
        <Reveal className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            Students sell and lend course materials through group chats, where the usual outcome of a bad deal is
            that someone has paid and the other person has stopped replying. Paying on meeting is safer but
            falls apart for rentals, where a deposit has to sit somewhere neutral.
          </p>
          <p>
            CampusShare gives both sides a wallet and makes the app the neutral party: money is locked at
            checkout, and it only moves when the hand-over is on record.
          </p>
        </Reveal>
      </section>

      {/* Hold flow */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <p className="eyebrow">The hand-over hold</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-subtle md:block">
              Step through one deal and watch where the money sits.
            </p>
          </div>
          <Reveal>
            <HoldFlow />
          </Reveal>
        </div>
      </section>

      {/* Hard parts */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Hard parts</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {CAMPUS_PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.05} className="card lift p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Admin panel */}
      {admin.length > 0 && (
        <section className="page mt-24">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <p className="eyebrow">Admin panel</p>
            <div className={`grid gap-6 ${admin.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {admin.map((a, i) => (
                <Reveal key={a.src} className={admin.length % 2 === 1 && i === 0 ? 'sm:col-span-2' : ''}>
                  <figure>
                    <button
                      type="button"
                      onClick={() => setZoom(phones.length + i)}
                      className="lift block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
                      aria-label={`${a.caption} (view larger)`}
                    >
                      <img src={a.src} alt={a.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
                    </button>
                    <figcaption className="mt-2 text-sm text-subtle">{a.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">What it does</p>
          <Reveal>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAMPUS_FEATURES.map((f) => (
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
                {CAMPUS.stats.map((q) => (
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
                The rules suite runs against the Firestore emulator with real sign-in contexts. Each hold case
                seeds its own deal and both profiles, then replays the exact batch the app writes, ledger rows
                and notifications included. It exists because rule bugs once reached a running build.
              </p>
              <p>
                <span className="text-fg">What I would change next.</span> With no server, a phone still does
                its own wallet arithmetic, and rules can check the shape of a write but not that a sum is
                right. The limits are written down in the repo, and the fix is to move balances behind a Cloud
                Function before real money goes in. Until then it runs on PayMongo test keys only.
              </p>
            </Reveal>
            <Reveal>
              <Chips items={CAMPUS_STACK} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page mt-24">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-fg">Want to see the code?</p>
              <p className="mt-1 text-muted">The repositories are private. I’m happy to walk an employer through them.</p>
            </div>
            <a href={`mailto:${PROFILE.email}?subject=CampusShare`} className="btn-primary flex-none">
              <FiMail size={15} /> Get in touch
            </a>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a href="#work" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <FiArrowLeft size={14} /> Back to work
          </a>
          <a href="#/pos" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            Next: POS System <FiArrowRight size={14} />
          </a>
        </div>
      </section>

      <Lightbox shots={all} index={zoom} onIndex={setZoom} />
    </article>
  )
}
