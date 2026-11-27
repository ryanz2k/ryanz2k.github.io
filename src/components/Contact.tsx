import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { PROFILE } from '../data/content'
import { Reveal } from './ui'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
              Let’s build something that keeps working.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Open to conversations about engineering roles, and about POS deployments for shops in
              the Philippines.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`} className="btn-primary">
                <FiMail size={15} /> {PROFILE.email}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FiLinkedin size={15} /> LinkedIn <FiArrowUpRight size={13} />
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FiGithub size={15} /> GitHub <FiArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
