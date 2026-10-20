import type { LucideIcon } from 'lucide-react'
import { LayoutTemplate, FileSpreadsheet, Workflow, PanelsTopLeft } from 'lucide-react'

export interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  applications: string[]
  /** Projeto demonstrativo relacionado (slug em projects.ts), se houver. */
  relatedProject?: string
}

/**
 * SERVIÇOS OFERECIDOS
 * Para adicionar um serviço, copie um objeto e ajuste os campos.
 * Ícones: https://lucide.dev/icons (importe pelo nome em PascalCase).
 */
export const services: Service[] = [
  {
    id: 'sites',
    icon: LayoutTemplate,
    title: 'Sites e landing pages',
    description:
      'Criação de sites profissionais, responsivos e adaptados às necessidades de cada negócio — do primeiro acesso ao pedido de contato.',
    applications: [
      'Site institucional para empresas e profissionais',
      'Landing page para divulgar um serviço ou campanha',
      'Catálogo on-line de produtos ou imóveis',
      'Página com formulário de orçamento e botão de WhatsApp',
    ],
    relatedProject: 'nova-servicos',
  },
  {
    id: 'planilhas',
    icon: FileSpreadsheet,
    title: 'Planilhas e dashboards',
    description:
      'Planilhas de controle, relatórios automatizados, indicadores e painéis gerenciais para enxergar o negócio com clareza.',
    applications: [
      'Controle financeiro de entradas e saídas',
      'Planilha de vendas com indicadores calculados',
      'Dashboard com gráficos por período e categoria',
      'Organização de cadastros, estoque e agendas',
    ],
    relatedProject: 'gestao360',
  },
  {
    id: 'automacoes',
    icon: Workflow,
    title: 'Automações digitais',
    description:
      'Organização e automatização de tarefas repetitivas, integrações simples e melhoria de processos do dia a dia.',
    applications: [
      'Geração automática de relatórios e documentos',
      'Padronização e limpeza de dados em planilhas',
      'Fluxos entre formulários, planilhas e e-mail',
      'Mapeamento de processos manuais para simplificar rotinas',
    ],
  },
  {
    id: 'sistemas',
    icon: PanelsTopLeft,
    title: 'Sistemas web',
    description:
      'Painéis administrativos, catálogos digitais e ferramentas de gestão com escopo definido de acordo com a necessidade.',
    applications: [
      'Painel administrativo para acompanhar informações',
      'Catálogo digital com busca e filtros',
      'Loja virtual demonstrativa com carrinho',
      'Ferramentas internas sob medida',
    ],
    relatedProject: 'arena-store',
  },
]
