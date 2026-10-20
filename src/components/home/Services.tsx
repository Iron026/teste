import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { getProject } from '@/data/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { quoteHref } from '@/data/navigation'

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-slate-50 py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="servicos-titulo"
            eyebrow="Serviços"
            title="Soluções sob medida para o seu negócio funcionar melhor."
            description="Quatro frentes de trabalho para quem precisa de presença on-line, controle de informações ou menos tarefas manuais."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon
            const related = service.relatedProject ? getProject(service.relatedProject) : undefined
            return (
              <Reveal key={service.id} delay={i * 70} className="h-full">
                <article
                  id={`servico-${service.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-300/60 hover:shadow-card-hover sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-aqua-300 transition-colors group-hover:bg-accent-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{service.description}</p>

                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Principais aplicações</h4>
                  <ul className="mt-3 space-y-2.5">
                    {service.applications.map((a) => (
                      <li key={a} className="flex gap-2.5 text-[0.95rem] text-slate-700">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-sm font-semibold">
                    <Link to={quoteHref} className="inline-flex items-center gap-1.5 text-accent-700 hover:text-accent-600">
                      Solicitar orçamento <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    {related && (
                      <Link to={`/projetos/${related.slug}`} className="text-slate-500 hover:text-ink-900">
                        Ver exemplo: {related.name}
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
