import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { formatBRL } from '@/lib/format'
import { useCart } from './cart'
import { ProductArt } from './ProductArt'
import { QtyStepper } from './QtyStepper'
import { CartSummary } from './CartSummary'
import { BASE } from './paths'

/** Carrinho lateral (diálogo modal acessível). */
export function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, setQty, remove } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
      // Mantém o foco dentro do painel
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [drawerOpen, setDrawerOpen])

  if (!drawerOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 animate-[fade-up_0.2s_ease-out] bg-zinc-950/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrinho-titulo"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 id="carrinho-titulo" className="flex items-center gap-2 font-display text-lg font-extrabold text-zinc-900">
            <ShoppingBag aria-hidden="true" className="h-5 w-5" /> Seu carrinho
          </h2>
          <button ref={closeRef} type="button" onClick={() => setDrawerOpen(false)} aria-label="Fechar carrinho" className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-zinc-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length ? (
          <>
            <ul className="flex-1 divide-y divide-zinc-100 overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.productId + l.size} className="flex gap-4 py-4">
                  <ProductArt product={l.product} className="h-20 w-20 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-zinc-900">{l.product.name}</p>
                    <p className="text-sm text-zinc-500">Tamanho: {l.size}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QtyStepper size="sm" value={l.qty} onChange={(v) => setQty(l.productId, l.size, v)} label={`Quantidade de ${l.product.name}`} />
                      <span className="font-semibold tabular-nums text-zinc-900">{formatBRL(l.total)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => remove(l.productId, l.size)} aria-label={`Remover ${l.product.name} (tamanho ${l.size})`} className="self-start rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-200 p-5">
              <CartSummary />
              <div className="mt-4 grid gap-2">
                <Link to={`${BASE}/checkout`} onClick={() => setDrawerOpen(false)} className="flex h-12 items-center justify-center rounded-xl bg-zinc-900 font-semibold text-white hover:bg-zinc-800">
                  Finalizar compra (simulação)
                </Link>
                <Link to={`${BASE}/carrinho`} onClick={() => setDrawerOpen(false)} className="flex h-11 items-center justify-center rounded-xl border border-zinc-300 font-semibold text-zinc-800 hover:bg-zinc-50">
                  Ver carrinho completo
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag aria-hidden="true" className="h-12 w-12 text-zinc-300" />
            <p className="mt-4 font-semibold text-zinc-900">Seu carrinho está vazio</p>
            <p className="mt-1 text-sm text-zinc-500">Explore o catálogo e adicione produtos.</p>
            <Link to={`${BASE}/produtos`} onClick={() => setDrawerOpen(false)} className="mt-5 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white">
              Ver produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
