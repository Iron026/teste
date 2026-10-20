import { Info } from 'lucide-react'
import { projects } from '@/data/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="projetos-titulo"
              eyebrow="Projetos"
              title="Demonstrações funcionais, não apenas imagens."
              description="Cada projeto pode ser aberto e testado: filtre imóveis, analise indicadores, preencha um formulário e monte um carrinho de compras."
            />
          </Reveal>
          <Reveal delay={100} className="lg:max-w-xs">
            <p className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              Projetos demonstrativos e autorais. As empresas, os dados e os valores são fictícios.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 90} className="h-full">
              <ProjectCard project={project} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
