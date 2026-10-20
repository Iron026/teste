/** Indicador exibido enquanto uma página carregada sob demanda é baixada. */
export function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center">
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-accent-600" />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}
