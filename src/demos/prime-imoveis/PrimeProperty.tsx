import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BedDouble, Bath, Car, Ruler, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { formatBRL } from '@/lib/format'
import { cn } from '@/lib/cn'
import { getProperty, properties, sceneLabels } from './data'
import { PropertyArt } from './PropertyArt'
import { PropertyCard } from './PropertyCard'
import { InterestForm } from './InterestForm'
import { BASE, formatPrice, variantOf } from './utils'

export default function PrimeProperty() {
  const { id = '' } = useParams()
  const p = getProperty(id)
  const [index, setIndex] = useState(0)
  useSeo({ title: p ? `${p.title} — Prime Imóveis (demonstração)` : 'Imóvel não encontrado', noindex: true })

  useEffect(() => setIndex(0), [id])
  const total = p?.gallery.length ?? 0
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + total) % total), [total])

  if (!p) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#1f2b26]">Imóvel não encontrado</h1>
        <p className="mt-3 text-[#6b665b]">O imóvel pode ter sido removido ou o endereço está incorreto.</p>
        <Link to={`${BASE}/imoveis`} className="mt-6 inline-flex rounded-xl bg-[#1f2b26] px-5 py-3 font-semibold text-white">
          Ver todos os imóveis
        </Link>
      </div>
    )
  }

  const related = properties.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3)
  const scene = p.gallery[index]

  const stats = [
    p.bedrooms > 0 && { icon: BedDouble, label: 'Quartos', value: p.bedrooms },
    { icon: Bath, label: 'Banheiros', value: p.bathrooms },
    { icon: Car, label: 'Vagas', value: p.parking },
    { icon: Ruler, label: 'Área útil', value: `${p.area} m²` },
  ].filter(Boolean) as { icon: typeof Bath; label: string; value: string | number }[]

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link to={`${BASE}/imoveis`} className="inline-flex items-center gap-2 text-sm font-medium text-[#6b665b] hover:text-[#1f2b26]">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar para a lista
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-md bg-[#1f2b26] px-2 py-1 text-white">{p.purpose}</span>
            <span className="rounded-md bg-[#efe9dd] px-2 py-1 text-[#5b584f]">{p.type}</span>
            <span className="rounded-md bg-[#efe9dd] px-2 py-1 font-mono text-[#5b584f]">{p.code}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#1f2b26] sm:text-4xl">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-[#6b665b]">
            <MapPin aria-hidden="true" className="h-4 w-4" /> {p.neighborhood}, {p.city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#1f2b26]">{formatPrice(p)}</p>
          {p.condo && <p className="text-sm text-[#6b6455]">Condomínio: {formatBRL(p.condo)}/mês</p>}
        </div>
      </div>

      {/* Galeria */}
      <section aria-label="Galeria de imagens" aria-roledescription="carrossel" className="mt-8">
        <div
          className="group relative overflow-hidden rounded-3xl bg-[#efe9dd]"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1)
            if (e.key === 'ArrowLeft') go(-1)
          }}
          aria-label="Use as setas do teclado para navegar entre as imagens"
        >
          <PropertyArt
            key={scene + index}
            scene={scene}
            palette={p.palette}
            variant={variantOf(p)}
            title={`${sceneLabels[scene]} — ilustração do imóvel`}
            className="aspect-[16/9] w-full animate-fade-up"
          />
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2b26] shadow-lg hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2b26] shadow-lg hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-medium text-white" aria-live="polite">
            {sceneLabels[scene]} · {index + 1} de {total}
          </p>
          <p className="absolute bottom-3 right-3 rounded-lg bg-black/40 px-2 py-1 text-[0.65rem] text-white/90">Imagem ilustrativa</p>
        </div>
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {p.gallery.map((s, i) => (
            <li key={s + i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver imagem ${i + 1}: ${sceneLabels[s]}`}
                aria-current={i === index}
                className={cn(
                  'block w-full overflow-hidden rounded-xl ring-2 transition-all',
                  i === index ? 'ring-[#87612a]' : 'opacity-70 ring-transparent hover:opacity-100',
                )}
              >
                <PropertyArt scene={s} palette={p.palette} variant={variantOf(p)} className="aspect-[16/10] w-full" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-2xl border border-[#e8e1d4] bg-white p-4">
                <Icon aria-hidden="true" className="h-5 w-5 text-[#87612a]" />
                <p className="mt-3 text-2xl font-bold text-[#1f2b26]">{value}</p>
                <p className="text-sm text-[#6b6455]">{label}</p>
              </li>
            ))}
          </ul>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1f2b26]">Sobre o imóvel</h2>
            <p className="mt-3 text-lg leading-relaxed text-[#5b584f]">{p.description}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1f2b26]">Diferenciais</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[#3b3a36]">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#efe9dd]">
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#87612a]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-[#e8e1d4] bg-white p-6 shadow-[0_20px_50px_-30px_rgb(31_43_38/0.35)]">
            <h2 className="font-serif text-xl font-semibold text-[#1f2b26]">Agende uma visita</h2>
            <p className="mb-5 mt-1 text-sm text-[#6b6455]">Imóvel {p.code}</p>
            <InterestForm key={p.id} subject={`${p.code} (${p.title})`} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="semelhantes" className="mt-20">
          <h2 id="semelhantes" className="font-serif text-2xl font-semibold text-[#1f2b26]">
            Imóveis semelhantes
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <PropertyCard key={r.id} property={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
