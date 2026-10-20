import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, KeyRound, Home, ShieldCheck, Compass } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { cities, properties, types } from './data'
import { PropertyCard } from './PropertyCard'
import { PropertyArt } from './PropertyArt'
import { InterestForm } from './InterestForm'
import { BASE } from './utils'

const selectCls =
  'h-12 w-full rounded-xl border border-[#e8e1d4] bg-white px-3 text-sm text-[#1f2b26] focus:border-[#a67c3d] focus:outline-none focus:ring-4 focus:ring-[#a67c3d]/15'

export default function PrimeHome() {
  useSeo({ title: 'Prime Imóveis (demonstração)', description: 'Demonstração de portal imobiliário com catálogo, filtros e página de imóvel.', noindex: true })
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [tipo, setTipo] = useState('')
  const [cidade, setCidade] = useState('')
  const [finalidade, setFinalidade] = useState('Venda')
  const featured = properties.filter((p) => p.featured)
  const hero = properties[1]

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (tipo) params.set('tipo', tipo)
    if (cidade) params.set('cidade', cidade)
    if (finalidade) params.set('finalidade', finalidade)
    navigate(`${BASE}/imoveis?${params}`)
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67c3d]">Imóveis selecionados</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#1f2b26] sm:text-6xl">
              Encontre o lugar certo para a próxima fase da sua vida.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#6b665b]">
              Casas, apartamentos e salas comerciais com informações completas e atendimento próximo.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(31_43_38/0.6)]">
              <PropertyArt scene="building" palette={hero.palette} variant={2} className="aspect-[4/3] w-full" />
            </div>
            <Link
              to={`${BASE}/imovel/${hero.id}`}
              className="absolute -bottom-6 left-6 right-6 flex items-center justify-between gap-4 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:left-auto sm:w-80"
            >
              <span>
                <span className="block text-xs text-[#8a816f]">Destaque · {hero.city}</span>
                <span className="block font-serif font-semibold text-[#1f2b26]">{hero.title}</span>
              </span>
              <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#a67c3d]" />
            </Link>
          </div>
        </div>

        {/* Busca */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <form
            onSubmit={onSearch}
            role="search"
            aria-label="Buscar imóveis"
            className="mt-6 rounded-3xl border border-[#e8e1d4] bg-white p-4 shadow-[0_20px_50px_-30px_rgb(31_43_38/0.4)] sm:p-5"
          >
            <div className="mb-4 inline-flex rounded-xl bg-[#f3efe6] p-1" role="radiogroup" aria-label="Finalidade">
              {['Venda', 'Aluguel'].map((f) => (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={finalidade === f}
                  onClick={() => setFinalidade(f)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${finalidade === f ? 'bg-[#1f2b26] text-white' : 'text-[#5b584f]'}`}
                >
                  {f === 'Venda' ? 'Comprar' : 'Alugar'}
                </button>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
              <label className="relative">
                <span className="sr-only">Palavra-chave</span>
                <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a816f]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Bairro, característica ou código (ex.: piscina)"
                  className={`${selectCls} pl-10`}
                />
              </label>
              <label>
                <span className="sr-only">Tipo de imóvel</span>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectCls}>
                  <option value="">Todos os tipos</option>
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Cidade</span>
                <select value={cidade} onChange={(e) => setCidade(e.target.value)} className={selectCls}>
                  <option value="">Todas as cidades</option>
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="h-12 rounded-xl bg-[#a67c3d] px-6 font-semibold text-white transition-colors hover:bg-[#8d6830]">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <section aria-labelledby="destaques" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67c3d]">Destaques</p>
            <h2 id="destaques" className="mt-2 font-serif text-3xl font-semibold text-[#1f2b26] sm:text-4xl">
              Imóveis em destaque
            </h2>
          </div>
          <Link to={`${BASE}/imoveis`} className="inline-flex items-center gap-2 font-semibold text-[#1f2b26] hover:text-[#a67c3d]">
            Ver todos os {properties.length} imóveis <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="cidades" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <h2 id="cidades" className="font-serif text-3xl font-semibold text-[#1f2b26]">
          Explore por cidade
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => {
            const count = properties.filter((p) => p.city === c).length
            return (
              <li key={c}>
                <Link
                  to={`${BASE}/imoveis?cidade=${encodeURIComponent(c)}`}
                  className="group flex items-center justify-between rounded-2xl border border-[#e8e1d4] bg-white p-5 transition-colors hover:border-[#a67c3d]"
                >
                  <span>
                    <span className="block font-serif text-lg font-semibold text-[#1f2b26]">{c}</span>
                    <span className="text-sm text-[#8a816f]">
                      {count} {count === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-5 w-5 text-[#a67c3d] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="diferenciais" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <h2 id="diferenciais" className="sr-only">
          Como ajudamos
        </h2>
        <ul className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Compass, title: 'Busca orientada', text: 'Filtros por cidade, tipo, preço e quartos.' },
            { icon: Home, title: 'Informações completas', text: 'Área, cômodos, vagas e diferenciais de cada imóvel.' },
            { icon: KeyRound, title: 'Compra ou aluguel', text: 'Opções para quem quer comprar ou alugar.' },
            { icon: ShieldCheck, title: 'Atendimento próximo', text: 'Contato direto com o corretor responsável.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-[#f3efe6] p-6">
              <Icon aria-hidden="true" className="h-6 w-6 text-[#a67c3d]" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-[#1f2b26]">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6b665b]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contato" aria-labelledby="contato-prime" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="grid gap-10 overflow-hidden rounded-[2rem] bg-[#1f2b26] p-8 sm:p-12 lg:grid-cols-2">
          <div className="text-[#d8d2c4]">
            <h2 id="contato-prime" className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Não encontrou o que procura?
            </h2>
            <p className="mt-4 max-w-md leading-relaxed">
              Conte o que você precisa e um corretor entra em contato com opções que combinam com o seu perfil.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6">
            <InterestForm />
          </div>
        </div>
      </section>
    </>
  )
}
