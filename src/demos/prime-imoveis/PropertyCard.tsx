import { Link } from 'react-router-dom'
import { BedDouble, Bath, Car, Ruler, MapPin } from 'lucide-react'
import type { Property } from './data'
import { PropertyArt } from './PropertyArt'
import { formatBRL } from '@/lib/format'
import { BASE, formatPrice, variantOf } from './utils'

export function PropertyCard({ property: p }: { property: Property }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e8e1d4] bg-white ring-[#a67c3d] ring-offset-2 has-[:focus-visible]:ring-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(31_43_38/0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#efe9dd]">
        <PropertyArt
          scene={p.gallery[0]}
          palette={p.palette}
          variant={variantOf(p)}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-[#1f2b26] shadow-sm">{p.purpose}</span>
          <span className="rounded-md bg-[#1f2b26]/85 px-2 py-1 text-xs font-medium text-white">{p.type}</span>
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-black/45 px-2 py-0.5 font-mono text-[0.65rem] text-white">
          {p.code}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#8a816f]">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {p.neighborhood}, {p.city}
        </p>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-[#1f2b26]">
          <Link to={`${BASE}/imovel/${p.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {p.title}
          </Link>
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#6b665b]" aria-label="Características">
          {p.bedrooms > 0 && (
            <li className="inline-flex items-center gap-1.5">
              <BedDouble aria-hidden="true" className="h-4 w-4" /> {p.bedrooms} {p.bedrooms === 1 ? 'quarto' : 'quartos'}
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <Bath aria-hidden="true" className="h-4 w-4" /> {p.bathrooms} {p.bathrooms === 1 ? 'banheiro' : 'banheiros'}
          </li>
          {p.parking > 0 && (
            <li className="inline-flex items-center gap-1.5">
              <Car aria-hidden="true" className="h-4 w-4" /> {p.parking} {p.parking === 1 ? 'vaga' : 'vagas'}
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <Ruler aria-hidden="true" className="h-4 w-4" /> {p.area} m²
          </li>
        </ul>
        <div className="mt-auto pt-5">
          <p className="text-xl font-bold text-[#1f2b26]">{formatPrice(p)}</p>
          <p className="mt-0.5 h-4 text-xs text-[#8a816f]">{p.condo ? `Condomínio ${formatBRL(p.condo)}/mês` : ''}</p>
        </div>
      </div>
    </article>
  )
}
