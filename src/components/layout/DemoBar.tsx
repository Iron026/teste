import { Link } from 'react-router-dom'
import { ArrowLeft, FlaskConical } from 'lucide-react'
import { siteConfig } from '@/config/site'

interface Props {
  projectSlug: string
  projectName: string
}

/**
 * Faixa fixa no topo de cada demonstração: deixa claro que se trata
 * de um projeto demonstrativo e oferece o caminho de volta ao portfólio.
 */
export function DemoBar({ projectSlug, projectName }: Props) {
  return (
    <div className="relative z-[60] bg-ink-950 text-slate-300">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-3 px-4 text-xs sm:px-6 sm:text-[0.8rem]">
        <p className="flex min-w-0 items-center gap-2">
          <FlaskConical aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-amber-300" />
          <span className="truncate">
            <strong className="font-semibold text-white">Projeto demonstrativo</strong>
            <span className="hidden sm:inline"> · {projectName} é uma empresa fictícia criada por {siteConfig.name}</span>
          </span>
        </p>
        <nav aria-label="Portfólio" className="flex shrink-0 items-center gap-4">
          <Link to={`/projetos/${projectSlug}`} className="hidden hover:text-white md:inline">
            Sobre este projeto
          </Link>
          <Link to="/#projetos" className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-aqua-300">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            Voltar ao portfólio
          </Link>
        </nav>
      </div>
    </div>
  )
}
