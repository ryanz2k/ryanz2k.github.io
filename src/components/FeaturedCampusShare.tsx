import { FiArrowUpRight } from 'react-icons/fi'
import { CAMPUS, campusShot } from '../data/campusshare'
import { Chips, CountUp, Reveal, onSpot } from './ui'
import Phone from './Phone'

/** Second featured project. Hidden until real screenshots exist in src/assets/campusshare/. */
export default function FeaturedCampusShare() {
  const shots = ['app-wallet', 'app-home', 'app-listing'].map(campusShot)
  if (!shots[1]) return null

  return (
    <section className="pb-8 pt-6">
      <div className="page">
        <Reveal>
          <a
            href="#/campusshare"
            onMouseMove={onSpot}
            className="spot group grid overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-subtle lg:grid-cols-[1.15fr_1fr]"
          >
            <div className="relative order-2 flex items-end justify-center gap-4 overflow-hidden border-t border-line bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10 px-6 pt-10 sm:gap-6 lg:order-1 lg:border-r lg:border-t-0">
              {shots.map(
                (src, i) =>
                  src && (
                    <Phone
                      key={src}
                      src={src}
                      alt=""
                      className={`w-[30%] max-w-[190px] transition-transform duration-500 ${
                        i === 1
                          ? 'z-[2] translate-y-6 group-hover:translate-y-3'
                          : `translate-y-16 opacity-90 group-hover:translate-y-12 ${i === 0 ? '-rotate-3' : 'rotate-3'}`
                      }`}
                    />
                  ),
              )}
            </div>

            <div className="order-1 flex flex-col p-6 sm:p-10 lg:order-2">
              <p className="font-mono text-xs text-subtle">2026 · Solo build · Android</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{CAMPUS.name}</h2>
              <p className="mt-2 text-lg text-fg/90">{CAMPUS.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{CAMPUS.pitch}</p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {CAMPUS.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                      <CountUp value={s.value} />
                    </dd>
                    <dd className="mt-1 text-xs leading-snug text-subtle">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <Chips items={CAMPUS.chips} className="mt-6" />

              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read the case study
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
