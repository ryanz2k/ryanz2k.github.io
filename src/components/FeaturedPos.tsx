import { FiArrowUpRight } from 'react-icons/fi'
import { POS } from '../data/pos'
import { Chips, CountUp, Reveal, onSpot } from './ui'
import Tilt from './Tilt'
import PosScreen from './PosScreen'

export default function FeaturedPos() {
  return (
    <section id="work" className="scroll-mt-20 pb-8">
      <div className="page">
        <Reveal>
          <p className="eyebrow">Featured project</p>
        </Reveal>
        <Reveal delay={0.05}>
          <a
            href="#/pos"
            onMouseMove={onSpot}
            className="spot group mt-5 grid overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-subtle lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="flex flex-col p-6 sm:p-10">
              <p className="font-mono text-xs text-subtle">2026 · Solo build</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{POS.name}</h2>
              <p className="mt-2 text-lg text-fg/90">{POS.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{POS.pitch}</p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {POS.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight text-fg sm:text-2xl"><CountUp value={s.value} /></dd>
                    <dd className="mt-1 text-xs leading-snug text-subtle">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <Chips items={POS.chips} className="mt-6" />

              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read the case study
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="relative flex items-center justify-center overflow-hidden border-t border-line bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 p-5 sm:p-10 lg:border-l lg:border-t-0">
              <Tilt className="w-full overflow-hidden rounded-xl shadow-2xl shadow-black/40 ring-1 ring-black/10">
                <PosScreen name="pos-counter-desktop" alt="Ryan’s POS counter screen with an order in the cart" eager />
              </Tilt>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
