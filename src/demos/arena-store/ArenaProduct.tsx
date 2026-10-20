import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { formatBRL } from '@/lib/format'
import { cn } from '@/lib/cn'
import { getProduct, products } from './data'
import { ProductArt } from './ProductArt'
import { ProductCard } from './ProductCard'
import { QtyStepper } from './QtyStepper'
import { useCart } from './cart'
import { BASE } from './paths'

export default function ArenaProduct() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { add, setDrawerOpen } = useCart()
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  useSeo({ title: product ? `${product.name} — Arena Store (demonstração)` : 'Produto não encontrado', noindex: true })

  useEffect(() => {
    setSize(product?.sizes.length === 1 ? product.sizes[0] : '')
    setQty(1)
    setError('')
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-zinc-900">Produto não encontrado</h1>
        <Link to={`${BASE}/produtos`} className="mt-6 inline-flex rounded-xl bg-zinc-900 px-5 py-3 font-semibold text-white">
          Ver produtos
        </Link>
      </div>
    )
  }

  const onAdd = () => {
    if (!size) {
      setError('Selecione um tamanho para continuar.')
      document.getElementById('tamanhos')?.focus()
      return
    }
    add(product.id, size, qty)
    setDrawerOpen(true)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link to={`${BASE}/produtos?categoria=${encodeURIComponent(product.category)}`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {product.category}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <ProductArt product={product} className="aspect-square w-full" />
          <p className="sr-only">Ilustração do produto {product.name}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold tabular-nums text-zinc-900">{formatBRL(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="tabular-nums text-zinc-500 line-through">{formatBRL(product.oldPrice)}</span>
                <span className="rounded-md bg-lime-300 px-2 py-0.5 text-sm font-bold text-zinc-900">-{discount}%</span>
              </>
            )}
          </p>
          <p className="mt-1 text-sm text-zinc-500">ou 3x de {formatBRL(Math.round((product.price / 3) * 100) / 100)} sem juros (simulado)</p>
          <p className="mt-6 leading-relaxed text-zinc-600">{product.description}</p>

          <fieldset className="mt-8">
            <legend className="flex w-full items-center justify-between text-sm font-semibold text-zinc-900">
              Tamanho {size && <span className="font-normal text-zinc-500">Selecionado: {size}</span>}
            </legend>
            <div
              id="tamanhos"
              tabIndex={-1}
              role="radiogroup"
              aria-label="Tamanhos disponíveis"
              aria-describedby={error ? 'erro-tamanho' : undefined}
              className="mt-3 flex flex-wrap gap-2 rounded-xl focus:outline-none"
            >
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => {
                    setSize(s)
                    setError('')
                  }}
                  className={cn(
                    'h-12 min-w-12 rounded-xl border px-3 text-sm font-semibold transition-colors',
                    size === s ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 text-zinc-800 hover:border-zinc-900',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <p id="erro-tamanho" role="alert" className="mt-2 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </fieldset>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QtyStepper value={qty} onChange={setQty} label="Quantidade" />
            <button type="button" onClick={onAdd} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-900 sm:flex-1 px-6 font-semibold text-white hover:bg-zinc-800">
              <ShoppingBag aria-hidden="true" className="h-5 w-5" /> Adicionar ao carrinho
            </button>
          </div>

          <div className="mt-10 border-t border-zinc-200 pt-6">
            <h2 className="font-semibold text-zinc-900">Detalhes do produto</h2>
            <ul className="mt-3 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-zinc-600">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lime-600" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-20">
          <h2 id="relacionados" className="font-display text-2xl font-extrabold uppercase italic text-zinc-900">
            Você também pode gostar
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
