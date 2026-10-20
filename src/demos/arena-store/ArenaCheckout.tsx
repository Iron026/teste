import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { Field } from '@/components/ui/Field'
import { formatBRL } from '@/lib/format'
import { cn } from '@/lib/cn'
import { isEmail, focusFirstError, type Errors } from '@/lib/validation'
import { useCart } from './cart'
import { CartSummary } from './CartSummary'
import { BASE } from './paths'

interface Data {
  nome: string
  email: string
  cep: string
  endereco: string
  numero: string
  cidade: string
  uf: string
  entrega: string
}

const UFS = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ')
const maskCep = (v: string) => v.replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2')

function validate(d: Data): Errors<Data> {
  const e: Errors<Data> = {}
  if (d.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (!isEmail(d.email)) e.email = 'Informe um e-mail válido.'
  if (d.cep.replace(/\D/g, '').length !== 8) e.cep = 'O CEP precisa ter 8 dígitos.'
  if (d.endereco.trim().length < 3) e.endereco = 'Informe a rua ou avenida.'
  if (!d.numero.trim()) e.numero = 'Informe o número.'
  if (d.cidade.trim().length < 2) e.cidade = 'Informe a cidade.'
  if (!d.uf) e.uf = 'Selecione o estado.'
  return e
}

const ctl = 'focus:!border-zinc-900 focus:!ring-lime-300/50'

/**
 * Checkout DEMONSTRATIVO: valida os dados de entrega, mas não solicita
 * dados de pagamento e não processa compra alguma.
 */
export default function ArenaCheckout() {
  useSeo({ title: 'Checkout simulado — Arena Store (demonstração)', noindex: true })
  const { lines, total } = useCart()
  const navigate = useNavigate()
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<Data>({ nome: '', email: '', cep: '', endereco: '', numero: '', cidade: '', uf: '', entrega: 'Padrão' })
  const [errors, setErrors] = useState<Errors<Data>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof Data, v: string) => {
    const next = { ...data, [k]: v }
    setData(next)
    if (submitted) setErrors(validate(next))
  }

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-zinc-900">Não há itens para finalizar</h1>
        <p className="mt-2 text-zinc-500">Adicione produtos ao carrinho antes de seguir para o checkout.</p>
        <Link to={`${BASE}/produtos`} className="mt-6 inline-flex rounded-xl bg-zinc-900 px-5 py-3 font-semibold text-white">
          Ver produtos
        </Link>
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(ref.current, errs)
    const order = {
      code: `SIM-${Math.floor(100000 + Math.random() * 900000)}`,
      name: data.nome.trim().split(' ')[0],
      total,
      items: lines.reduce((a, l) => a + l.qty, 0),
    }
    navigate(`${BASE}/pedido-simulado`, { state: order, replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div role="note" className="flex gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-950">
        <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm leading-relaxed">
          <strong>Checkout simulado.</strong> Esta é uma loja demonstrativa: nenhuma compra será processada, nenhum pagamento será cobrado e
          nenhum dado preenchido é enviado ou armazenado. Não há campos de cartão.
        </p>
      </div>

      <h1 className="mt-8 font-display text-3xl font-extrabold uppercase italic text-zinc-900 sm:text-4xl">Finalizar compra</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <form ref={ref} onSubmit={onSubmit} noValidate className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-2 font-display text-lg font-extrabold text-zinc-900">1. Identificação</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="co-nome" label="Nome completo" required error={errors.nome} controlClassName={ctl}>
                {(p) => <input {...p} name="nome" autoComplete="name" value={data.nome} onChange={(e) => set('nome', e.target.value)} />}
              </Field>
              <Field id="co-email" label="E-mail" required error={errors.email} controlClassName={ctl}>
                {(p) => <input {...p} name="email" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} />}
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 font-display text-lg font-extrabold text-zinc-900">2. Endereço de entrega</legend>
            <div className="grid gap-4 sm:grid-cols-6">
              <Field id="co-cep" label="CEP" required error={errors.cep} className="sm:col-span-2" controlClassName={ctl}>
                {(p) => (
                  <input {...p} name="cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={data.cep} onChange={(e) => set('cep', maskCep(e.target.value))} />
                )}
              </Field>
              <Field id="co-endereco" label="Rua / avenida" required error={errors.endereco} className="sm:col-span-4" controlClassName={ctl}>
                {(p) => <input {...p} name="endereco" autoComplete="address-line1" value={data.endereco} onChange={(e) => set('endereco', e.target.value)} />}
              </Field>
              <Field id="co-numero" label="Número" required error={errors.numero} className="sm:col-span-2" controlClassName={ctl}>
                {(p) => <input {...p} name="numero" value={data.numero} onChange={(e) => set('numero', e.target.value)} />}
              </Field>
              <Field id="co-cidade" label="Cidade" required error={errors.cidade} className="sm:col-span-3" controlClassName={ctl}>
                {(p) => <input {...p} name="cidade" autoComplete="address-level2" value={data.cidade} onChange={(e) => set('cidade', e.target.value)} />}
              </Field>
              <Field id="co-uf" label="UF" required error={errors.uf} className="sm:col-span-1" controlClassName={ctl}>
                {(p) => (
                  <select {...p} name="uf" autoComplete="address-level1" value={data.uf} onChange={(e) => set('uf', e.target.value)}>
                    <option value="">—</option>
                    {UFS.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 font-display text-lg font-extrabold text-zinc-900">3. Entrega e pagamento</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {['Padrão', 'Retirar na loja'].map((opt) => (
                <label
                  key={opt}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime-300/60',
                    data.entrega === opt ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-300',
                  )}
                >
                  <input type="radio" name="entrega" value={opt} checked={data.entrega === opt} onChange={() => set('entrega', opt)} className="accent-zinc-900" />
                  <span>
                    <span className="block font-semibold text-zinc-900">{opt}</span>
                    <span className="text-zinc-500">{opt === 'Padrão' ? 'Prazo e frete fictícios' : 'Loja fictícia, sem endereço real'}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-zinc-100 p-4 text-sm text-zinc-600">
              <strong className="text-zinc-900">Pagamento:</strong> não disponível nesta demonstração. Em uma loja real, aqui seria integrado um
              meio de pagamento seguro (por exemplo, Pix ou cartão via gateway de pagamento).
            </p>
          </fieldset>

          <button type="submit" className="h-13 w-full rounded-xl bg-zinc-900 px-6 font-semibold text-white hover:bg-zinc-800">
            Concluir pedido simulado · {formatBRL(total)}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-zinc-50 p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 font-display text-lg font-extrabold text-zinc-900">Seu pedido</h2>
          <ul className="mb-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.productId + l.size} className="flex justify-between gap-3">
                <span className="text-zinc-600">
                  {l.qty}× {l.product.name} <span className="text-zinc-400">({l.size})</span>
                </span>
                <span className="shrink-0 tabular-nums text-zinc-900">{formatBRL(l.total)}</span>
              </li>
            ))}
          </ul>
          <CartSummary />
        </aside>
      </div>
    </div>
  )
}
