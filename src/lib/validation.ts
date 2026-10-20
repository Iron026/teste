export type Errors<T> = Partial<Record<keyof T, string>>

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

/** Telefone brasileiro com DDD: 10 ou 11 dígitos. */
export const isPhoneBR = (v: string) => {
  const d = v.replace(/\D/g, '')
  return d.length === 10 || d.length === 11
}

/** Aplica máscara (11) 99999-9999 enquanto o usuário digita. */
export function maskPhoneBR(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Foca o primeiro campo com erro (melhora acessibilidade e conversão). */
export function focusFirstError(form: HTMLFormElement | null, errors: Record<string, string | undefined>) {
  const first = Object.keys(errors).find((k) => errors[k])
  if (!first || !form) return
  const el = form.querySelector<HTMLElement>(`[name="${first}"]`)
  el?.focus()
}
