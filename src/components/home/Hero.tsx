import { ArrowRight, ArrowDown, LayoutTemplate, FileSpreadsheet, Workflow, PanelsTopLeft } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { quoteHref } from '@/data/navigation'
import { HeroVisual } from './HeroVisual'

const pillars = [
  { icon: LayoutTemplate, label: 'Sites' },
  { icon: FileSpreadsheet, label: 'Planilhas' },
  { icon: Workflow, label: 'Automações' },
  { icon: PanelsTopLeft, label: 'Sistemas web' },
]

export function Hero() {
  const { hero } = siteConfig
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_20%,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent-600/25 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-aqua-500/10 blur-[120px]" />

      <div className="container-page relative grid items-center gap-16 pb-28 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-36 lg:pt-44">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-400" />
            </span>
            {hero.eyebrow}
          </p>
          <h1 id="hero-titulo" className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/#projetos" size="lg" variant="light">
              Conhecer projetos <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to={quoteHref} size="lg">
              Solicitar orçamento <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400" aria-label="Áreas de atuação">
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon aria-hidden="true" className="h-4 w-4 text-aqua-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up lg:pl-6" style={{ animationDelay: '150ms' }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
