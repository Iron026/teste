import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-600 text-white shadow-[0_8px_20px_-8px_rgb(36_83_230/0.7)] hover:bg-accent-700 hover:-translate-y-0.5 active:translate-y-0',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-ink-900 hover:bg-slate-100',
  light: 'bg-white text-ink-900 hover:bg-slate-100 hover:-translate-y-0.5',
  'outline-light': 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-6 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Abre em nova aba (aplicado automaticamente para links externos). */
  external?: boolean
  'aria-label'?: string
}

/** Link com aparência de botão. Decide sozinho entre rota interna e link externo. */
export function ButtonLink({ to, children, variant, size, className, external, ...rest }: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className)
  const isExternal = external || /^(https?:|mailto:|tel:)/.test(to) || to.startsWith('/downloads/')
  if (isExternal) {
    const newTab = to.startsWith('http')
    return (
      <a href={to} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {children}
    </Link>
  )
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
}

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />
}
