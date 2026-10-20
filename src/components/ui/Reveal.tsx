import type { ElementType, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/cn'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

/** Entrada suave ao rolar a página (respeita "reduzir movimento"). */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={cn('reveal', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}
