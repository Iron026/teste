import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import { cities, priceRanges, properties, types } from './data'
import { PropertyCard } from './PropertyCard'
import { applyFilters, readFilters, type Filters } from './utils'

const control =
  'h-11 w-full rounded-xl border border-[#e8e1d4] bg-white px-3 text-sm text-[#1f2b26] focus:border-[#a67c3d] focus:outline-none focus:ring-4 focus:ring-[#a67c3d]/15'

export default function PrimeCatalog() {
  useSeo({ title: 'Imóveis — Prime Imóveis (demonstração)', noindex: true })
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)
  const [showFilters, setShowFilters] = useState(false)
  const results = applyFilters([...properties], filters)

  const update = (key: keyof Filters, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    // Faixa de preço depende da finalidade: limpa se ficar incompatível
    if (key === 'finalidade') {
      const range = priceRanges.find((r) => r.id === next.get('preco'))
      if (range && value && range.purpose !== value) next.delete('preco')
    }
    if (key === 'preco' && value) {
      const range = priceRanges.find((r) => r.id === value)
      if (range) next.set('finalidade', range.purpose)
    }
    setParams(next, { replace: true })
  }

  const clear = () => setParams(new URLSearchParams(), { replace: true })
  const activeCount = (['q', 'cidade', 'tipo', 'finalidade', 'preco', 'quartos'] as const).filter((k) => filters[k]).length
  const ranges = priceRanges.filter((r) => !filters.finalidade || r.purpose === filters.finalidade)

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <label htmlFor="f-finalidade" className="mb-1.5 block text-sm font-semibold text-[#1f2b26]">
          Finalidade
        </label>
        <select id="f-finalidade" className={control} value={filters.finalidade} onChange={(e) => update('finalidade', e.target.value)}>
          <option value="">Comprar ou alugar</option>
          <option value="Venda">Comprar</option>
          <option value="Aluguel">Alugar</option>
        </select>
      </div>
      <div>
        <label htmlFor="f-cidade" className="mb-1.5 block text-sm font-semibold text-[#1f2b26]">
          Localização
        </label>
        <select id="f-cidade" className={control} value={filters.cidade} onChange={(e) => update('cidade', e.target.value)}>
          <option value="">Todas as cidades</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-tipo" className="mb-1.5 block text-sm font-semibold text-[#1f2b26]">
          Tipo de imóvel
        </label>
        <select id="f-tipo" className={control} value={filters.tipo} onChange={(e) => update('tipo', e.target.value)}>
          <option value="">Todos os tipos</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-preco" className="mb-1.5 block text-sm font-semibold text-[#1f2b26]">
          Faixa de preço
        </label>
        <select id="f-preco" className={control} value={filters.preco} onChange={(e) => update('preco', e.target.value)}>
          <option value="">Qualquer valor</option>
          {ranges.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-[#1f2b26]">Quartos</legend>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-1.5">
          {['', '1', '2', '3', '4'].map((n) => (
            <button
              key={n || 'todos'}
              type="button"
              aria-pressed={filters.quartos === n}
              onClick={() => update('quartos', n)}
              className={cn(
                'h-10 rounded-lg border px-1 text-sm font-semibold transition-colors',
                filters.quartos === n ? 'border-[#1f2b26] bg-[#1f2b26] text-white' : 'border-[#e8e1d4] bg-white text-[#5b584f] hover:border-[#a67c3d]',
              )}
            >
              {n ? `${n}+` : 'Todos'}
            </button>
          ))}
        </div>
      </fieldset>
      {activeCount > 0 && (
        <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a67c3d] hover:underline">
          <X aria-hidden="true" className="h-4 w-4" /> Limpar filtros
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold text-[#1f2b26] sm:text-4xl">Imóveis disponíveis</h1>

      <div className="mt-6 flex gap-3">
        <label className="relative flex-1">
          <span className="sr-only">Buscar por palavra-chave</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a816f]" />
          <input
            type="search"
            value={filters.q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Busque por bairro, característica ou código (ex.: PI-107, piscina, pets)"
            className={`${control} h-12 pl-10`}
          />
        </label>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          aria-controls="filtros-mobile"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#e8e1d4] bg-white px-4 text-sm font-semibold text-[#1f2b26] lg:hidden"
        >
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" /> Filtros
          {activeCount > 0 && <span className="rounded-full bg-[#a67c3d] px-1.5 text-xs text-white">{activeCount}</span>}
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-[#e8e1d4] bg-white p-5">{filterPanel}</div>
        </aside>
        <div id="filtros-mobile" hidden={!showFilters} className="rounded-2xl border border-[#e8e1d4] bg-white p-5 lg:hidden">
          {filterPanel}
        </div>

        <section aria-label="Resultados">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p role="status" aria-live="polite" className="text-sm text-[#6b665b]">
              <strong className="text-[#1f2b26]">{results.length}</strong> {results.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
            <label className="flex items-center gap-2 whitespace-nowrap text-sm text-[#6b665b]">
              Ordenar por
              <select value={filters.ordem} onChange={(e) => update('ordem', e.target.value)} className={`${control} h-10 w-auto`}>
                <option value="relevancia">Destaques</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="maior-area">Maior área</option>
              </select>
            </label>
          </div>

          {results.length ? (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-[#d9cfbd] bg-white px-6 py-16 text-center">
              <SearchX aria-hidden="true" className="h-10 w-10 text-[#a67c3d]" />
              <h2 className="mt-4 font-serif text-xl font-semibold text-[#1f2b26]">Nenhum imóvel encontrado</h2>
              <p className="mt-2 max-w-sm text-sm text-[#6b665b]">Tente remover algum filtro ou buscar por outra palavra-chave.</p>
              <button type="button" onClick={clear} className="mt-5 rounded-xl bg-[#1f2b26] px-5 py-2.5 text-sm font-semibold text-white">
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
