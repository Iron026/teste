import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Project } from '@/data/projects'
import { DemoBadge } from '@/components/ui/DemoBadge'
import { ButtonLink } from '@/components/ui/Button'

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        to={`/projetos/${project.slug}`}
        className="relative block overflow-hidden rounded-t-3xl bg-slate-100"
        aria-label={`Detalhes do projeto ${project.name}`}
        tabIndex={-1}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-90"
          style={{ background: `linear-gradient(135deg, ${project.accent}22, transparent 60%)` }}
        />
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8">
          <div className="overflow-hidden rounded-t-xl border border-b-0 border-slate-200/80 shadow-[0_-8px_30px_-12px_rgb(10_23_48/0.25)]">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </div>
            <img
              src={project.cover}
              alt={project.coverAlt}
              width={1600}
              height={1000}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-600)' }}>
            {project.category}
          </span>
          {project.demonstrative && <DemoBadge className="ml-auto" />}
        </div>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
          <Link to={`/projetos/${project.slug}`} className="hover:text-accent-700">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-slate-600">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.technologies.slice(0, 5).map((t) => (
            <li key={t} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[0.7rem] text-slate-600">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-7 sm:flex-row">
          <ButtonLink to={project.demoUrl} variant="secondary" className="sm:flex-1">
            <Play aria-hidden="true" className="h-4 w-4" /> Abrir demonstração
          </ButtonLink>
          <ButtonLink to={`/projetos/${project.slug}`} variant="ghost" className="border border-slate-200 sm:flex-1">
            Ver detalhes <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
