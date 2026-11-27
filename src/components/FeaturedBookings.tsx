import { FiArrowUpRight } from 'react-icons/fi'
import { BOOKINGS } from '../data/bookings'
import { Chips, CountUp, Reveal, onSpot } from './ui'
import Phone from './Phone'

export default function FeaturedBookings() {
  return (
    <section className="pb-8 pt-6">
      <div className="page">
        <Reveal>
          <a
            href="#/bookings"
            onMouseMove={onSpot}
            className="spot group grid overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-subtle lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="flex flex-col p-6 sm:p-10">
              <p className="font-mono text-xs text-subtle">2026 · Solo build · For service businesses</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{BOOKINGS.name}</h2>
              <p className="mt-2 text-lg text-fg/90">{BOOKINGS.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{BOOKINGS.pitch}</p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {BOOKINGS.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                      <CountUp value={s.value} />
                    </dd>
                    <dd className="mt-1 text-xs leading-snug text-subtle">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <Chips items={BOOKINGS.chips} className="mt-6" />

              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read the case study
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="relative flex items-end justify-center overflow-hidden border-t border-line bg-gradient-to-br from-rose-500/10 via-transparent to-emerald-500/10 px-4 pt-10 sm:px-8 lg:border-l lg:border-t-0">
              {BOOKINGS.featured.map((src, i) => (
                <Phone
                  key={src}
                  src={src}
                  alt=""
                  className={`flex-none transition-transform duration-500 ${
                    i === 1
                      ? 'relative z-[2] w-[42%] max-w-[260px] translate-y-6 group-hover:translate-y-3'
                      : `w-[36%] max-w-[225px] translate-y-20 opacity-90 group-hover:translate-y-16 ${
                          i === 0 ? '-mr-[8%] -rotate-3' : '-ml-[8%] rotate-3'
                        }`
                  }`}
                />
              ))}
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
