import { DATA_END, DATA_START, type Transaction } from './data'

export interface Period {
  start: string
  end: string
}

export const periodPresets = [
  { id: 'mes', label: 'Último mês' },
  { id: '3m', label: 'Últimos 3 meses' },
  { id: '6m', label: 'Últimos 6 meses' },
  { id: '12m', label: 'Últimos 12 meses' },
  { id: 'ano-atual', label: 'Ano de 2026' },
  { id: 'ano-anterior', label: 'Ano de 2025' },
  { id: 'tudo', label: 'Todo o período' },
  { id: 'personalizado', label: 'Personalizado' },
] as const

export type PresetId = (typeof periodPresets)[number]['id']

const iso = (d: Date) => d.toISOString().slice(0, 10)
const parse = (s: string) => new Date(`${s}T00:00:00Z`)
const monthStart = (s: string, back: number) => {
  const d = parse(s)
  d.setUTCDate(1)
  d.setUTCMonth(d.getUTCMonth() - back)
  return iso(d)
}
const monthEnd = (s: string) => {
  const d = parse(s)
  d.setUTCMonth(d.getUTCMonth() + 1, 0)
  return iso(d)
}

export function presetPeriod(id: PresetId, custom?: Period): Period {
  switch (id) {
    case 'mes':
      return { start: monthStart(DATA_END, 0), end: DATA_END }
    case '3m':
      return { start: monthStart(DATA_END, 2), end: DATA_END }
    case '6m':
      return { start: monthStart(DATA_END, 5), end: DATA_END }
    case '12m':
      return { start: monthStart(DATA_END, 11), end: DATA_END }
    case 'ano-atual':
      return { start: '2026-01-01', end: DATA_END }
    case 'ano-anterior':
      return { start: '2025-01-01', end: '2025-12-31' }
    case 'personalizado':
      return custom ?? { start: DATA_START, end: DATA_END }
    default:
      return { start: DATA_START, end: DATA_END }
  }
}

/** Período imediatamente anterior, com a mesma duração (em meses quando o período é mensal). */
export function previousPeriod({ start, end }: Period): Period | null {
  // Acumulado do ano: compara com o mesmo intervalo do ano anterior
  if (start.endsWith('-01-01') && end.slice(0, 4) === start.slice(0, 4) && end !== `${start.slice(0, 4)}-12-31`) {
    const y = Number(start.slice(0, 4)) - 1
    const prev = { start: `${y}-01-01`, end: `${y}${end.slice(4)}` }
    return prev.start < DATA_START ? null : prev
  }
  const monthAligned = start.endsWith('-01') && (end === monthEnd(end) || end === DATA_END)
  let prev: Period
  if (monthAligned) {
    const s = parse(start)
    const e = parse(end)
    const months = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + e.getUTCMonth() - s.getUTCMonth() + 1
    const ps = monthStart(start, months)
    prev = { start: ps, end: monthEnd(monthStart(start, 1)) }
  } else {
    const days = Math.round((parse(end).getTime() - parse(start).getTime()) / 86400000) + 1
    const pe = parse(start)
    pe.setUTCDate(pe.getUTCDate() - 1)
    const ps = new Date(pe)
    ps.setUTCDate(ps.getUTCDate() - days + 1)
    prev = { start: iso(ps), end: iso(pe) }
  }
  return prev.start < DATA_START ? null : prev
}

export interface TxFilters {
  type: '' | 'Receita' | 'Despesa'
  category: string
  status: '' | 'Pago' | 'Pendente'
}

export function filterTx(list: Transaction[], period: Period, f: TxFilters) {
  return list.filter(
    (t) =>
      t.date >= period.start &&
      t.date <= period.end &&
      (!f.type || t.type === f.type) &&
      (!f.category || t.category === f.category) &&
      (!f.status || t.status === f.status),
  )
}

export interface Kpis {
  revenue: number
  expenses: number
  profit: number
  margin: number | null
  sales: number
  avgTicket: number | null
  pending: number
}

export function computeKpis(list: Transaction[]): Kpis {
  let revenue = 0
  let expenses = 0
  let sales = 0
  let pending = 0
  for (const t of list) {
    if (t.type === 'Receita') {
      revenue += t.amount
      sales++
      if (t.status === 'Pendente') pending += t.amount
    } else expenses += t.amount
  }
  const profit = revenue - expenses
  return {
    revenue,
    expenses,
    profit,
    margin: revenue > 0 ? profit / revenue : null,
    sales,
    avgTicket: sales > 0 ? revenue / sales : null,
    pending,
  }
}

/** Variação percentual; null quando não há base de comparação. */
export function delta(current: number | null, previous: number | null | undefined) {
  if (current == null || previous == null || previous === 0) return null
  return (current - previous) / Math.abs(previous)
}

const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export interface SeriesPoint {
  key: string
  label: string
  receita: number
  despesas: number
  lucro: number
}

/** Série temporal: diária para períodos curtos, mensal para os demais. */
export function timeSeries(list: Transaction[], period: Period): { points: SeriesPoint[]; granularity: 'dia' | 'mês' } {
  const days = (parse(period.end).getTime() - parse(period.start).getTime()) / 86400000 + 1
  const daily = days <= 45
  const buckets = new Map<string, SeriesPoint>()

  // Cria todos os buckets do período (inclusive vazios) para o eixo ficar contínuo
  const cursor = parse(period.start)
  const end = parse(period.end)
  while (cursor <= end) {
    const s = iso(cursor)
    const key = daily ? s : s.slice(0, 7)
    if (!buckets.has(key)) {
      const [y, m, d] = s.split('-')
      buckets.set(key, {
        key,
        label: daily ? `${d}/${m}` : `${monthNames[Number(m) - 1]}/${y.slice(2)}`,
        receita: 0,
        despesas: 0,
        lucro: 0,
      })
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  for (const t of list) {
    const b = buckets.get(daily ? t.date : t.date.slice(0, 7))
    if (!b) continue
    if (t.type === 'Receita') b.receita += t.amount
    else b.despesas += t.amount
  }
  const points = [...buckets.values()].map((b) => ({
    ...b,
    receita: Math.round(b.receita * 100) / 100,
    despesas: Math.round(b.despesas * 100) / 100,
    lucro: Math.round((b.receita - b.despesas) * 100) / 100,
  }))
  return { points, granularity: daily ? 'dia' : 'mês' }
}

export function byCategory(list: Transaction[], type: 'Receita' | 'Despesa') {
  const map = new Map<string, number>()
  for (const t of list) if (t.type === type) map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  const total = [...map.values()].reduce((a, b) => a + b, 0)
  return [...map.entries()]
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100, share: total ? value / total : 0 }))
    .sort((a, b) => b.value - a.value)
}
