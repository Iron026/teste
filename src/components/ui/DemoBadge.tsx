import { FlaskConical } from 'lucide-react'
import { cn } from '@/lib/cn'

export function DemoBadge({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        tone === 'dark'
          ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200'
          : 'bg-white/10 text-amber-200 ring-1 ring-white/15',
        className,
      )}
    >
      <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />
      Projeto demonstrativo
    </span>
  )
}
