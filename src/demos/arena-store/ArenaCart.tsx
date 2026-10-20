import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { formatBRL } from '@/lib/format'
import { useCart } from './cart'
import { ProductArt } from './ProductArt'
import { QtyStepper } from './QtyStepper'
import { CartSummary } from './CartSummary'
import { BASE } from './paths'

export default function ArenaCart() {
  useSeo({ title: 'Carrinho — Arena Store (demonstração)', noindex: true })
  const { lines, setQty, remove, clear } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold uppercase italic text-zinc-900 sm:text-4xl">Carrinho</h1>

      {lines.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-zinc-300 py-20 text-center">
          <ShoppingBag aria-hidden="true" className="h-12 w-12 text-zinc-300" />
          <p className="mt-4 text-lg font-semibold text-zinc-900">Seu carrinho está vazio</p>
          <p className="mt-1 text-sm text-zinc-500">Os produtos adicionados ficam salvos neste navegador.</p>
          <Link to={`${BASE}/produtos`} className="mt-6 rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <section aria-label="Itens do carrinho">
            <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
              {lines.map((l) => (
                <li key={l.productId + l.size} className="flex gap-4 py-5 sm:gap-6">
                  <Link to={`${BASE}/produto/${l.productId}`} className="shrink-0 overflow-hidden rounded-xl" aria-label={l.product.name}>
                    <ProductArt product={l.product} className="h-24 w-24 sm:h-28 sm:w-28" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Link to={`${BASE}/produto/${l.productId}`} className="font-semibold text-zinc-900 hover:underline">
                        {l.product.name}
                      </Link>
                      <p className="text-sm text-zinc-500">
                        Tamanho {l.size} · {formatBRL(l.product.price)} cada
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <QtyStepper size="sm" value={l.qty} onChange={(v) => setQty(l.productId, l.size, v)} label={`Quantidade de ${l.product.name}`} />
                      <span className="w-24 text-right font-semibold tabular-nums text-zinc-900">{formatBRL(l.total)}</span>
                      <button type="button" onClick={() => remove(l.productId, l.size)} aria-label={`Remover ${l.product.name} (tamanho ${l.size})`} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between text-sm">
              <Link to={`${BASE}/produtos`} className="font-semibold text-zinc-900 hover:underline">
                ← Continuar comprando
              </Link>
              <button type="button" onClick={clear} className="font-medium text-zinc-500 hover:text-red-600">
                Esvaziar carrinho
              </button>
            </div>
          </section>

          <aside className="h-fit rounded-3xl bg-zinc-50 p-6 lg:sticky lg:top-24">
            <h2 className="mb-4 font-display text-lg font-extrabold text-zinc-900">Resumo</h2>
            <CartSummary />
            <Link to={`${BASE}/checkout`} className="mt-5 flex h-12 items-center justify-center rounded-xl bg-zinc-900 font-semibold text-white hover:bg-zinc-800">
              Finalizar compra (simulação)
            </Link>
            <p className="mt-3 text-center text-xs text-zinc-500">Nenhum pagamento é solicitado ou processado.</p>
          </aside>
        </div>
      )}
    </div>
  )
}
