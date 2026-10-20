/**
 * DADOS FICTÍCIOS — Gestão360 (demonstração)
 * ------------------------------------------------------------------
 * As transações são geradas por um gerador pseudoaleatório com
 * semente fixa: os números são sempre os mesmos a cada carregamento,
 * coerentes entre si (sazonalidade, crescimento gradual, despesas
 * fixas e variáveis) e TODOS os indicadores do painel são calculados
 * a partir desta lista — nada é digitado manualmente.
 */

export type TxType = 'Receita' | 'Despesa'
export type TxStatus = 'Pago' | 'Pendente'

export interface Transaction {
  id: string
  date: string // AAAA-MM-DD
  description: string
  category: string
  type: TxType
  amount: number
  method: string
  status: TxStatus
}

export const revenueCategories = ['Produtos', 'Serviços', 'Assinaturas', 'Treinamentos'] as const
export const expenseCategories = [
  'Fornecedores',
  'Folha de pagamento',
  'Aluguel',
  'Marketing',
  'Impostos',
  'Energia e internet',
  'Logística',
] as const

/** Primeiro e último dia com dados (o painel trata o último como "hoje"). */
export const DATA_START = '2025-01-01'
export const DATA_END = '2026-09-30'

// Gerador pseudoaleatório determinístico (mulberry32)
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = rng(360)
const between = (min: number, max: number) => min + rand() * (max - min)
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)]
const round2 = (n: number) => Math.round(n * 100) / 100
const pad = (n: number) => String(n).padStart(2, '0')
const daysIn = (y: number, m: number) => new Date(y, m, 0).getDate()

const productNames = ['Kit escritório', 'Cadeira ergonômica', 'Monitor 24"', 'Teclado sem fio', 'Headset', 'Suporte de notebook', 'Luminária LED']
const serviceNames = ['Instalação de rede', 'Manutenção preventiva', 'Configuração de equipamentos', 'Suporte técnico avulso']
const planNames = ['Plano Básico', 'Plano Profissional', 'Plano Empresarial']
const trainingNames = ['Workshop de planilhas', 'Treinamento de equipe', 'Curso de ferramentas digitais']
const clients = ['Loja Exemplo', 'Comércio Modelo', 'Escritório Demo', 'Clínica Fictícia', 'Padaria Teste', 'Oficina Amostra', 'Estúdio Exemplo']
const methods = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Boleto', 'Transferência']

// Sazonalidade: dezembro forte, janeiro/fevereiro mais fracos
const season = [0.82, 0.86, 0.97, 0.98, 1.04, 1.0, 0.95, 1.02, 1.05, 1.08, 1.14, 1.32]

function generate(): Transaction[] {
  const list: Transaction[] = []
  let seq = 1
  const add = (t: Omit<Transaction, 'id'>) => list.push({ id: `TX-${String(seq++).padStart(5, '0')}`, ...t })

  const [sy, sm] = DATA_START.split('-').map(Number)
  const [ey, em] = DATA_END.split('-').map(Number)
  let monthIndex = 0

  for (let y = sy, m = sm; y < ey || (y === ey && m <= em); m === 12 ? (y++, (m = 1)) : m++, monthIndex++) {
    const growth = 1 + monthIndex * 0.018
    const factor = season[m - 1] * growth
    const days = daysIn(y, m)
    const date = (d: number) => `${y}-${pad(m)}-${pad(Math.min(d, days))}`
    const isLastMonth = y === ey && m === em

    // ---- Receitas (vendas) ----
    const sales = Math.round(between(30, 38) * factor)
    for (let i = 0; i < sales; i++) {
      const r = rand()
      const category = r < 0.5 ? 'Produtos' : r < 0.78 ? 'Serviços' : r < 0.92 ? 'Assinaturas' : 'Treinamentos'
      let amount: number
      let description: string
      switch (category) {
        case 'Produtos':
          amount = between(90, 1400)
          description = `Venda — ${pick(productNames)}`
          break
        case 'Serviços':
          amount = between(250, 1900)
          description = `${pick(serviceNames)} — ${pick(clients)}`
          break
        case 'Assinaturas':
          amount = pick([149, 299, 549])
          description = `${pick(planNames)} — mensalidade`
          break
        default:
          amount = between(800, 2600)
          description = `${pick(trainingNames)} — ${pick(clients)}`
      }
      const day = 1 + Math.floor(rand() * days)
      add({
        date: date(day),
        description,
        category,
        type: 'Receita',
        amount: round2(amount),
        method: pick(methods),
        status: isLastMonth && day > days - 6 && rand() < 0.5 ? 'Pendente' : 'Pago',
      })
    }

    // ---- Despesas fixas ----
    add({ date: date(5), description: 'Aluguel da sala comercial', category: 'Aluguel', type: 'Despesa', amount: monthIndex < 12 ? 2800 : 2968, method: 'Boleto', status: 'Pago' })
    add({ date: date(5), description: 'Salários e encargos', category: 'Folha de pagamento', type: 'Despesa', amount: round2(7200 * (monthIndex < 12 ? 1 : 1.06) + between(-150, 150)), method: 'Transferência', status: 'Pago' })
    add({ date: date(10), description: 'Energia elétrica', category: 'Energia e internet', type: 'Despesa', amount: round2(between(380, 560)), method: 'Boleto', status: 'Pago' })
    add({ date: date(12), description: 'Internet e telefonia', category: 'Energia e internet', type: 'Despesa', amount: 289.9, method: 'Cartão de crédito', status: 'Pago' })

    // ---- Despesas variáveis ----
    const supplierOrders = Math.round(between(3, 6) * factor)
    for (let i = 0; i < supplierOrders; i++) {
      add({ date: date(1 + Math.floor(rand() * days)), description: `Compra de mercadorias — Fornecedor ${pick(['A', 'B', 'C', 'D'])}`, category: 'Fornecedores', type: 'Despesa', amount: round2(between(900, 2600)), method: pick(['Boleto', 'Pix', 'Transferência']), status: 'Pago' })
    }
    const ads = 1 + Math.floor(rand() * 3)
    for (let i = 0; i < ads; i++) {
      add({ date: date(1 + Math.floor(rand() * days)), description: pick(['Anúncios em redes sociais', 'Anúncios em buscadores', 'Material gráfico']), category: 'Marketing', type: 'Despesa', amount: round2(between(250, 900) * (m >= 10 ? 1.4 : 1)), method: 'Cartão de crédito', status: 'Pago' })
    }
    const shipments = Math.round(between(2, 4))
    for (let i = 0; i < shipments; i++) {
      add({ date: date(1 + Math.floor(rand() * days)), description: 'Fretes e entregas', category: 'Logística', type: 'Despesa', amount: round2(between(180, 620)), method: 'Pix', status: 'Pago' })
    }
  }

  // Impostos: ~6% da receita do mês anterior, pagos no dia 20
  const revenueByMonth = new Map<string, number>()
  for (const t of list) if (t.type === 'Receita') revenueByMonth.set(t.date.slice(0, 7), (revenueByMonth.get(t.date.slice(0, 7)) ?? 0) + t.amount)
  const months = [...revenueByMonth.keys()].sort()
  months.forEach((ym, i) => {
    if (i === months.length - 1) return
    const [y, m] = months[i + 1].split('-')
    add({ date: `${y}-${m}-20`, description: `Simples Nacional — competência ${ym.slice(5)}/${ym.slice(0, 4)}`, category: 'Impostos', type: 'Despesa', amount: round2(revenueByMonth.get(ym)! * 0.06), method: 'Boleto', status: 'Pago' })
  })

  return list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1))
}

export const transactions: Transaction[] = generate()
