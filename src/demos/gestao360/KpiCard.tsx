import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { formatPercent } from '@/lib/format'
import { cn } from '@/lib/cn'

interface Props {
  icon: LucideIcon
  label: string
  value: string
  delta: number | null
  /** Para despesas, subir é ruim. */
  invert?: boolean
  hint?: string
}

export function KpiCard({ icon: Icon, label, value, delta, invert = false, hint }: Props) {
  const good = delta == null ? null : invert ? delta < 0 : delta > 0
  const flat = delta != null && Math.abs(delta) < 0.005
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
        <span className="hidden h-8 w-8 items-center justify-center rounded-lg bg-slate-100 sm:inline-flex text-slate-600">
          <Icon aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 font-display text-lg font-extrabold sm:mt-3 sm:text-2xl tracking-tight text-slate-900 tabular-nums">{value}</p>
      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {delta == null ? (
          <span>{hint ?? 'Sem base de comparação'}</span>
        ) : (
          <>
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold tabular-nums',
                flat ? 'bg-slate-100 text-slate-600' : good ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700',
              )}
            >
              {flat ? (
                <Minus aria-hidden="true" className="h-3 w-3" />
              ) : delta > 0 ? (
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              ) : (
                <ArrowDownRight aria-hidden="true" className="h-3 w-3" />
              )}
              <span className="sr-only">{delta > 0 ? 'aumento de' : 'redução de'}</span>
              {formatPercent(Math.abs(delta))}
            </span>
            vs. período anterior
          </>
        )}
      </p>
    </div>
  )
}
