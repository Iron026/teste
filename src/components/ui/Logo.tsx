import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface LogoProps {
  /** 'dark' = texto escuro (fundo claro); 'light' = texto claro (fundo escuro). */
  tone?: 'dark' | 'light'
  className?: string
}

/** Monograma + nome. O monograma usa as iniciais definidas em site.ts. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('h-9 w-9 shrink-0', className)}>
      <rect width="40" height="40" rx="11" fill="var(--color-ink-900)" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" fill="none" stroke="rgb(255 255 255 / 0.12)" />
      <path d="M26.5 9.5 L31 9.5 L22.5 30.5 L18 30.5 Z" fill="var(--color-aqua-400)" opacity="0.9" />
      <text
        x="14.5"
        y="25.5"
        textAnchor="middle"
        fontFamily="Manrope Variable, sans-serif"
        fontWeight="800"
        fontSize="13"
        fill="#fff"
        letterSpacing="-0.5"
      >
        {siteConfig.monogram}
      </text>
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'whitespace-nowrap font-display text-[1.05rem] font-extrabold tracking-tight',
            tone === 'dark' ? 'text-ink-900' : 'text-white',
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            'mt-1 hidden text-[0.68rem] font-medium tracking-wide sm:block',
            tone === 'dark' ? 'text-slate-500' : 'text-slate-400',
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  )
}
