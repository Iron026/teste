/**
 * DADOS FICTÍCIOS — Prime Imóveis (demonstração)
 * Bairros, descrições, códigos e valores são inventados.
 * As imagens são ilustrações geradas em SVG (ver PropertyArt.tsx).
 */

export type PropertyType = 'Casa' | 'Apartamento' | 'Cobertura' | 'Sobrado' | 'Studio' | 'Sala comercial'
export type Purpose = 'Venda' | 'Aluguel'
export type Scene = 'house' | 'building' | 'living' | 'kitchen' | 'bedroom' | 'office'

export interface Palette {
  /** Cor da fachada / parede principal */
  wall: string
  /** Cor de detalhe (portas, móveis, sofá) */
  accent: string
  /** Cor do céu / fundo */
  sky: string
  /** Cor do telhado / piso */
  roof: string
}

export interface Property {
  id: string
  code: string
  title: string
  type: PropertyType
  purpose: Purpose
  city: string
  neighborhood: string
  price: number
  /** Taxa de condomínio mensal, quando houver */
  condo?: number
  bedrooms: number
  bathrooms: number
  parking: number
  area: number
  description: string
  features: string[]
  palette: Palette
  gallery: Scene[]
  featured?: boolean
}

export const cities = ['Curitiba', 'Florianópolis', 'Belo Horizonte', 'Campinas'] as const
export const types: PropertyType[] = ['Casa', 'Apartamento', 'Cobertura', 'Sobrado', 'Studio', 'Sala comercial']

export const priceRanges = [
  { id: 'ate-3k', label: 'Até R$ 3 mil (aluguel)', min: 0, max: 3000, purpose: 'Aluguel' as Purpose },
  { id: '3k-mais', label: 'Acima de R$ 3 mil (aluguel)', min: 3000, max: Infinity, purpose: 'Aluguel' as Purpose },
  { id: 'ate-500k', label: 'Até R$ 500 mil', min: 0, max: 500_000, purpose: 'Venda' as Purpose },
  { id: '500k-1m', label: 'R$ 500 mil a R$ 1 milhão', min: 500_000, max: 1_000_000, purpose: 'Venda' as Purpose },
  { id: '1m-mais', label: 'Acima de R$ 1 milhão', min: 1_000_000, max: Infinity, purpose: 'Venda' as Purpose },
]

const P = {
  sand: { wall: '#efe6d8', accent: '#8a6a43', sky: '#cfe3f1', roof: '#4b4b52' },
  white: { wall: '#f6f6f3', accent: '#3a4a5e', sky: '#d6e8f5', roof: '#2f3640' },
  terracotta: { wall: '#ead2c0', accent: '#a2553a', sky: '#f3dcc7', roof: '#7c3f2c' },
  sage: { wall: '#dfe6dc', accent: '#5c7358', sky: '#dcebe6', roof: '#3f4a44' },
  slate: { wall: '#d9dee6', accent: '#2f4a6b', sky: '#e3ecf6', roof: '#28313d' },
  cream: { wall: '#f3ecdf', accent: '#b08d57', sky: '#e8eef4', roof: '#5a4a3a' },
}

