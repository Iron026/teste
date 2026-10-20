import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { categories, products } from './data'
import { ProductArt } from './ProductArt'
import { ProductCard } from './ProductCard'
import { BASE } from './paths'

export default function ArenaHome() {
  useSeo({ title: 'Arena Store — loja virtual (demonstração)', description: 'Demonstração de loja virtual com catálogo, carrinho e checkout simulado.', noindex: true })
  const hero = products[0]
  const featured = products.filter((p) => p.isNew || p.oldPrice)
  const highlights = [...featured, ...products.filter((p) => !featured.includes(p))].slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-lime-300">Nova coleção de corrida</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase italic leading-[0.95] tracking-tight text-white sm:text-7xl">
              Treine mais.
              <br />
              <span className="text-lime-300">Vá além.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-zinc-400">Calçados, roupas e acessórios para quem leva o treino a sério.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`${BASE}/produtos`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 font-bold text-zinc-900 hover:bg-lime-200">
                Comprar agora <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link to={`${BASE}/produto/${hero.id}`} className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 font-semibold text-white hover:bg-white/5">
                Ver {hero.name}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-lime-300/20 blur-3xl" />
            <ProductArt product={hero} className="relative mx-auto w-full max-w-md -rotate-6 rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="categorias" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h2 id="categorias" className="font-display text-2xl font-extrabold uppercase italic text-zinc-900">
          Categorias
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => {
            const sample = products.find((p) => p.category === c)!
            const n = products.filter((p) => p.category === c).length
            return (
              <li key={c}>
                <Link to={`${BASE}/produtos?categoria=${encodeURIComponent(c)}`} className="group relative block overflow-hidden rounded-2xl">
                  <ProductArt product={sample} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-zinc-950/80 to-transparent p-4 pt-12 text-white">
                    <span>
                      <span className="block font-display text-lg font-extrabold uppercase italic">{c}</span>
                      <span className="text-xs text-zinc-300">{n} produtos</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="destaques-loja" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 id="destaques-loja" className="font-display text-2xl font-extrabold uppercase italic text-zinc-900">
            Lançamentos e ofertas
          </h2>
          <Link to={`${BASE}/produtos`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:underline">
            Ver todos <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {highlights.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
