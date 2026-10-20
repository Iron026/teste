import { formatBRL, normalize } from '@/lib/format'
import { priceRanges, properties, type Property } from './data'

export const BASE = '/demos/prime-imoveis'

export function formatPrice(p: Property) {
  return p.purpose === 'Aluguel' ? `${formatBRL(p.price)}/mês` : formatBRL(p.price)
}

export function variantOf(p: Property) {
  return properties.indexOf(p)
}

export interface Filters {
  q: string
  cidade: string
  tipo: string
  finalidade: string
  preco: string
  quartos: string
  ordem: string
}

export function readFilters(params: URLSearchParams): Filters {
  return {
    q: params.get('q') ?? '',
    cidade: params.get('cidade') ?? '',
    tipo: params.get('tipo') ?? '',
    finalidade: params.get('finalidade') ?? '',
    preco: params.get('preco') ?? '',
    quartos: params.get('quartos') ?? '',
    ordem: params.get('ordem') ?? 'relevancia',
  }
}

export function applyFilters(list: Property[], f: Filters) {
  const terms = normalize(f.q).split(/\s+/).filter(Boolean)
  const range = priceRanges.find((r) => r.id === f.preco)
  const minRooms = Number(f.quartos) || 0

  const result = list.filter((p) => {
    if (f.cidade && p.city !== f.cidade) return false
    if (f.tipo && p.type !== f.tipo) return false
    if (f.finalidade && p.purpose !== f.finalidade) return false
    if (range && (p.purpose !== range.purpose || p.price < range.min || p.price >= range.max)) return false
    if (minRooms && p.bedrooms < minRooms) return false
    if (terms.length) {
      const haystack = normalize(
        [p.title, p.type, p.city, p.neighborhood, p.code, p.description, ...p.features].join(' '),
      )
      if (!terms.every((t) => haystack.includes(t))) return false
    }
    return true
  })

  switch (f.ordem) {
    case 'menor-preco':
      return result.sort((a, b) => a.price - b.price)
    case 'maior-preco':
      return result.sort((a, b) => b.price - a.price)
    case 'maior-area':
      return result.sort((a, b) => b.area - a.area)
    default:
      return result.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  }
}