export const properties: Property[] = [
  {
    id: 'casa-jardim-das-araucarias',
    code: 'PI-101',
    title: 'Casa térrea com quintal arborizado',
    type: 'Casa',
    purpose: 'Venda',
    city: 'Curitiba',
    neighborhood: 'Jardim das Araucárias',
    price: 690_000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 168,
    description:
      'Casa térrea em rua tranquila, com sala integrada à cozinha, suíte com closet e quintal amplo com espaço para horta. Iluminação natural em todos os ambientes.',
    features: ['Suíte com closet', 'Quintal com 80 m²', 'Churrasqueira', 'Aquecimento a gás', 'Portão eletrônico'],
    palette: P.sand,
    gallery: ['house', 'living', 'kitchen', 'bedroom'],
    featured: true,
  },
  {
    id: 'apartamento-vista-mar',
    code: 'PI-102',
    title: 'Apartamento com varanda e vista para o mar',
    type: 'Apartamento',
    purpose: 'Venda',
    city: 'Florianópolis',
    neighborhood: 'Praia Serena',
    price: 1_150_000,
    condo: 980,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 124,
    description:
      'Apartamento em andar alto com varanda gourmet voltada para o mar, planta bem distribuída e condomínio com piscina e academia.',
    features: ['Varanda gourmet', 'Piscina no condomínio', 'Academia', 'Portaria 24 horas', '2 vagas cobertas'],
    palette: P.white,
    gallery: ['building', 'living', 'bedroom', 'kitchen'],
    featured: true,
  },
  {
    id: 'cobertura-duplex-centro',
    code: 'PI-103',
    title: 'Cobertura duplex com terraço',
    type: 'Cobertura',
    purpose: 'Venda',
    city: 'Belo Horizonte',
    neighborhood: 'Alto da Serra',
    price: 1_480_000,
    condo: 1_450,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    area: 240,
    description:
      'Cobertura duplex com terraço privativo, espaço gourmet e vista panorâmica da serra. Pé-direito duplo na sala de estar.',
    features: ['Terraço privativo', 'Pé-direito duplo', 'Espaço gourmet', 'Hidromassagem', 'Depósito privativo'],
    palette: P.slate,
    gallery: ['building', 'living', 'kitchen', 'bedroom'],
    featured: true,
  },
  {
    id: 'studio-proximo-universidade',
    code: 'PI-104',
    title: 'Studio mobiliado perto da universidade',
    type: 'Studio',
    purpose: 'Aluguel',
    city: 'Campinas',
    neighborhood: 'Vila Universitária',
    price: 1_850,
    condo: 420,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    area: 32,
    description:
      'Studio compacto e funcional, entregue mobiliado, a poucos minutos a pé de faculdades, mercados e transporte público.',
    features: ['Mobiliado', 'Lavanderia compartilhada', 'Bicicletário', 'Internet inclusa no condomínio'],
    palette: P.sage,
    gallery: ['building', 'bedroom', 'kitchen'],
  },
  {
    id: 'sobrado-condominio-fechado',
    code: 'PI-105',
    title: 'Sobrado em condomínio fechado',
    type: 'Sobrado',
    purpose: 'Venda',
    city: 'Campinas',
    neighborhood: 'Residencial Bosque Verde',
    price: 980_000,
    condo: 650,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 210,
    description:
      'Sobrado em condomínio com área verde e segurança, com três suítes no andar superior e lavabo social no térreo.',
    features: ['3 suítes', 'Lavabo', 'Área verde no condomínio', 'Playground', 'Segurança 24 horas'],
    palette: P.cream,
    gallery: ['house', 'living', 'bedroom', 'kitchen'],
  },
  {
    id: 'apartamento-compacto-metro',
    code: 'PI-106',
    title: 'Apartamento compacto próximo ao transporte',
    type: 'Apartamento',
    purpose: 'Aluguel',
    city: 'Belo Horizonte',
    neighborhood: 'Centro Novo',
    price: 2_400,
    condo: 550,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    area: 58,
    description:
      'Apartamento de dois quartos com cozinha americana, em região com comércio variado e fácil acesso ao transporte público.',
    features: ['Cozinha americana', 'Elevador', 'Área de serviço', 'Aceita pets'],
    palette: P.terracotta,
    gallery: ['building', 'living', 'bedroom'],
  },
  {
    id: 'casa-praia-campeche',
    code: 'PI-107',
    title: 'Casa a 300 m da praia',
    type: 'Casa',
    purpose: 'Aluguel',
    city: 'Florianópolis',
    neighborhood: 'Recanto das Dunas',
    price: 4_800,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 140,
    description:
      'Casa ventilada a uma curta caminhada da praia, com varanda, ducha externa e jardim. Ideal para quem busca qualidade de vida.',
    features: ['Varanda', 'Ducha externa', 'Jardim', 'Churrasqueira', 'Aceita pets'],
    palette: P.white,
    gallery: ['house', 'living', 'kitchen', 'bedroom'],
  },
  {
    id: 'sala-comercial-av-principal',
    code: 'PI-108',
    title: 'Sala comercial em edifício corporativo',
    type: 'Sala comercial',
    purpose: 'Aluguel',
    city: 'Curitiba',
    neighborhood: 'Centro Empresarial',
    price: 3_200,
    condo: 780,
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    area: 45,
    description:
      'Sala pronta para uso em edifício corporativo com recepção, ar-condicionado central e auditório compartilhado.',
    features: ['Ar-condicionado', 'Recepção', 'Auditório compartilhado', 'Piso elevado'],
    palette: P.slate,
    gallery: ['building', 'office'],
  },
  {
    id: 'apartamento-garden',
    code: 'PI-109',
    title: 'Apartamento garden com área externa',
    type: 'Apartamento',
    purpose: 'Venda',
    city: 'Curitiba',
    neighborhood: 'Parque dos Ipês',
    price: 545_000,
    condo: 520,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 96,
    description:
      'Apartamento térreo com área externa privativa, ótimo para quem tem animais de estimação ou quer espaço ao ar livre.',
    features: ['Área externa privativa', 'Suíte', 'Salão de festas', 'Aceita pets'],
    palette: P.sage,
    gallery: ['building', 'living', 'bedroom', 'kitchen'],
  },
  {
    id: 'casa-terrea-familia',
    code: 'PI-110',
    title: 'Casa térrea para família',
    type: 'Casa',
    purpose: 'Venda',
    city: 'Belo Horizonte',
    neighborhood: 'Jardim Primavera',
    price: 420_000,
    bedrooms: 3,
    bathrooms: 1,
    parking: 2,
    area: 120,
    description:
      'Casa térrea em bairro residencial, próxima a escolas e praças, com garagem para dois carros e edícula nos fundos.',
    features: ['Edícula', 'Garagem para 2 carros', 'Área de serviço coberta', 'Próximo a escolas'],
    palette: P.terracotta,
    gallery: ['house', 'living', 'kitchen'],
  },
  {
    id: 'sobrado-moderno',
    code: 'PI-111',
    title: 'Sobrado moderno com piscina',
    type: 'Sobrado',
    purpose: 'Venda',
    city: 'Florianópolis',
    neighborhood: 'Lagoa Clara',
    price: 1_890_000,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    area: 320,
    description:
      'Sobrado de arquitetura contemporânea, com piscina aquecida, home office e integração total entre sala, cozinha e área gourmet.',
    features: ['Piscina aquecida', 'Home office', 'Área gourmet', 'Energia solar', 'Automação de iluminação'],
    palette: P.cream,
    gallery: ['house', 'living', 'kitchen', 'bedroom'],
  },
  {
    id: 'apartamento-familia-campinas',
    code: 'PI-112',
    title: 'Apartamento de 3 quartos com lazer completo',
    type: 'Apartamento',
    purpose: 'Aluguel',
    city: 'Campinas',
    neighborhood: 'Jardim Paineiras',
    price: 3_600,
    condo: 890,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 88,
    description:
      'Apartamento em condomínio clube, com piscina, quadra e espaço kids. Planta com suíte e varanda com churrasqueira.',
    features: ['Condomínio clube', 'Varanda com churrasqueira', 'Suíte', 'Quadra esportiva', 'Espaço kids'],
    palette: P.sand,
    gallery: ['building', 'living', 'bedroom', 'kitchen'],
  },
]

export function getProperty(id: string) {
  return properties.find((p) => p.id === id)
}

export const sceneLabels: Record<Scene, string> = {
  house: 'Fachada',
  building: 'Fachada do edifício',
  living: 'Sala de estar',
  kitchen: 'Cozinha',
  bedroom: 'Quarto',
  office: 'Ambiente interno',
}
