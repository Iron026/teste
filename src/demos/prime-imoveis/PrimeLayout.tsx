import { Suspense, useEffect, useState } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import '@fontsource-variable/fraunces'
import { DemoBar } from '@/components/layout/DemoBar'
import { cn } from '@/lib/cn'
import { BASE } from './utils'

function PrimeLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#1f2b26" />
        <path d="M8 22 V13 L16 7 L24 13 V22" fill="none" stroke="#c9a46a" strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="13.5" y="15" width="5" height="7" fill="#c9a46a" />
      </svg>
      <span className={cn('font-serif text-xl font-semibold tracking-tight', light ? 'text-white' : 'text-[#1f2b26]')}>
        Prime <span className="font-normal italic text-[#a67c3d]">Imóveis</span>
      </span>
    </span>
  )
}

const nav = [
  { to: BASE, label: 'Início', end: true },
  { to: `${BASE}/imoveis`, label: 'Imóveis', end: false },
  { to: `${BASE}/imoveis?finalidade=Venda`, label: 'Comprar', end: false },
  { to: `${BASE}/imoveis?finalidade=Aluguel`, label: 'Alugar', end: false },
]

export default function PrimeLayout() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  useEffect(() => setOpen(false), [pathname, search])

  const isActive = (to: string, end: boolean) => {
    const [path, query] = to.split('?')
    if (end) return pathname === path
    if (query) return pathname === path && search === `?${query}`
    return pathname.startsWith(path) && !search.includes('finalidade')
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#3b3a36]">
      <DemoBar projectSlug="prime-imoveis" projectName="Prime Imóveis" />
      <header className="sticky top-0 z-40 border-b border-[#e8e1d4] bg-[#faf8f4]/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to={BASE} aria-label="Prime Imóveis — início" className="rounded-lg">
            <PrimeLogo />
          </Link>
          <nav aria-label="Prime Imóveis" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.label}>
                  <NavLink
                    to={n.to}
                    end={n.end}
                    className={() =>
                      cn(
                        'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                        isActive(n.to, n.end) ? 'bg-[#1f2b26] text-white' : 'text-[#5b584f] hover:bg-[#efe9dd]',
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            to={`${BASE}#contato`}
            className="hidden rounded-lg bg-[#a67c3d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8d6830] md:inline-flex"
          >
            Fale com um corretor
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#1f2b26] hover:bg-[#efe9dd] md:hidden"
            aria-expanded={open}
            aria-controls="prime-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <nav id="prime-menu" hidden={!open} aria-label="Prime Imóveis (celular)" className="border-t border-[#e8e1d4] md:hidden">
          <ul className="space-y-1 px-4 py-4">
            {nav.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="block rounded-lg px-3 py-3 font-medium text-[#1f2b26] hover:bg-[#efe9dd]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={`${BASE}#contato`} className="mt-2 block rounded-lg bg-[#a67c3d] px-3 py-3 text-center font-semibold text-white">
                Fale com um corretor
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="conteudo">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="mt-24 bg-[#1f2b26] text-[#c9c3b5]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <PrimeLogo light />
            <p className="mt-4 text-sm leading-relaxed">
              Imobiliária fictícia criada para demonstração. Imóveis, valores e bairros não existem.
            </p>
          </div>
          <div className="text-sm">
            <h2 className="font-serif text-base text-white">Navegação</h2>
            <ul className="mt-3 space-y-2">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <h2 className="font-serif text-base text-white">Cidades atendidas (exemplo)</h2>
            <p className="mt-3 leading-relaxed">Curitiba · Florianópolis · Belo Horizonte · Campinas</p>
          </div>
        </div>
        <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-[#8f8a7d]">
          Demonstração de portfólio — nenhuma informação é enviada ou armazenada.
        </p>
      </footer>
    </div>
  )
}
