import type { LucideIcon } from 'lucide-react'
import { MessagesSquare, ClipboardList, Code2, ListChecks, PackageCheck } from 'lucide-react'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    icon: MessagesSquare,
    title: 'Entendimento da necessidade',
    description:
      'Conversamos sobre o seu negócio, o problema a resolver e o que você espera do projeto. Nada de jargão técnico.',
  },
  {
    icon: ClipboardList,
    title: 'Planejamento da solução',
    description:
      'Defino o escopo, as funcionalidades, o prazo e o investimento. Você aprova tudo antes de qualquer desenvolvimento.',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento',
    description:
      'Construo a solução em etapas e compartilho prévias para você acompanhar a evolução e opinar no caminho.',
  },
  {
    icon: ListChecks,
    title: 'Testes e ajustes',
    description:
      'Verifico funcionamento, celular, navegadores e dados. Os ajustes combinados no escopo são feitos antes da entrega.',
  },
  {
    icon: PackageCheck,
    title: 'Entrega e orientações',
    description:
      'Entrego os arquivos ou o site publicado, com instruções claras de uso para você ter autonomia no dia a dia.',
  },
]
