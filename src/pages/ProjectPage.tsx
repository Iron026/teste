import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Download, Lightbulb, Play, Target, Info } from 'lucide-react'
import { getProject, projects } from '@/data/projects'
import { useSeo } from '@/hooks/useSeo'
import { ButtonLink } from '@/components/ui/Button'
import { DemoBadge } from '@/components/ui/DemoBadge'
import { Reveal } from '@/components/ui/Reveal'
import { quoteHref } from '@/data/navigation'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  useSeo({ title: project ? `${project.name} — ${project.category}` : 'Projeto não encontrado', description: project?.description })

  if (!project) return <NotFoundPage />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      <header className="relative overflow-hidden bg-ink-950 pb-40 pt-32 text-white sm:pt-40">
        <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ background: `${project.accent}40` }}
        />
        <div className="container-page relative">
          <Link to="/#projetos" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Todos os projetos
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-aqua-300">{project.category}</span>
            {project.demonstrative && <DemoBadge tone="light" />}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{project.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={project.demoUrl} size="lg" variant="light">
              <Play aria-hidden="true" className="h-4 w-4" /> Abrir demonstração funcional
            </ButtonLink>
            {project.download && (
              <ButtonLink to={project.download.href} size="lg" variant="outline-light">
                <Download aria-hidden="true" className="h-4 w-4" /> {project.download.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </header>

      <div className="container-page relative -mt-28">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-hover">
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <img src={project.cover} alt={project.coverAlt} width={1600} height={1000} className="aspect-[16/10] w-full object-cover object-top" />
        </div>
      </div>

      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-12">
          <Reveal>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold">
              <Target aria-hidden="true" className="h-6 w-6 text-accent-600" /> O problema
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{project.problem}</p>
          </Reveal>
          <Reveal>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold">
              <Lightbulb aria-hidden="true" className="h-6 w-6 text-accent-600" /> A solução
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{project.solution}</p>
          </Reveal>
          <Reveal>
            <h2 className="text-2xl font-extrabold">Funcionalidades</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-[0.95rem] text-slate-700">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tecnologias utilizadas</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-lg bg-ink-900 px-3 py-1.5 font-mono text-xs text-slate-200">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {project.demonstrative && (
            <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Este é um <strong>projeto demonstrativo autoral</strong>, criado para apresentar capacidades técnicas. A
                empresa, os dados e os valores são fictícios e não representam um cliente real.
              </p>
            </div>
          )}
          <div className="rounded-2xl bg-ink-900 p-6 text-white">
            <h2 className="font-display text-lg font-bold text-white">Precisa de algo parecido?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Posso adaptar esta solução à realidade do seu negócio.
            </p>
            <ButtonLink to={quoteHref} className="mt-5 w-full">
              Solicitar orçamento
            </ButtonLink>
          </div>
        </aside>
      </div>

      <nav aria-label="Próximo projeto" className="border-t border-slate-200">
        <Link to={`/projetos/${next.slug}`} className="group container-page flex items-center justify-between gap-6 py-10">
          <span>
            <span className="block text-sm text-slate-500">Próximo projeto</span>
            <span className="mt-1 block font-display text-2xl font-extrabold text-ink-900 group-hover:text-accent-700 sm:text-3xl">
              {next.name}
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="h-7 w-7 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-accent-600" />
        </Link>
      </nav>
    </article>
  )
}
