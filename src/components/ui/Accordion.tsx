import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Item {
  question: string
  answer: string
}

interface Props {
  items: Item[]
  className?: string
  itemClassName?: string
  /** Cor do ícone quando aberto. */
  accentClassName?: string
}

/** Acordeão acessível (botões com aria-expanded e regiões nomeadas). */
export function Accordion({ items, className, itemClassName, accentClassName = 'bg-accent-600 text-white' }: Props) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className={cn('divide-y divide-slate-200', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-b${i}`
        const panelId = `${baseId}-p${i}`
        return (
          <div key={item.question} className={itemClassName}>
            <h3 className="text-base sm:text-lg">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display font-bold text-ink-900"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    isOpen ? cn(accentClassName, 'rotate-45') : 'bg-slate-100 text-ink-900',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn('grid transition-all duration-300', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="pb-6 pr-10 leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
