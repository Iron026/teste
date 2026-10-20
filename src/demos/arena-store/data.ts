/**
 * CATÁLOGO FICTÍCIO — Arena Store (demonstração)
 * Produtos, marcas e preços são inventados. Imagens: ilustrações SVG autorais.
 */

export type Category = 'Calçados' | 'Roupas' | 'Bolas' | 'Acessórios'
export type ArtKind = 'shoe' | 'cleat' | 'shirt' | 'shorts' | 'leggings' | 'soccerball' | 'basketball' | 'volleyball' | 'backpack' | 'bottle'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  /** Preço anterior (para exibir desconto), opcional */
  oldPrice?: number
  sizes: string[]
  description: string
  details: string[]
  art: { kind: ArtKind; main: string; accent: string; bg: string }
  isNew?: boolean
}

export const categories: Category[] = ['Calçados', 'Roupas', 'Bolas', 'Acessórios']

const shoeSizes = ['37', '38', '39', '40', '41', '42', '43', '44']
const clothSizes = ['P', 'M', 'G', 'GG']
const single = ['Único']

export const products: Product[] = [
  {
    id: 'tenis-corrida-velocity',
    name: 'Tênis de corrida Velocity',
    category: 'Calçados',
    price: 399.9,
    oldPrice: 459.9,
    sizes: shoeSizes,
    description: 'Tênis leve com amortecimento responsivo para treinos diários e provas de rua.',
    details: ['Cabedal em tecido respirável', 'Entressola com amortecimento', 'Solado de borracha antiderrapante', 'Peso aproximado: 260 g (tam. 40)'],
    art: { kind: 'shoe', main: '#2563eb', accent: '#a3e635', bg: '#e0ecff' },
    isNew: true,
  },
  {
    id: 'chuteira-society-strike',
    name: 'Chuteira society Strike',
    category: 'Calçados',
    price: 279.9,
    sizes: shoeSizes,
    description: 'Chuteira para gramado sintético com travas baixas e bom controle de bola.',
    details: ['Travas para society', 'Cabedal sintético', 'Palmilha anatômica', 'Ajuste por cadarço'],
    art: { kind: 'cleat', main: '#111827', accent: '#f97316', bg: '#ffe9dc' },
  },
  {
    id: 'camiseta-dry-pro',
    name: 'Camiseta Dry Pro',
    category: 'Roupas',
    price: 89.9,
    sizes: clothSizes,
    description: 'Camiseta de tecido leve que seca rápido, ideal para corrida e academia.',
    details: ['Tecido de secagem rápida', 'Costuras planas', 'Faixas refletivas', '100% poliéster'],
    art: { kind: 'shirt', main: '#16a34a', accent: '#dcfce7', bg: '#e3f7e9' },
  },
  {
    id: 'short-treino-flex',
    name: 'Short de treino Flex',
    category: 'Roupas',
    price: 79.9,
    oldPrice: 99.9,
    sizes: clothSizes,
    description: 'Short com elástico confortável e bolso lateral para chaves ou cartão.',
    details: ['Cós elástico com cordão', 'Bolso lateral com zíper', 'Tecido com elastano', 'Comprimento médio'],
    art: { kind: 'shorts', main: '#1f2937', accent: '#a3e635', bg: '#eceff3' },
  },
  {
    id: 'legging-motion',
    name: 'Legging de compressão Motion',
    category: 'Roupas',
    price: 139.9,
    sizes: ['PP', 'P', 'M', 'G'],
    description: 'Legging de cintura alta com compressão leve e tecido que não fica transparente.',
    details: ['Cintura alta', 'Compressão leve', 'Bolso interno no cós', 'Tecido com proteção UV'],
    art: { kind: 'leggings', main: '#7c3aed', accent: '#c4b5fd', bg: '#efe9ff' },
    isNew: true,
  },
  {
    id: 'bola-futebol-match',
    name: 'Bola de futebol Arena Match',
    category: 'Bolas',
    price: 149.9,
    sizes: single,
    description: 'Bola de campo com gomos termossoldados para trajetória estável.',
    details: ['Tamanho oficial 5', 'Gomos termossoldados', 'Câmara de butil', 'Uso em grama natural'],
    art: { kind: 'soccerball', main: '#ffffff', accent: '#111827', bg: '#e6f4ea' },
  },
  {
    id: 'bola-basquete-street',
    name: 'Bola de basquete Street',
    category: 'Bolas',
    price: 169.9,
    sizes: single,
    description: 'Bola de borracha resistente para quadras externas.',
    details: ['Tamanho 7', 'Borracha de alta durabilidade', 'Textura com boa aderência', 'Uso externo'],
    art: { kind: 'basketball', main: '#ea580c', accent: '#1f2937', bg: '#fff1e6' },
  },
  {
    id: 'bola-volei-spike',
    name: 'Bola de vôlei Spike',
    category: 'Bolas',
    price: 129.9,
    sizes: single,
    description: 'Bola macia de toque confortável para quadra e lazer.',
    details: ['Tamanho oficial', 'Revestimento macio', '18 gomos', 'Uso em quadra coberta'],
    art: { kind: 'volleyball', main: '#facc15', accent: '#2563eb', bg: '#fdf8dc' },
  },
  {
    id: 'mochila-train-25',
    name: 'Mochila esportiva Train 25 L',
    category: 'Acessórios',
    price: 189.9,
    sizes: single,
    description: 'Mochila com compartimento para tênis e bolso acolchoado para notebook.',
    details: ['Capacidade de 25 litros', 'Compartimento ventilado para calçados', 'Bolso para notebook de até 15"', 'Alças acolchoadas'],
    art: { kind: 'backpack', main: '#0f766e', accent: '#99f6e4', bg: '#e0f5f2' },
  },
  {
    id: 'garrafa-hydro-750',
    name: 'Garrafa térmica Hydro 750 ml',
    category: 'Acessórios',
    price: 69.9,
    sizes: single,
    description: 'Garrafa de aço inox com parede dupla que mantém a bebida gelada por horas.',
    details: ['Aço inoxidável', 'Parede dupla a vácuo', 'Tampa com alça', 'Livre de BPA'],
    art: { kind: 'bottle', main: '#0ea5e9', accent: '#e0f2fe', bg: '#e1f3fb' },
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

/** Regras de frete fictícias da demonstração */
export const FREE_SHIPPING_FROM = 299
export const SHIPPING_FEE = 19.9
