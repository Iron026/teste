import { Link } from 'react-router-dom'
import { formatBRL } from '@/lib/format'
import type { Product } from './data'
import { ProductArt } from './ProductArt'
import { BASE } from './paths'

export function ProductCard({ product: p }: { product: Product }) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
  return (
    <article className="group relative rounded-2xl ring-lime-500 ring-offset-4 has-[:focus-visible]:ring-2">
      <div className="relative overflow-hidden rounded-2xl">
        <ProductArt product={p} className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {p.isNew && <span className="rounded-md bg-zinc-900 px-2 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-lime-300">Novo</span>}
          {discount > 0 && <span className="rounded-md bg-lime-300 px-2 py-1 text-[0.7rem] font-bold text-zinc-900">-{discount}%</span>}
        </div>
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zinc-500">{p.category}</p>
      <h3 className="mt-1 font-semibold text-zinc-900">
        <Link to={`${BASE}/produto/${p.id}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline">
          {p.name}
        </Link>
      </h3>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-bold tabular-nums text-zinc-900">{formatBRL(p.price)}</span>
        {p.oldPrice && <span className="text-sm tabular-nums text-zinc-500 line-through">{formatBRL(p.oldPrice)}</span>}
      </p>
    </article>
  )
}
