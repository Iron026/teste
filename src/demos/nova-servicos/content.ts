/**
 * CONTEÚDO — Nova Serviços (empresa fictícia, demonstração)
 * Textos centralizados para facilitar a adaptação a um cliente real.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Zap,
  Droplets,
  PaintRoller,
  Hammer,
  Snowflake,
  Wrench,
  CalendarCheck,
  BadgeCheck,
  ClipboardCheck,
  Sparkles,
  MessageSquareText,
  FileText,
  CalendarClock,
  ThumbsUp,
} from 'lucide-react'

export const company = {
  name: 'Nova Serviços',
  /** Endereço fictício: o domínio .exemplo não existe, nenhuma mensagem é entregue. */
  email: 'orcamento@novaservicos.exemplo',
  region: 'Atendimento residencial na região metropolitana (exemplo)',
}

export const services: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Zap, title: 'Elétrica', text: 'Troca de tomadas e disjuntores, instalação de luminárias e chuveiros.' },
  { icon: Droplets, title: 'Hidráulica', text: 'Vazamentos, troca de torneiras, sifões, registros e caixas acopladas.' },
  { icon: PaintRoller, title: 'Pintura', text: 'Pintura de cômodos, portas e pequenos reparos de massa corrida.' },
  { icon: Hammer, title: 'Montagem de móveis', text: 'Montagem e desmontagem de guarda-roupas, camas, racks e escrivaninhas.' },
  { icon: Snowflake, title: 'Ar-condicionado', text: 'Limpeza e higienização de aparelhos split.' },
  { icon: Wrench, title: 'Pequenos reparos', text: 'Instalação de suportes, prateleiras, cortinas e ajustes em geral.' },
]

export const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CalendarCheck, title: 'Horário agendado', text: 'Você escolhe o melhor período e recebe a confirmação antes da visita.' },
  { icon: ClipboardCheck, title: 'Orçamento claro', text: 'Valor informado antes do serviço, sem cobranças surpresa.' },
  { icon: BadgeCheck, title: 'Profissionais identificados', text: 'Atendimento com identificação e materiais adequados para cada serviço.' },
  { icon: Sparkles, title: 'Ambiente limpo', text: 'Ao final do serviço, o local é organizado e os resíduos são recolhidos.' },
]

export const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageSquareText, title: 'Conte o que precisa', text: 'Preencha o formulário com o serviço e uma breve descrição.' },
  { icon: FileText, title: 'Receba o orçamento', text: 'Analisamos o pedido e enviamos o valor e o prazo estimado.' },
  { icon: CalendarClock, title: 'Agende a visita', text: 'Escolha o dia e o período mais convenientes para você.' },
  { icon: ThumbsUp, title: 'Serviço concluído', text: 'O trabalho é executado e conferido junto com você.' },
]

export const faq = [
  {
    question: 'O orçamento tem custo?',
    answer: 'Não. O orçamento é feito a partir das informações enviadas no formulário. Quando é necessária uma visita técnica para avaliar, isso é informado antes.',
  },
  {
    question: 'Em quanto tempo recebo uma resposta?',
    answer: 'Os pedidos são respondidos em ordem de chegada, em horário comercial. Pedidos urgentes podem ser sinalizados na descrição.',
  },
  {
    question: 'Preciso comprar os materiais?',
    answer: 'Depende do serviço. O orçamento informa quais materiais estão inclusos e quais ficam por conta do cliente.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Pix, cartões de débito e crédito. As condições são combinadas no orçamento.',
  },
  {
    question: 'E se algo não ficar como combinado?',
    answer: 'Os ajustes relacionados ao serviço executado são feitos sem custo adicional, dentro das condições informadas no orçamento.',
  },
]

export const periods = ['Manhã', 'Tarde', 'Qualquer horário'] as const
