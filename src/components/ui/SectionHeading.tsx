import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'dark', id }: Props) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p
        className={cn(
          'mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em]',
          tone === 'dark' ? 'text-accent-600' : 'text-aqua-300',
        )}
      >
        <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'text-3xl font-extrabold tracking-tight sm:text-4xl',
          tone === 'light' && 'text-white',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed', tone === 'dark' ? 'text-slate-600' : 'text-slate-300')}>
          {description}
        </p>
      )}
    </div>
  )
}
