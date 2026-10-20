import { Minus, Plus } from 'lucide-react'
import { MAX_QTY } from './cart'

export function QtyStepper({ value, onChange, label, size = 'md' }: { value: number; onChange: (v: number) => void; label: string; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 'h-9' : 'h-12'
  const w = size === 'sm' ? 'w-9' : 'w-12'
  return (
    <div className={`inline-flex items-center rounded-xl border border-zinc-300 bg-white ${h}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Diminuir quantidade" className={`inline-flex ${h} ${w} items-center justify-center rounded-l-xl text-zinc-700 hover:bg-zinc-100 disabled:opacity-30`}>
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <output aria-live="polite" className="w-8 text-center font-semibold tabular-nums text-zinc-900">
        {value}
      </output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Aumentar quantidade" className={`inline-flex ${h} ${w} items-center justify-center rounded-r-xl text-zinc-700 hover:bg-zinc-100 disabled:opacity-30`}>
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}
