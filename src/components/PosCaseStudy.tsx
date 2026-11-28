import { useEffect, useState, type ReactNode } from 'react'
import { FiArrowLeft, FiArrowRight, FiMail, FiRefreshCw, FiServer, FiShield, FiSmartphone } from 'react-icons/fi'
import { PROFILE } from '../data/content'
import { POS, POS_FEATURES, POS_PROBLEMS, POS_QUALITY, POS_STACK, posShot } from '../data/pos'
import PosScreen from './PosScreen'
import { Chips, CountUp, Reveal } from './ui'
import SyncDemo from './SyncDemo'
import PosDemoVideo from './PosDemoVideo'
import Lightbox from './Lightbox'
import { restoreScroll } from '../hooks/useHashRoute'

function Box({
  icon,
  title,
  sub,
  items,
}: {
  icon: ReactNode
  title: string
  sub: string
  items: string[]
}) {
  return (
    <div className="flex-1 rounded-xl border border-line bg-bg p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-fg">{title}</p>
          <p className="font-mono text-[11px] text-subtle">{sub}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted">
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Architecture() {
  return (
    <figure className="card p-4 sm:p-6">
      <div className="rounded-xl border border-dashed border-line p-4 sm:p-5">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-subtle">
          One Docker Compose stack per client · cloud VPS or a mini PC in the shop
        </p>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          <Box
            icon={<FiSmartphone size={15} />}
            title="Counter & back office"
            sub="Angular PWA"
            items={['IndexedDB (Dexie): catalog, sales, shifts', 'Append-only outbox', 'Service worker: works offline', 'Receipt printer · drawer · scanner']}
          />
          <div className="flex flex-row items-center justify-center gap-2 py-1 font-mono text-[11px] text-subtle md:flex-col md:px-1">
            <span>push outbox</span>
            <FiRefreshCw className="text-accent" size={16} />
            <span>pull snapshot</span>
          </div>
          <Box
            icon={<FiServer size={15} />}
            title="API"
            sub="NestJS · Prisma"
            items={['Idempotent sync endpoint', 'Re-verifies every sale', 'Reports · inventory · settings', 'Device tokens · PIN auth']}
          />
          <div className="hidden px-1 text-subtle md:block">→</div>
          <Box
            icon={<FiShield size={15} />}
            title="Platform"
            sub="Postgres · Caddy"
            items={['PostgreSQL 18', 'Caddy HTTPS (public or own CA)', 'Encrypted nightly backups', 'Off-site copy · tested restore']}
          />
        </div>
        <div className="mt-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-center font-mono text-[11px] text-accent">
          Shared TypeScript rules package — money, VAT, discounts, cart, readings, permissions — used by both
          the counter and the API
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-subtle">
        The counter is the source of truth for what happened at the till; the server is the source of
        truth for whether it adds up.
      </figcaption>
    </figure>
  )
}

const GALLERY = [
  { name: 'pos-reports-desktop', alt: 'Reports overview with net sales, transactions, gross profit and a sales-by-day chart', caption: 'Reports: 7-day overview with gross profit and payment mix' },
  { name: 'pos-offline-desktop', alt: 'Counter ringing up an order while the status bar shows Offline, 2 waiting to sync', caption: 'Selling offline — two sales queued, synced on reconnect' },
  { name: 'pos-extra-shift', alt: 'Shift screen with a live Z-reading, VAT breakdown and a balanced cash drawer', caption: 'Shift close: live Z-reading, VAT and a balanced drawer' },
  { name: 'pos-extra-stock', alt: 'Stock screen with in-stock, low and out-of-stock badges and an item movement history', caption: 'Append-only stock ledger with low and out-of-stock alerts' },
  { name: 'pos-extra-receipt', alt: 'Payment complete screen with change due and the printed sales invoice', caption: 'Payment, change due and a gap-free sales invoice' },
  { name: 'pos-extra-report-items', alt: 'Item report with sales and margin by category and by item', caption: 'Margins by category and item' },
]

export default function PosCaseStudy() {
  const [zoom, setZoom] = useState<number | null>(null)
  useEffect(restoreScroll, [])
  useEffect(() => {
    const prev = document.title
    document.title = 'POS System — case study · John Ryan Gomez'
    return () => {
      document.title = prev
    }
  }, [])

  const gallery = GALLERY.filter((g) => posShot(g.name))
  const tablet = posShot('pos-counter-tablet')
  const phone = posShot('pos-counter-phone')

  return (
    <article className="pb-16">
      {/* Header */}
      <header className="page pt-10 sm:pt-14">
        <a href="#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <FiArrowLeft size={14} /> Back to work
        </a>
        <Reveal>
          <p className="eyebrow mt-10">Case study · 2026 · Solo build</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl">{POS.name}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">{POS.tagline} {POS.pitch}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            {[
              { k: 'Role', v: 'Design, build, deploy' },
              { k: 'Timeline', v: 'Oct — Nov 2026' },
              { k: 'Platform', v: 'PWA · phone to desktop' },
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

      {/* Hero shot */}
      <div className="page mt-12">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 p-3 sm:p-8">
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/40 ring-1 ring-black/10">
              <PosScreen name="pos-counter-desktop" alt="POS System counter screen with an order in the cart" eager />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Demo recording (renders nothing until the video files exist) */}
      <PosDemoVideo />

      {/* Problem */}
      <section className="page mt-24 grid gap-10 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">The problem</p>
        <Reveal className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            Small shops in the Philippines lose sales every time the internet drops, and most cloud POS
            subscriptions stop at the till when it does. They also need local rules handled correctly:
            VAT breakdowns, the Senior Citizen and PWD discount, X and Z readings, and payments by GCash
            and Maya next to cash.
          </p>
          <p>
            I designed the POS System so the counter never depends on the network, and so every peso still
            reconciles on the server afterwards. It’s sold outright and installed per client, with no
            subscription.
          </p>
        </Reveal>
      </section>

      {/* Architecture */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Architecture</p>
          <Reveal>
            <Architecture />
          </Reveal>
        </div>
      </section>

      {/* Interactive sync demo */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <p className="eyebrow">Offline sync</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-subtle md:block">
              The core idea, small enough to play with.
            </p>
          </div>
          <Reveal>
            <SyncDemo />
          </Reveal>
        </div>
      </section>

      {/* Hard problems */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Hard parts</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {POS_PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.05} className="card lift p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive shots */}
      {(tablet || phone) && (
        <section className="page mt-24">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <p className="eyebrow">Any screen</p>
            <Reveal className="flex flex-wrap items-end justify-center gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-10">
              {tablet && (
                <img src={tablet} alt="Counter on a tablet" loading="lazy" className="w-[58%] min-w-[220px] rounded-xl shadow-xl ring-1 ring-black/10" />
              )}
              {phone && (
                <img src={phone} alt="Counter on a phone" loading="lazy" className="w-[28%] min-w-[140px] rounded-xl shadow-xl ring-1 ring-black/10" />
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="page mt-24">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <p className="eyebrow">In use</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {gallery.map((g, i) => (
                <Reveal key={g.name}>
                  <figure>
                    <button
                      type="button"
                      onClick={() => setZoom(i)}
                      className="lift block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
                      aria-label={`${g.caption} (view larger)`}
                    >
                      <PosScreen name={g.name} alt={g.alt} />
                    </button>
                    <figcaption className="mt-2 text-sm text-subtle">{g.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
          <Lightbox
            shots={gallery.map((g) => ({ src: posShot(g.name)!, alt: g.alt, caption: g.caption }))}
            index={zoom}
            onIndex={setZoom}
          />
        </section>
      )}

      {/* Features */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">What it does</p>
          <Reveal>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {POS_FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Quality */}
      <section className="page mt-24">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">Engineering</p>
          <div>
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
                {POS_QUALITY.map((q) => (
                  <div key={q.label} className="bg-surface p-5">
                    <dd className="text-2xl font-semibold tracking-tight text-fg"><CountUp value={q.value} /></dd>
                    <dt className="mt-1 text-xs leading-snug text-subtle">{q.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                API tests run against a real PostgreSQL started per test file with Testcontainers.
                Playwright drives the whole flow, including an offline suite: refunds made offline, a
                revoked counter still delivering its last sale, a flaky connection, and two counters
                selling at once.
              </p>
              <p>
                CI runs format, lint, strict type-checks, build and unit tests, then end-to-end tests,
                then builds the real production stack and checks HTTPS, a backup-and-restore cycle and an
                offline counter against it. One command runs the same pipeline locally before every
                push.
              </p>
            </Reveal>
            <Reveal>
              <Chips items={POS_STACK} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page mt-24">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-fg">Run a café, salon or shop in the Philippines?</p>
              <p className="mt-1 text-muted">I install and support the POS System per business. The source is available to employers on request.</p>
            </div>
            <a href={`mailto:${PROFILE.email}?subject=Ryan%E2%80%99s%20POS`} className="btn-primary flex-none">
              <FiMail size={15} /> Get in touch
            </a>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a href="#work" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <FiArrowLeft size={14} /> Back to work
          </a>
          <a href="#/bookings" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            Next: Booking System <FiArrowRight size={14} />
          </a>
        </div>
      </section>
    </article>
  )
}
