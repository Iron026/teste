import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { formatBRL, formatBRLCompact, formatPercent } from '@/lib/format'
import type { SeriesPoint } from './metrics'
import { expenseBarColor, revenueCategoryColors, seriesColors } from './colors'

const axisTick = { fill: '#64748b', fontSize: 12 }

function Box({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-lg">{children}</div>
}

function TrendTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload as SeriesPoint
  const rows = [
    { name: 'Receita', value: p.receita, color: seriesColors.receita },
    { name: 'Despesas', value: p.despesas, color: seriesColors.despesas },
    { name: 'Lucro', value: p.lucro, color: seriesColors.lucro },
  ]
  return (
    <Box>
      <p className="mb-1.5 font-semibold text-slate-900">{label}</p>
      {rows.map((r) => (
        <p key={r.name} className="flex items-center justify-between gap-6 py-0.5 text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
            {r.name}
          </span>
          <span className="font-semibold tabular-nums text-slate-900">{formatBRL(r.value)}</span>
        </p>
      ))}
    </Box>
  )
}

export function TrendChart({ data }: { data: SeriesPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={2} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} minTickGap={12} />
        <YAxis tick={axisTick} tickLine={false} axisLine={false} width={72} tickFormatter={(v: number) => formatBRLCompact(v)} />
        <Tooltip content={TrendTooltip} cursor={{ fill: 'rgb(148 163 184 / 0.12)' }} />
        <Bar dataKey="receita" name="Receita" fill={seriesColors.receita} radius={[4, 4, 0, 0]} maxBarSize={22} />
        <Bar dataKey="despesas" name="Despesas" fill={seriesColors.despesas} radius={[4, 4, 0, 0]} maxBarSize={22} />
        <Line
          dataKey="lucro"
          name="Lucro"
          type="monotone"
          stroke={seriesColors.lucro}
          strokeWidth={2}
          dot={data.length <= 24 ? { r: 4, strokeWidth: 2, stroke: '#fff', fill: seriesColors.lucro } : false}
          activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function Legend({ items }: { items: { name: string; color: string; value?: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-600">
      {items.map((i) => (
        <li key={i.name} className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ background: i.color }} />
          {i.name}
          {i.value && <span className="font-semibold tabular-nums text-slate-900">{i.value}</span>}
        </li>
      ))}
    </ul>
  )
}

interface CatDatum {
  name: string
  value: number
  share: number
}

function CatTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as CatDatum
  return (
    <Box>
      <p className="font-semibold text-slate-900">{d.name}</p>
      <p className="mt-0.5 tabular-nums text-slate-600">
        {formatBRL(d.value)} · {formatPercent(d.share)}
      </p>
    </Box>
  )
}

export function RevenueDonut({ data }: { data: CatDatum[] }) {
  const total = data.reduce((a, b) => a + b.value, 0)
  return (
    <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,180px)_1fr]">
      <div className="relative mx-auto h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={1} stroke="#fff" strokeWidth={2}>
              {data.map((d) => (
                <Cell key={d.name} fill={revenueCategoryColors[d.name] ?? '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip content={CatTooltip} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">Total</span>
          <span className="font-display text-sm font-bold tabular-nums text-slate-900">{formatBRLCompact(total)}</span>
        </div>
      </div>
      <ul className="space-y-2.5">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-3 text-sm">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: revenueCategoryColors[d.name] }} />
            <span className="flex-1 text-slate-600">{d.name}</span>
            <span className="tabular-nums text-slate-500">{formatPercent(d.share)}</span>
            <span className="w-28 text-right font-semibold tabular-nums text-slate-900">{formatBRL(d.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ExpenseBars({ data }: { data: CatDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 40)}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }} barCategoryGap={8}>
        <CartesianGrid horizontal={false} stroke="#e2e8f0" />
        <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v: number) => formatBRLCompact(v)} />
        <YAxis type="category" dataKey="name" tick={axisTick} tickLine={false} axisLine={false} width={128} />
        <Tooltip content={CatTooltip} cursor={{ fill: 'rgb(148 163 184 / 0.12)' }} />
        <Bar dataKey="value" name="Despesas" fill={expenseBarColor} radius={[0, 4, 4, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  )
}
