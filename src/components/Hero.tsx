import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'
import profileImg from '../assets/profile.webp'
import { PROFILE } from '../data/content'

export default function Hero() {
  const reduce =
    useReducedMotion() || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.21, 0.6, 0.35, 1] as [number, number, number, number] },
        }

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
      <div className="page relative pb-20 pt-16 sm:pb-28 sm:pt-24">
        <motion.div {...fade(0)} className="flex items-center gap-3">
          <img
            src={profileImg}
            alt={PROFILE.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-line object-cover"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {PROFILE.role} @ {PROFILE.company}
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.08)}
          className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl"
        >
          I build ERP systems and offline‑first products.{' '}
          <span className="text-subtle">From component library to production pipeline.</span>
        </motion.h1>

        <motion.p {...fade(0.16)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Angular, .NET and TypeScript engineer in {PROFILE.location}. I ship design systems,
          finance modules and the CI/CD that keeps them honest.
        </motion.p>

        <motion.div {...fade(0.24)} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="btn-primary">
            View work <FiArrowRight size={15} />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiLinkedin size={15} /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiGithub size={15} /> GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
