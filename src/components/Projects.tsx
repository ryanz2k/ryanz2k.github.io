import { FiArrowUpRight, FiLock } from 'react-icons/fi'
import { CLIENT_SITES, MORE_PROJECTS, PROJECTS, type Project } from '../data/content'
import { Chips, ExternalLink, Reveal, Section } from './ui'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-raised">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center gap-6 bg-gradient-to-br from-accent/15 via-transparent to-sky-500/10 p-6">
            {/* Phone silhouette for app projects without a public screenshot */}
            <div aria-hidden className="flex h-[78%] aspect-[9/19] flex-col rounded-[1.4rem] border-[3px] border-fg/15 bg-surface p-2 shadow-xl">
              <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-fg/15" />
              <div className="mb-2 h-6 rounded-md bg-accent/25" />
              <div className="grid flex-1 grid-cols-2 content-start gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-md bg-fg/10" />
                ))}
              </div>
            </div>
            <div className="max-w-[45%]">
              <p className="text-xl font-semibold tracking-tight text-fg">{project.title}</p>
              <p className="mt-1 font-mono text-xs text-subtle">{project.stack.slice(0, 2).join(' · ')}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-subtle">{project.kind}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-muted">
              <span aria-hidden className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-subtle" />
              {h}
            </li>
          ))}
        </ul>
        <Chips items={project.stack} className="mt-5" />
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
          {project.links?.map((l) => (
            <ExternalLink key={l.href} href={l.href} className="inline-flex items-center gap-1 font-medium text-fg hover:text-accent">
              {l.label} <FiArrowUpRight size={14} />
            </ExternalLink>
          ))}
          {project.note && (
            <span className="inline-flex items-center gap-1.5 text-subtle">
              <FiLock size={12} /> {project.note}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected projects"
      title="Other things I’ve shipped"
      intro="Mobile, web, games and client systems, from student marketplaces to point of sale for a salon group."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-line p-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="eyebrow flex-none">Also</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {MORE_PROJECTS.map((m) => (
              <li key={m.title}>
                <ExternalLink href={m.href} className="link font-medium">
                  {m.title}
                </ExternalLink>
                <span className="ml-2 text-subtle">{m.stack}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <p className="eyebrow">Client websites</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">WordPress & Shopify</h3>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {CLIENT_SITES.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.05}>
                <ExternalLink href={s.href} className="card group block overflow-hidden transition-colors hover:border-subtle">
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-raised">
                    <img
                      src={s.image}
                      alt={`${s.title} website`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium text-fg">{s.title}</p>
                      <p className="font-mono text-xs text-subtle">{s.kind}</p>
                    </div>
                    <FiArrowUpRight className="text-subtle transition-colors group-hover:text-accent" />
                  </div>
                </ExternalLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
