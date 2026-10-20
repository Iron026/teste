export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'Como solicito um orçamento?',
    answer:
      'Envie uma mensagem pelos canais da seção de contato contando, em poucas linhas, o que você precisa. Com base nisso faço algumas perguntas e envio uma proposta com escopo, prazo e valor. O orçamento não gera compromisso.',
  },
  {
    question: 'Quais tipos de projeto você atende?',
    answer:
      'Sites institucionais, landing pages, catálogos on-line, planilhas de controle e dashboards, automações de tarefas repetitivas e sistemas web de escopo definido, como painéis administrativos. Os projetos deste portfólio mostram exemplos de cada tipo.',
  },
  {
    question: 'Como os prazos são definidos?',
    answer:
      'O prazo depende do tamanho do escopo e da disponibilidade de conteúdo (textos, imagens, dados). Ele é informado na proposta, dividido em etapas, antes do início do trabalho — e só começa a contar após a aprovação.',
  },
  {
    question: 'Vou conseguir atualizar o site depois?',
    answer:
      'Sim. Os projetos são organizados para facilitar a manutenção: textos, contatos e itens ficam em arquivos centralizados. Junto com a entrega, você recebe orientações de como fazer as atualizações mais comuns. Se preferir, também posso cuidar delas.',
  },
  {
    question: 'Como funciona o suporte após a entrega?',
    answer:
      'Correções de falhas relacionadas ao escopo entregue fazem parte do projeto por um período combinado na proposta. Novas funcionalidades ou mudanças de escopo são orçadas à parte, de forma transparente.',
  },
  {
    question: 'Os projetos do portfólio foram feitos para clientes?',
    answer:
      'Não. Todos os projetos apresentados aqui são demonstrativos e autorais, criados para mostrar na prática o que posso desenvolver. Empresas, imóveis, produtos e valores são fictícios.',
  },
]
