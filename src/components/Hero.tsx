import { Fragment } from 'react'
import { FiArrowRight, FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'
import { IMPACT, PROFILE } from '../data/content'
import { CountUp, EASE, prefersReducedMotion } from './ui'

const HEADLINE = ['I', 'build', 'ERP', 'systems', 'and', 'offline‑first', 'products.']
const SUBLINE = ['From', 'component', 'library', 'to', 'production', 'pipeline.']

export default function Hero() {
  const reduce = useReducedMotion() || prefersReducedMotion()
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  // Each word rises out of its own clipped line box.
  const word = (text: string, i: number, className = '') => (
    <Fragment key={`${text}-${i}`}>
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        {...(reduce
          ? {}
          : {
              initial: { y: '110%' },
              animate: { y: 0 },
              transition: { duration: 0.6, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
            })}
      >
        {text}
      </motion.span>
    </span>{' '}
    </Fragment>
  )

  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="page relative z-[2] pb-16 pt-16 sm:pb-24 sm:pt-24">
        <motion.div {...fade(0)} className="flex flex-wrap items-center gap-x-4 gap-y-2">
<p className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{PROFILE.name}</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {PROFILE.openToWork ? 'Open to new roles' : PROFILE.role}
          </span>
        </motion.div>

        <h1
          aria-label={`${HEADLINE.join(' ')} ${SUBLINE.join(' ')}`}
          className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl"
        >
          <span aria-hidden>
            {HEADLINE.map((w, i) => word(w, i))}
            {SUBLINE.map((w, i) => word(w, HEADLINE.length + i, 'text-subtle'))}
          </span>
        </h1>

        <motion.p {...fade(0.5)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Software Engineer in Cebu. I ship design systems, finance modules and the CI/CD that keeps
          them honest.
        </motion.p>

        <motion.div {...fade(0.6)} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="btn-primary group">
            View work <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiFileText size={15} /> Résumé
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiLinkedin size={15} /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiGithub size={15} /> GitHub
          </a>
        </motion.div>

        <motion.dl
          {...fade(0.72)}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4"
        >
          {IMPACT.map((s) => (
            <div key={s.label}>
              <dd className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                <CountUp value={s.value} />
              </dd>
              <dt className="mt-2 max-w-[15rem] text-sm leading-snug text-subtle">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
