import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  CircleDollarSign,
  Download,
  LayoutDashboard,
  ListOrdered,
  Percent,
  Receipt,
  RotateCcw,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Tag,
} from 'lucide-react'
import { DemoBar } from '@/components/layout/DemoBar'
import { useSeo } from '@/hooks/useSeo'
import { formatBRL, formatDate, formatNumber, formatPercent } from '@/lib/format'
import { DATA_END, DATA_START, expenseCategories, revenueCategories, transactions } from './data'
import {
  byCategory,
  computeKpis,
  delta,
  filterTx,
  periodPresets,
  presetPeriod,
  previousPeriod,
  timeSeries,
  type Period,
  type PresetId,
  type TxFilters,
} from './metrics'
import { KpiCard } from './KpiCard'
import { ExpenseBars, Legend, RevenueDonut, TrendChart } from './Charts'
import { TransactionsTable } from './TransactionsTable'
import { seriesColors } from './colors'

const XLSX_HREF = '/downloads/gestao360-planilha-exemplo.xlsx'

const selectCls =
  'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/15'

const emptyFilters: TxFilters = { type: '', category: '', status: '' }

export default function Gestao360Page() {
  useSeo({
    title: 'Gestão360 — dashboard (demonstração)',
    description: 'Demonstração de dashboard financeiro e comercial com indicadores calculados, gráficos e exportação CSV.',
    noindex: true,
  })

  const [preset, setPreset] = useState<PresetId>('ano-atual')
  const [custom, setCustom] = useState<Period>({ start: '2026-01-01', end: DATA_END })
  const [filters, setFilters] = useState<TxFilters>(emptyFilters)

  const period = presetPeriod(preset, custom)
  const validPeriod = period.start <= period.end
  const prev = validPeriod ? previousPeriod(period) : null

  // Todos os números abaixo são recalculados a partir das transações a cada mudança de filtro
  const rows = useMemo(
    () => (period.start <= period.end ? filterTx(transactions, { start: period.start, end: period.end }, filters) : []),
    [period.start, period.end, filters],
  )
  const prevRows = prev ? filterTx(transactions, prev, filters) : null

  const kpis = computeKpis(rows)
  // Lucro e margem só fazem sentido com receitas E despesas no recorte
  const partial = !!(filters.type || filters.category)
  const prevKpis = prevRows ? computeKpis(prevRows) : null
  const series = useMemo(
    () => timeSeries(rows, { start: period.start, end: period.end }),
    [rows, period.start, period.end],
  )
  const revenueCats = useMemo(() => byCategory(rows, 'Receita'), [rows])
  const expenseCats = useMemo(() => byCategory(rows, 'Despesa'), [rows])

  const categoryOptions =
    filters.type === 'Receita' ? revenueCategories : filters.type === 'Despesa' ? expenseCategories : [...revenueCategories, ...expenseCategories]

  const setFilter = <K extends keyof TxFilters>(key: K, value: TxFilters[K]) => {
    setFilters((f) => {
      const next = { ...f, [key]: value }
      // Categoria incompatível com o tipo escolhido é limpa automaticamente
      if (key === 'type' && next.category) {
        const valid = value === 'Receita' ? revenueCategories : value === 'Despesa' ? expenseCategories : null
        if (valid && !(valid as readonly string[]).includes(next.category)) next.category = ''
      }
      return next
    })
  }

  const isDirty = preset !== 'ano-atual' || filters.type || filters.category || filters.status
  const reset = () => {
    setPreset('ano-atual')
    setFilters(emptyFilters)
  }

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-700">
      <DemoBar projectSlug="gestao360" projectName="Gestão360" />

      <div className="lg:grid lg:grid-cols-[15rem_1fr]">
        {/* Barra lateral */}
        <aside className="bg-[#0b1220] text-slate-300 lg:sticky lg:top-0 lg:h-screen">
          <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:py-6">
            <Link to="/demos/gestao360" className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#2a78d6] text-white">
                <BarChart3 aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Gestão<span className="text-[#6fb0ff]">360</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 lg:mt-6">Empresa Exemplo Ltda. (fictícia)</p>
          </div>
          <nav aria-label="Seções do painel" className="overflow-x-auto border-t border-white/5 px-3 lg:border-0">
            <ul className="flex gap-1 py-2 lg:flex-col lg:py-0">
              {[
                { href: '#visao-geral', label: 'Visão geral', icon: LayoutDashboard },
                { href: '#graficos', label: 'Gráficos', icon: TrendingUp },
                { href: '#transacoes', label: 'Transações', icon: ListOrdered },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a href={href} className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white">
                    <Icon aria-hidden="true" className="h-4 w-4" /> {label}
                  </a>
                </li>
              ))}
              <li>
                <a href={XLSX_HREF} download className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white">
                  <Download aria-hidden="true" className="h-4 w-4" /> Planilha XLSX
                </a>
              </li>
            </ul>
          </nav>
          <p className="mx-5 mt-8 hidden rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-400 lg:block">
            Dados fictícios de {formatDate(DATA_START)} a {formatDate(DATA_END)}. Todos os indicadores são calculados a partir das transações.
          </p>
        </aside>

        <main id="conteudo" className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header id="visao-geral" className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Visão geral</h1>
              <p className="mt-1 text-sm text-slate-500">
                {validPeriod ? (
                  <>
                    Período: {formatDate(period.start)} a {formatDate(period.end)}
                    {prev ? ` · comparado a ${formatDate(prev.start)}–${formatDate(prev.end)}` : ' · sem período anterior para comparar'}
                  </>
                ) : (
                  'Período inválido'
                )}
              </p>
            </div>
          </header>

          {/* Filtros */}
          <section aria-label="Filtros" className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr_auto] lg:items-end">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Período</span>
                <select className={selectCls} value={preset} onChange={(e) => setPreset(e.target.value as PresetId)}>
                  {periodPresets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Tipo</span>
                <select className={selectCls} value={filters.type} onChange={(e) => setFilter('type', e.target.value as TxFilters['type'])}>
                  <option value="">Receitas e despesas</option>
                  <option value="Receita">Somente receitas</option>
                  <option value="Despesa">Somente despesas</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Categoria</span>
                <select className={selectCls} value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
                  <option value="">Todas as categorias</option>
                  {categoryOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Situação</span>
                <select className={selectCls} value={filters.status} onChange={(e) => setFilter('status', e.target.value as TxFilters['status'])}>
                  <option value="">Todas</option>
                  <option value="Pago">Pago</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </label>
              <button
                type="button"
                onClick={reset}
                disabled={!isDirty}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" /> Limpar
              </button>
            </div>
            {preset === 'personalizado' && (
              <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2 lg:max-w-md">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">De</span>
                  <input type="date" className={selectCls} min={DATA_START} max={DATA_END} value={custom.start} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, start: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">Até</span>
                  <input type="date" className={selectCls} min={DATA_START} max={DATA_END} value={custom.end} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, end: e.target.value }))} />
                </label>
                {!validPeriod && <p className="text-sm font-medium text-red-700 sm:col-span-2">A data inicial precisa ser anterior à data final.</p>}
              </div>
            )}
          </section>

          {/* Indicadores */}
          <section aria-label="Indicadores" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <KpiCard icon={CircleDollarSign} label="Receita total" value={formatBRL(kpis.revenue)} delta={delta(kpis.revenue, prevKpis?.revenue)} />
            <KpiCard icon={Receipt} label="Despesas" value={formatBRL(kpis.expenses)} delta={delta(kpis.expenses, prevKpis?.expenses)} invert />
            <KpiCard
              icon={Wallet}
              label="Lucro estimado"
              value={partial ? '—' : formatBRL(kpis.profit)}
              delta={partial ? null : delta(kpis.profit, prevKpis?.profit)}
              hint={partial ? 'Requer receitas e despesas (remova o filtro de tipo/categoria)' : undefined}
            />
            <KpiCard
              icon={Percent}
              label="Margem de lucro"
              value={partial || kpis.margin == null ? '—' : formatPercent(kpis.margin)}
              delta={partial ? null : delta(kpis.margin, prevKpis?.margin)}
              hint={partial ? 'Requer receitas e despesas' : kpis.margin == null ? 'Sem receitas no filtro' : undefined}
            />
            <KpiCard icon={ShoppingCart} label="Quantidade de vendas" value={formatNumber(kpis.sales)} delta={delta(kpis.sales, prevKpis?.sales)} />
            <KpiCard
              icon={Tag}
              label="Ticket médio"
              value={kpis.avgTicket == null ? '—' : formatBRL(kpis.avgTicket)}
              delta={delta(kpis.avgTicket, prevKpis?.avgTicket)}
              hint={kpis.pending > 0 ? `${formatBRL(kpis.pending)} a receber` : undefined}
            />
          </section>

          {/* Gráficos */}
          <section id="graficos" aria-label="Gráficos" className="mt-6 grid gap-4 xl:grid-cols-2">
            <Panel
              className="xl:col-span-2"
              title={`Evolução por ${series.granularity}`}
              subtitle="Receita e despesas (barras) e lucro (linha), na mesma escala em reais"
              aside={
                <Legend
                  items={[
                    { name: 'Receita', color: seriesColors.receita },
                    { name: 'Despesas', color: seriesColors.despesas },
                    { name: 'Lucro', color: seriesColors.lucro },
                  ]}
                />
              }
            >
              {rows.length ? <TrendChart data={series.points} /> : <Empty />}
              {rows.length > 0 && (
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer font-medium text-slate-600 hover:text-slate-900">Ver dados do gráfico em tabela</summary>
                  <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-slate-50 text-slate-500">
                        <tr>
                          <th scope="col" className="px-3 py-2">{series.granularity === 'dia' ? 'Dia' : 'Mês'}</th>
                          <th scope="col" className="px-3 py-2 text-right">Receita</th>
                          <th scope="col" className="px-3 py-2 text-right">Despesas</th>
                          <th scope="col" className="px-3 py-2 text-right">Lucro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 tabular-nums">
                        {series.points.map((p) => (
                          <tr key={p.key}>
                            <td className="px-3 py-1.5">{p.label}</td>
                            <td className="px-3 py-1.5 text-right">{formatBRL(p.receita)}</td>
                            <td className="px-3 py-1.5 text-right">{formatBRL(p.despesas)}</td>
                            <td className="px-3 py-1.5 text-right font-semibold">{formatBRL(p.lucro)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}
            </Panel>

            <Panel title="Receita por categoria" subtitle="Participação de cada linha de receita">
              {revenueCats.length ? <RevenueDonut data={revenueCats} /> : <Empty text="Não há receitas no filtro atual." />}
            </Panel>
            <Panel title="Despesas por categoria" subtitle="Do maior para o menor gasto">
              {expenseCats.length ? <ExpenseBars data={expenseCats} /> : <Empty text="Não há despesas no filtro atual." />}
            </Panel>
          </section>

          {/* Transações */}
          <section id="transacoes" aria-labelledby="transacoes-titulo" className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="px-4 pt-4">
              <h2 id="transacoes-titulo" className="font-display text-lg font-bold text-slate-900">
                Transações
              </h2>
              <p className="text-sm text-slate-500">A exportação respeita os filtros e a busca aplicados (CSV separado por “;”, abre direto no Excel).</p>
            </div>
            <TransactionsTable rows={rows} fileSuffix={`${period.start}_${period.end}`} />
          </section>

          <p className="mt-6 text-center text-xs text-slate-500">
            Gestão360 é um projeto demonstrativo. Empresa, transações e valores são fictícios.{' '}
            <a href={XLSX_HREF} download className="font-semibold text-accent-700 underline-offset-2 hover:underline">
              Baixar a planilha XLSX de exemplo
            </a>
            .
          </p>
        </main>
      </div>
    </div>
  )
}

function Panel({ title, subtitle, aside, children, className }: { title: string; subtitle?: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 ${className ?? ''}`}>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-base font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {aside}
      </div>
      {children}
    </div>
  )
}

function Empty({ text = 'Nenhum dado para os filtros selecionados.' }: { text?: string }) {
  return <p className="flex h-40 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">{text}</p>
}
