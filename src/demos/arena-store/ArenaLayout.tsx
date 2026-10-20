import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, X, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import { DemoBar } from '@/components/layout/DemoBar'
import { PageLoader } from '@/components/ui/PageLoader'
import { cn } from '@/lib/cn'
import { formatBRL } from '@/lib/format'
import { CartProvider, useCart } from './cart'
import { CartDrawer } from './CartDrawer'
import { categories, FREE_SHIPPING_FROM } from './data'
import { BASE } from './paths'

function ArenaLogo() {
  return (
    <span className="font-display text-xl font-extrabold uppercase italic tracking-tight text-white">
      Arena<span className="text-lime-300">Store</span>
    </span>
  )
}

function Shell() {
  const { count, setDrawerOpen } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  useEffect(() => setOpen(false), [pathname, search])

  const links = [
    { to: `${BASE}/produtos`, label: 'Todos' },
    ...categories.map((c) => ({ to: `${BASE}/produtos?categoria=${encodeURIComponent(c)}`, label: c })),
  ]
  const isActive = (to: string) => `${pathname}${search}` === to || (to === `${BASE}/produtos` && pathname === to && !search)

  return (
    <div className="min-h-screen bg-white text-zinc-700">
      <DemoBar projectSlug="arena-store" projectName="Arena Store" />
      <aside aria-label="Aviso da loja" className="bg-lime-300 px-4 py-2 text-center text-xs font-semibold text-zinc-900">
        Loja demonstrativa: nenhuma compra é processada · Frete grátis (simulado) acima de {formatBRL(FREE_SHIPPING_FROM)}
      </aside>
      <header className="sticky top-0 z-40 bg-zinc-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to={BASE} aria-label="Arena Store — início" className="rounded">
            <ArenaLogo />
          </Link>
          <nav aria-label="Categorias" className="hidden md:block">
            <ul className="flex gap-1">
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={() =>
                      cn('rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive(l.to) ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white')
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Abrir carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1 text-[0.7rem] font-bold text-zinc-900">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="arena-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <nav id="arena-menu" hidden={!open} aria-label="Categorias (celular)" className="border-t border-white/10 md:hidden">
          <ul className="px-4 py-3">
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="block rounded-lg px-3 py-3 font-medium text-white hover:bg-white/5">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="conteudo">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <section aria-label="Vantagens" className="mt-20 border-y border-zinc-200 bg-zinc-50">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Truck, title: 'Frete grátis (simulado)', text: `Em pedidos acima de ${formatBRL(FREE_SHIPPING_FROM)}.` },
            { icon: RotateCcw, title: 'Troca facilitada', text: 'Política de trocas fictícia, apenas para demonstração.' },
            { icon: ShieldCheck, title: 'Sem pagamentos reais', text: 'Checkout totalmente simulado, nenhum dado é coletado.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-zinc-900" />
              <span>
                <span className="block font-semibold text-zinc-900">{title}</span>
                <span className="text-sm text-zinc-500">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="bg-zinc-950 py-10 text-sm text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <ArenaLogo />
          <p>Loja fictícia criada para demonstração. Produtos, preços e marcas não são reais.</p>
        </div>
      </footer>
      <CartDrawer />
    </div>
  )
}

export default function ArenaLayout() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  )
}
