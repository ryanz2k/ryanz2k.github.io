import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiMail } from 'react-icons/fi'
import { PROFILE } from '../data/content'
import {
  BOOKINGS,
  BOOKINGS_FEATURES,
  BOOKINGS_OWNER,
  BOOKINGS_PHONES,
  BOOKINGS_PROBLEMS,
  BOOKINGS_STACK,
} from '../data/bookings'
import { restoreScroll } from '../hooks/useHashRoute'
import Lightbox from './Lightbox'
import Phone from './Phone'
import SlotRace from './SlotRace'
import { Chips, CountUp, Reveal, prefersReducedMotion } from './ui'

/** The booking-flow recording inside a phone bezel; plays only while on screen. */
function FlowVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[1.6rem] border border-white/10 bg-zinc-900 p-1.5 shadow-2xl shadow-black/50">
      <video
        ref={ref}
        src={BOOKINGS.video}
        poster={BOOKINGS_PHONES[0].src}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        className="block h-auto w-full rounded-[1.25rem]"
        aria-label="Recording of a booking from the landing page to confirmation, then the owner’s calendar"
      />
    </div>
  )
}

export default function BookingsCaseStudy() {
  const [zoom, setZoom] = useState<number | null>(null)
  useEffect(restoreScroll, [])
  useEffect(() => {
    const prev = document.title
    document.title = 'Booking System — case study · John Ryan Gomez'
    return () => {
      document.title = prev
    }
  }, [])

  const all = [...BOOKINGS_PHONES, ...BOOKINGS_OWNER]

  return (
    <article className="pb-16">
      <header className="page pt-10 sm:pt-14">
        <a href="#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <FiArrowLeft size={14} /> Back to work
        </a>
        <Reveal>
          <p className="eyebrow mt-10">Case study · 2026 · Solo build</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl">{BOOKINGS.name}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">
            {BOOKINGS.tagline} {BOOKINGS.pitch}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            {[
              { k: 'Role', v: 'Design, build, test' },
              { k: 'For', v: 'Salons, clinics, studios' },
              { k: 'Status', v: 'Built and tested; public demo coming' },
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

      {/* Recording + what it shows */}
      <section className="page mt-12">
        <Reveal>
          <div className="grid items-center gap-10 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-rose-500/10 via-transparent to-emerald-500/10 p-6 sm:p-10 md:grid-cols-[auto_1fr]">
            <FlowVideo />
            <div>
              <p className="eyebrow">30-second recording</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                From “Book now” to the owner’s calendar
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  ['Pick a service', 'Prices and durations up front, one or several services.'],
                  ['Pick a person and a time', 'Only times that fit the service, the breaks and the closing hour.'],
                  ['Pay the deposit', 'The time is held while paying. The cancellation rule is shown before the money moves.'],
                  ['It’s on the calendar', 'The owner sees it at once, under the right staff member.'],
                ].map(([t, b], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-fg">{t}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-subtle">
                Recorded on a demo shop, “Tala Salon &amp; Spa”. The business and every name in it are made up.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Problem */}
      <section className="page mt-24 grid gap-10 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">The problem</p>
        <Reveal className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            A small salon takes bookings by chat and phone, keeps them in a notebook, and loses money two ways:
            customers who never show up, and two customers promised the same chair.
          </p>
          <p>
            The Booking System takes a deposit before the time is confirmed, and makes the double booking
            impossible instead of unlikely. It is built to be rebranded for a shop in minutes: name, colour and
            logo are settings.
          </p>
        </Reveal>
      </section>

      {/* Slot race */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <p className="eyebrow">One slot, two people</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-subtle md:block">
              What happens when two customers want the same time.
            </p>
          </div>
          <Reveal>
            <SlotRace />
          </Reveal>
        </div>
      </section>

      {/* Hard parts */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Hard parts</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BOOKINGS_PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.05} className="card lift p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer screens */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">For the customer</p>
          <Reveal>
            <ul className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-5">
              {BOOKINGS_PHONES.map((p, i) => (
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
          </Reveal>
        </div>
      </section>

      {/* Owner screens */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">For the owner</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {BOOKINGS_OWNER.map((a, i) => (
              <Reveal key={a.src}>
                <figure>
                  <button
                    type="button"
                    onClick={() => setZoom(BOOKINGS_PHONES.length + i)}
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

      {/* Features */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">What it does</p>
          <Reveal>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {BOOKINGS_FEATURES.map((f) => (
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
                  { value: '79', label: 'unit tests on the slot, deposit and time rules' },
                  { value: '113', label: 'integration tests against a real PostgreSQL' },
                  { value: '14', label: 'end-to-end tests in a phone-sized browser' },
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
                The end-to-end suite includes two customers pressing pay at the same moment, and only one getting
                through. An independent review of the whole branch found six issues, none of which allowed a
                double booking or an unpaid confirmation; all six were fixed with tests.
              </p>
              <p>
                <span className="text-fg">Where it stands.</span> It runs and passes locally and is not public
                yet. Payments in the demo are simulated through the same signed-webhook code a real payment
                uses; the PayMongo integration is written and unit-tested but has not yet been run against
                PayMongo’s sandbox. Confirmation messages are shown on screen, not sent, and reminders are next.
              </p>
            </Reveal>
            <Reveal>
              <Chips items={BOOKINGS_STACK} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page mt-24">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-fg">Want this for your salon or clinic?</p>
              <p className="mt-1 text-muted">I can show it to you with your shop’s name, colours and services already in.</p>
            </div>
            <a href={`mailto:${PROFILE.email}?subject=Ryan%E2%80%99s%20Bookings`} className="btn-primary flex-none">
              <FiMail size={15} /> Get in touch
            </a>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a href="#work" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <FiArrowLeft size={14} /> Back to work
          </a>
          <a href="#/payroll" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            Next: HR &amp; Payroll System <FiArrowRight size={14} />
          </a>
        </div>
      </section>

      <Lightbox shots={all} index={zoom} onIndex={setZoom} />
    </article>
  )
}
