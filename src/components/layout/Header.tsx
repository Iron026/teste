import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { mainNav, quoteHref } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'

const sectionIds = mainNav.map((n) => n.section)

export function Header() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds, pathname === '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu ao navegar
  useEffect(() => setOpen(false), [pathname, hash])

  // Esc fecha o menu e trava a rolagem do fundo
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900 focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-18">
        <Link to="/" aria-label="Página inicial" className="rounded-xl">
          <Logo tone={solid ? 'dark' : 'light'} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive = active === item.section
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                      solid ? 'text-slate-600 hover:text-ink-900' : 'text-slate-300 hover:text-white',
                      isActive && (solid ? 'text-ink-900' : 'text-white'),
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-500 transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to={quoteHref} size="sm" className="max-sm:hidden">
            Solicitar orçamento
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:hidden',
              solid ? 'text-ink-900 hover:bg-slate-100' : 'text-white hover:bg-white/10',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
      >
        <nav aria-label="Menu móvel" className="container-page py-6">
          <ul className="space-y-1">
            {mainNav.map((item, i) => (
              <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-xl font-bold text-ink-900 hover:bg-slate-50"
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className="h-5 w-5 text-slate-400" />
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink to={quoteHref} size="lg" className="mt-6 w-full">
            Solicitar orçamento
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
