import { useSearchParams } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import { categories, products } from './data'
import { ProductCard } from './ProductCard'

export default function ArenaCatalog() {
  const [params, setParams] = useSearchParams()
  const category = params.get('categoria') ?? ''
  const order = params.get('ordem') ?? 'destaques'
  useSeo({ title: `${category || 'Produtos'} — Arena Store (demonstração)`, noindex: true })

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = products.filter((p) => !category || p.category === category)
  if (order === 'menor-preco') list.sort((a, b) => a.price - b.price)
  if (order === 'maior-preco') list.sort((a, b) => b.price - a.price)
  if (order === 'nome') list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold uppercase italic text-zinc-900 sm:text-4xl">{category || 'Todos os produtos'}</h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {['', ...categories].map((c) => (
            <button
              key={c || 'todos'}
              type="button"
              aria-pressed={category === c}
              onClick={() => set('categoria', c)}
              className={cn(
                'h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors',
                category === c ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 text-zinc-700 hover:border-zinc-900',
              )}
            >
              {c || 'Todos'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 whitespace-nowrap text-sm text-zinc-600">
          Ordenar por
          <select
            value={order}
            onChange={(e) => set('ordem', e.target.value === 'destaques' ? '' : e.target.value)}
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-lime-300/50"
          >
            <option value="destaques">Destaques</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="nome">Nome (A–Z)</option>
          </select>
        </label>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-zinc-500">
        {list.length} {list.length === 1 ? 'produto' : 'produtos'}
      </p>
      {list.length ? (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
          <PackageSearch aria-hidden="true" className="h-10 w-10 text-zinc-400" />
          <p className="mt-3 font-semibold text-zinc-900">Nenhum produto nesta categoria</p>
          <button type="button" onClick={() => set('categoria', '')} className="mt-4 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">
            Ver todos os produtos
          </button>
        </div>
      )}
    </div>
  )
}
