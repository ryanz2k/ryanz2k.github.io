import { useState } from 'react'
import { FiArrowUpRight, FiCheck, FiCopy, FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FIT, PROFILE } from '../data/content'
import { Reveal, onSpot } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="page">
        <Reveal>
          <div onMouseMove={onSpot} className="spot relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative z-[2] grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
                  Let’s build something that keeps working.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  {PROFILE.openToWork
                    ? 'I’m looking for my next engineering role. I also install the POS for shops in the Philippines.'
                    : 'Open to conversations about engineering roles, and about POS deployments for shops in the Philippines.'}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={`mailto:${PROFILE.email}`} className="btn-primary">
                    <FiMail size={15} /> {PROFILE.email}
                  </a>
                  <button type="button" onClick={copy} className="btn-ghost" aria-live="polite">
                    {copied ? <FiCheck size={15} className="text-accent" /> : <FiCopy size={15} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <FiFileText size={15} /> Résumé
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <FiLinkedin size={15} /> LinkedIn <FiArrowUpRight size={13} />
                  </a>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <FiGithub size={15} /> GitHub <FiArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <dl className="self-end divide-y divide-line rounded-2xl border border-line bg-bg/60">
                {FIT.map((f) => (
                  <div key={f.k} className="p-4">
                    <dt className="eyebrow">{f.k}</dt>
                    <dd className="mt-1.5 text-sm text-fg">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
