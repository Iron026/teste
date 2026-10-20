/**
 * PROJETOS DO PORTFÓLIO
 * ------------------------------------------------------------------
 * Cada objeto abaixo gera automaticamente:
 *  - um card na seção "Projetos" da página inicial;
 *  - uma página de apresentação em /projetos/<slug>.
 *
 * Para cadastrar um novo projeto, veja o passo a passo em
 * docs/NOVO-PROJETO.md. Resumo:
 *  1. Coloque uma imagem de capa em public/projetos/ (ex.: meu-projeto.webp).
 *  2. Copie um dos objetos abaixo, troque o slug e os textos.
 *  3. Aponte `cover: '/projetos/meu-projeto.webp'`.
 *  4. Em `demoUrl`, use um link externo (https://...) ou uma rota interna.
 */

export interface Project {
  slug: string
  name: string
  /** Categoria curta exibida no card. */
  category: string
  /** Frase de uma linha. */
  summary: string
  /** Descrição objetiva (1 a 2 frases). */
  description: string
  /** Problema que o projeto resolve. */
  problem: string
  /** Como a solução resolve o problema. */
  solution: string
  features: string[]
  technologies: string[]
  /** Rota interna (ex.: '/demos/x') ou URL externa (https://...). */
  demoUrl: string
  /** Imagem de capa em /public (recomendado: 1600×1000, formato .webp). */
  cover: string
  /** Texto alternativo da capa (acessibilidade). */
  coverAlt: string
  /** Cor de destaque usada no card (hex). */
  accent: string
  /** Material extra para download, se houver. */
  download?: { label: string; href: string }
  /** Sempre true enquanto o projeto não for de um cliente real. */
  demonstrative: boolean
}

export const projects: Project[] = [
  {
    slug: 'prime-imoveis',
    name: 'Prime Imóveis',
    category: 'Portal imobiliário',
    summary: 'Catálogo de imóveis com busca, filtros e página individual com galeria.',
    description:
      'Site para imobiliárias e corretores apresentarem imóveis de forma organizada, com filtros que ajudam o visitante a encontrar rapidamente o que procura.',
    problem:
      'Corretores e imobiliárias pequenas costumam divulgar imóveis apenas em grupos e redes sociais, onde as informações se perdem e o cliente não consegue comparar opções nem filtrar por preço ou região.',
    solution:
      'Um portal próprio com catálogo pesquisável, filtros combináveis por localização, tipo e faixa de preço, e uma página para cada imóvel com galeria, características e contato direto.',
    features: [
      'Catálogo com 12 imóveis fictícios',
      'Busca por palavras-chave',
      'Filtros por cidade, tipo, finalidade e faixa de preço',
      'Ordenação por preço e área',
      'Página individual com galeria de imagens navegável',
      'Quartos, banheiros, vagas e área de cada imóvel',
      'Formulário de interesse com validação',
      'Layout responsivo e estados de “nenhum resultado”',
    ],
    technologies: ['React', 'TypeScript', 'React Router', 'Tailwind CSS', 'SVG'],
    demoUrl: '/demos/prime-imoveis',
    cover: '/projetos/prime-imoveis.webp',
    coverAlt: 'Tela do catálogo da Prime Imóveis com filtros e cards de imóveis',
    accent: '#B08D57',
    demonstrative: true,
  },
  {
    slug: 'gestao360',
    name: 'Gestão360',
    category: 'Dashboard financeiro e comercial',
    summary: 'Painel de gestão com indicadores calculados, gráficos, filtros e exportação CSV.',
    description:
      'Painel que transforma uma lista de transações em indicadores, gráficos e relatórios — com filtros que atualizam tudo ao mesmo tempo.',
    problem:
      'Pequenas empresas registram vendas e despesas em cadernos ou planilhas soltas e não conseguem visualizar receita, lucro e desempenho por período ou categoria.',
    solution:
      'Um dashboard que calcula receita, despesas, lucro estimado, margem e ticket médio a partir dos dados, com gráficos mensais, ranking de categorias e uma tabela pesquisável exportável para Excel.',
    features: [
      'Indicadores calculados a partir das transações',
      'Comparativo com o período anterior',
      'Gráfico de evolução mensal (receita × despesas × lucro)',
      'Gráficos por categoria de receita e de despesa',
      'Filtros por período, tipo e categoria',
      'Tabela com busca, ordenação e paginação',
      'Exportação CSV compatível com Excel',
      'Planilha XLSX de exemplo com fórmulas',
    ],
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Python', 'openpyxl'],
    demoUrl: '/demos/gestao360',
    cover: '/projetos/gestao360.webp',
    coverAlt: 'Tela do dashboard Gestão360 com indicadores e gráficos',
    accent: '#3B82F6',
    download: { label: 'Baixar planilha XLSX de exemplo', href: '/downloads/gestao360-planilha-exemplo.xlsx' },
    demonstrative: true,
  },
  {
    slug: 'nova-servicos',
    name: 'Nova Serviços',
    category: 'Landing page de serviços',
    summary: 'Landing page mobile-first focada em conversão, com formulário de orçamento validado.',
    description:
      'Página de apresentação para uma empresa de manutenção residencial, desenhada para transformar visitantes em pedidos de orçamento.',
    problem:
      'Prestadores de serviço perdem clientes quando a página não explica rapidamente o que é feito, como funciona e como pedir um orçamento — especialmente no celular.',
    solution:
      'Uma landing page objetiva com chamadas para ação claras, explicação do processo, perguntas frequentes e um formulário validado que monta o pedido de orçamento.',
    features: [
      'Hero com chamada para ação',
      'Seções de serviços, benefícios e “como funciona”',
      'Perguntas frequentes em acordeão acessível',
      'Formulário de orçamento com validação campo a campo',
      'Envio via cliente de e-mail, sem simular envio falso',
      'Botão de contato fixo no celular',
      'Layout mobile-first',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Acessibilidade (ARIA)'],
    demoUrl: '/demos/nova-servicos',
    cover: '/projetos/nova-servicos.webp',
    coverAlt: 'Tela inicial da landing page Nova Serviços',
    accent: '#F97316',
    demonstrative: true,
  },
  {
    slug: 'arena-store',
    name: 'Arena Store',
    category: 'Loja virtual',
    summary: 'E-commerce de artigos esportivos com catálogo, tamanhos e carrinho persistente.',
    description:
      'Loja virtual demonstrativa com fluxo completo de compra — da vitrine ao checkout simulado — sem processar pagamentos reais.',
    problem:
      'Lojas que vendem só por mensagem perdem tempo respondendo preço, tamanho e disponibilidade, e o cliente não tem uma experiência de compra organizada.',
    solution:
      'Uma vitrine com filtros por categoria, página de produto com seleção de tamanho e quantidade, e carrinho que calcula subtotal e frete e fica salvo no navegador.',
    features: [
      'Catálogo com 10 produtos fictícios',
      'Filtro por categoria e ordenação',
      'Página de produto com seleção de tamanho e quantidade',
      'Carrinho lateral e página de carrinho',
      'Adição, alteração e remoção de itens',
      'Cálculo de subtotal, frete e total',
      'Carrinho salvo no navegador (localStorage)',
      'Checkout claramente identificado como simulação',
    ],
    technologies: ['React', 'TypeScript', 'React Router', 'Context API', 'localStorage', 'Tailwind CSS'],
    demoUrl: '/demos/arena-store',
    cover: '/projetos/arena-store.webp',
    coverAlt: 'Tela da vitrine da Arena Store com produtos esportivos',
    accent: '#22C55E',
    demonstrative: true,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
