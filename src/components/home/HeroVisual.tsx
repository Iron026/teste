import { CheckCircle2, TrendingUp, Search, BedDouble, Bath } from 'lucide-react'

/**
 * Composição ilustrativa do Hero: prévias estilizadas de interfaces
 * (painel, código, planilha e catálogo) que representam os serviços.
 * Feita com HTML/CSS — leve, nítida em qualquer tela e sem fotos.
 */
export function HeroVisual() {
  const bars = [38, 52, 46, 61, 58, 72, 66, 80, 76, 88, 84, 94]

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none lg:max-w-none">
      {/* Janela principal: painel */}
      <div className="relative rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white/5 px-2 font-mono text-[0.6rem] leading-5 text-slate-500">
            painel / visão geral
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { label: 'Receita', value: 'R$ 48,2 mil', tone: 'text-aqua-300' },
            { label: 'Despesas', value: 'R$ 29,7 mil', tone: 'text-slate-200' },
            { label: 'Margem', value: '38,4%', tone: 'text-accent-300' },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <p className="text-[0.6rem] uppercase tracking-wider text-slate-500">{k.label}</p>
              <p className={`mt-1 font-display text-sm font-bold sm:text-base ${k.tone}`}>{k.value}</p>
            </div>
          ))}
          <div className="col-span-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] font-medium text-slate-400">Evolução mensal</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-aqua-400/10 px-2 py-0.5 text-[0.6rem] font-semibold text-aqua-300">
                <TrendingUp className="h-3 w-3" /> dados de exemplo
              </span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-1.5 sm:h-28">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-accent-600/60 to-accent-400" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cartão de código */}
      <div className="absolute -bottom-10 -left-4 w-[62%] animate-float rounded-xl border border-white/10 bg-ink-950/95 p-4 font-mono text-[0.62rem] leading-relaxed shadow-2xl shadow-black/50 sm:-left-10 sm:text-[0.68rem]">
        <p>
          <span className="text-accent-300">const</span> <span className="text-white">lucro</span>{' '}
          <span className="text-slate-500">=</span> <span className="text-aqua-300">receita</span>{' '}
          <span className="text-slate-500">-</span> <span className="text-aqua-300">despesas</span>
        </p>
        <p>
          <span className="text-accent-300">const</span> <span className="text-white">margem</span>{' '}
          <span className="text-slate-500">=</span> <span className="text-white">lucro</span>{' '}
          <span className="text-slate-500">/</span> <span className="text-aqua-300">receita</span>
        </p>
        <p className="mt-2 text-slate-500">{'// exportar relatório'}</p>
        <p>
          <span className="text-amber-200">downloadCsv</span>
          <span className="text-slate-400">(</span>
          <span className="text-emerald-300">'vendas.csv'</span>
          <span className="text-slate-400">)</span>
        </p>
      </div>

      {/* Cartão de catálogo */}
      <div
        className="absolute -right-3 -top-8 hidden w-48 animate-float rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-2xl shadow-black/30 sm:block lg:-right-8"
        style={{ animationDelay: '-3s' }}
      >
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2 py-1.5 text-[0.6rem] text-slate-600">
          <Search className="h-3 w-3" /> Buscar imóveis…
        </div>
        <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-sky-200 via-sky-100 to-amber-100">
          <svg viewBox="0 0 160 64" className="h-full w-full">
            <rect x="34" y="26" width="58" height="34" fill="#f8fafc" />
            <path d="M28 28 L63 10 L98 28 Z" fill="#334155" />
            <rect x="44" y="36" width="12" height="10" fill="#7dd3fc" />
            <rect x="68" y="40" width="12" height="20" fill="#b08d57" />
            <rect x="0" y="58" width="160" height="6" fill="#86efac" />
            <circle cx="125" cy="40" r="12" fill="#4ade80" />
            <rect x="123" y="44" width="4" height="16" fill="#78716c" />
          </svg>
        </div>
        <p className="mt-2 text-[0.7rem] font-bold text-ink-900">Casa com quintal</p>
        <div className="mt-1 flex items-center gap-2 text-[0.6rem] text-slate-500">
          <span className="inline-flex items-center gap-0.5"><BedDouble className="h-3 w-3" /> 3</span>
          <span className="inline-flex items-center gap-0.5"><Bath className="h-3 w-3" /> 2</span>
          <span className="ml-auto font-semibold text-ink-900">R$ 690 mil</span>
        </div>
      </div>

      {/* Selo de validação */}
      <div className="absolute -bottom-6 right-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white px-3 py-2 text-[0.7rem] font-semibold text-ink-900 shadow-xl shadow-black/30 sm:right-6">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        Formulário validado
      </div>
    </div>
  )
}
