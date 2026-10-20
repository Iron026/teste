import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Download, Search, Inbox } from 'lucide-react'
import { formatBRL, formatDate, normalize } from '@/lib/format'
import { downloadCsv } from '@/lib/csv'
import { cn } from '@/lib/cn'
import type { Transaction } from './data'

type SortKey = 'date' | 'amount' | 'description' | 'category'
const PAGE_SIZE = 10

export function TransactionsTable({ rows, fileSuffix }: { rows: Transaction[]; fileSuffix: string }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'date', dir: 'desc' })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = normalize(query)
    const list = q
      ? rows.filter((t) => normalize(`${t.id} ${t.description} ${t.category} ${t.method} ${t.status}`).includes(q))
      : rows.slice()
    const mul = sort.dir === 'asc' ? 1 : -1
    return list.sort((a, b) => {
      const va = a[sort.key]
      const vb = b[sort.key]
      if (va < vb) return -1 * mul
      if (va > vb) return 1 * mul
      return a.id < b.id ? mul : -mul
    })
  }, [rows, query, sort])

  useEffect(() => setPage(1), [rows, query, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'date' || key === 'amount' ? 'desc' : 'asc' }))

  const exportCsv = () =>
    downloadCsv(
      `gestao360-transacoes-${fileSuffix}.csv`,
      ['Código', 'Data', 'Descrição', 'Categoria', 'Tipo', 'Forma de pagamento', 'Situação', 'Valor (R$)'],
      filtered.map((t) => [t.id, formatDate(t.date), t.description, t.category, t.type, t.method, t.status, t.type === 'Despesa' ? -t.amount : t.amount]),
    )

  const header = (key: SortKey, label: string, align: 'left' | 'right' = 'left') => {
    const active = sort.key === key
    return (
      <th scope="col" aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={cn('px-4 py-3 font-semibold', align === 'right' && 'text-right')}>
        <button type="button" onClick={() => toggleSort(key)} className={cn('inline-flex items-center gap-1 uppercase tracking-wider hover:text-slate-900', align === 'right' && 'flex-row-reverse')}>
          {label}
          {active ? (
            sort.dir === 'asc' ? <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" /> : <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <span className="h-3.5 w-3.5" />
          )}
        </button>
      </th>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative sm:w-80">
          <span className="sr-only">Buscar transações</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por descrição, categoria, código…"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/15"
          />
        </label>
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500" aria-live="polite">
            {filtered.length.toLocaleString('pt-BR')} {filtered.length === 1 ? 'registro' : 'registros'}
          </p>
          <button
            type="button"
            onClick={exportCsv}
            disabled={!filtered.length}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
          >
            <Download aria-hidden="true" className="h-4 w-4" /> Exportar CSV
          </button>
        </div>
      </div>

      {current.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Transações do período filtrado</caption>
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {header('date', 'Data')}
                {header('description', 'Descrição')}
                {header('category', 'Categoria')}
                <th scope="col" className="px-4 py-3 font-semibold">Pagamento</th>
                <th scope="col" className="px-4 py-3 font-semibold">Situação</th>
                {header('amount', 'Valor', 'right')}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {current.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70">
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600">{formatDate(t.date)}</td>
                  <td className="px-4 py-3">
                    <span className="block font-medium text-slate-900">{t.description}</span>
                    <span className="font-mono text-[0.7rem] text-slate-400">{t.id}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.category}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">{t.method}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 text-xs font-semibold',
                        t.status === 'Pago' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800',
                      )}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className={cn('whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums', t.type === 'Receita' ? 'text-emerald-700' : 'text-slate-900')}>
                    {t.type === 'Receita' ? '+ ' : '− '}
                    {formatBRL(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <Inbox aria-hidden="true" className="h-9 w-9 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-900">Nenhuma transação encontrada</p>
          <p className="mt-1 text-sm text-slate-500">Ajuste a busca ou os filtros do período.</p>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Paginação" className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm">
          <p className="text-slate-500">
            Página {page} de {pages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-300 px-3 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" /> Anterior
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-300 px-3 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Próxima <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}
