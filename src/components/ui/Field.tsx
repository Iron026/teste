import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => ReactNode
  className?: string
  /** Classe do controle (input/select/textarea). */
  controlClassName?: string
}

export const controlBase =
  'w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-4'

/** Rótulo + controle + mensagens de ajuda/erro, já conectados por ARIA. */
export function Field({ id, label, error, hint, required, children, className, controlClassName }: FieldProps) {
  const describedBy = [hint && `${id}-dica`, error && `${id}-erro`].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-slate-500"> (opcional)</span>
        )}
      </label>
      {children({
        id,
        'aria-invalid': !!error,
        'aria-describedby': describedBy,
        className: cn(
          controlBase,
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-300 focus:border-accent-500 focus:ring-accent-500/15',
          controlClassName,
        ),
      })}
      {hint && !error && (
        <p id={`${id}-dica`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
