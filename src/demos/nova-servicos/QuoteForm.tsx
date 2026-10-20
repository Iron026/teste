import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertTriangle, Check, Copy, Mail, PencilLine } from 'lucide-react'
import { Field } from '@/components/ui/Field'
import { isEmail, isPhoneBR, maskPhoneBR, focusFirstError, type Errors } from '@/lib/validation'
import { mailtoUrl } from '@/lib/contact'
import { company, periods, services } from './content'

interface Data {
  nome: string
  telefone: string
  email: string
  servico: string
  bairro: string
  periodo: string
  descricao: string
  aceite: boolean
}

const empty: Data = { nome: '', telefone: '', email: '', servico: '', bairro: '', periodo: '', descricao: '', aceite: false }

function validate(d: Data): Errors<Data> {
  const e: Errors<Data> = {}
  if (d.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (!isPhoneBR(d.telefone)) e.telefone = 'Informe um telefone com DDD, ex.: (11) 98765-4321.'
  if (d.email.trim() && !isEmail(d.email)) e.email = 'E-mail inválido. Deixe em branco se preferir.'
  if (!d.servico) e.servico = 'Escolha o tipo de serviço.'
  if (d.bairro.trim().length < 3) e.bairro = 'Informe o bairro e a cidade.'
  if (!d.periodo) e.periodo = 'Escolha um período.'
  if (d.descricao.trim().length < 15) e.descricao = 'Descreva o serviço em pelo menos 15 caracteres.'
  if (!d.aceite) e.aceite = 'É preciso concordar para continuar.'
  return e
}

function summary(d: Data) {
  return [
    `Pedido de orçamento — ${d.servico}`,
    '',
    `Nome: ${d.nome.trim()}`,
    `Telefone: ${d.telefone}`,
    d.email.trim() ? `E-mail: ${d.email.trim()}` : null,
    `Bairro/cidade: ${d.bairro.trim()}`,
    `Período preferido: ${d.periodo}`,
    '',
    'Descrição:',
    d.descricao.trim(),
  ]
    .filter((l) => l !== null)
    .join('\n')
}

/**
 * Formulário de orçamento.
 * Página estática (sem servidor): após validar, o pedido é montado e o
 * visitante decide se abre o próprio aplicativo de e-mail. Nada é enviado
 * automaticamente e a interface informa isso claramente.
 */
export function QuoteForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<Data>(empty)
  const [errors, setErrors] = useState<Errors<Data>>({})
  const [submitted, setSubmitted] = useState(false)
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ready) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [ready])

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    const next = { ...data, [k]: v }
    setData(next)
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(ref.current, errs)
    setReady(true)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary(data))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (ready) {
    return (
      <div ref={resultRef} className="scroll-mt-24 space-y-5" role="status" aria-live="polite">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
            <Check aria-hidden="true" className="h-4 w-4" /> Pedido validado e pronto
          </p>
          <h3 className="mt-3 text-xl font-bold text-slate-900">Confira os dados do seu pedido</h3>
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 font-sans text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200">
          {summary(data)}
        </pre>
        <p className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm leading-relaxed text-amber-900">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>Nada foi enviado.</strong> Esta é uma página demonstrativa sem servidor. O botão abaixo abre o seu aplicativo de
            e-mail com o pedido preenchido, endereçado a um e-mail fictício ({company.email}) que não recebe mensagens.
          </span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={mailtoUrl(company.email, `Orçamento: ${data.servico}`, summary(data))}
            className="inline-flex h-12 items-center sm:flex-1 justify-center gap-2 rounded-xl bg-orange-700 px-5 font-semibold text-white hover:bg-orange-800"
          >
            <Mail aria-hidden="true" className="h-4 w-4" /> Abrir no aplicativo de e-mail
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 font-semibold text-slate-800 hover:bg-slate-50"
          >
            {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
            {copied ? 'Copiado' : 'Copiar texto'}
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setReady(false)
            setCopied(false)
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 underline-offset-4 hover:underline"
        >
          <PencilLine aria-hidden="true" className="h-4 w-4" /> Editar dados
        </button>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="ns-form-aviso">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="ns-nome" label="Nome" required error={errors.nome} controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15">
          {(p) => <input {...p} name="nome" autoComplete="name" value={data.nome} onChange={(e) => set('nome', e.target.value)} />}
        </Field>
        <Field id="ns-telefone" label="Telefone / WhatsApp" required error={errors.telefone} controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15">
          {(p) => (
            <input
              {...p}
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              value={data.telefone}
              onChange={(e) => set('telefone', maskPhoneBR(e.target.value))}
            />
          )}
        </Field>
        <Field id="ns-email" label="E-mail" error={errors.email} controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15">
          {(p) => <input {...p} name="email" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} />}
        </Field>
        <Field id="ns-servico" label="Serviço" required error={errors.servico} controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15">
          {(p) => (
            <select {...p} name="servico" value={data.servico} onChange={(e) => set('servico', e.target.value)}>
              <option value="">Selecione…</option>
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
              <option>Outro</option>
            </select>
          )}
        </Field>
        <Field id="ns-bairro" label="Bairro e cidade" required error={errors.bairro} className="sm:col-span-2" controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15">
          {(p) => <input {...p} name="bairro" autoComplete="address-level2" value={data.bairro} onChange={(e) => set('bairro', e.target.value)} />}
        </Field>
      </div>

      <fieldset aria-describedby={errors.periodo ? 'ns-periodo-erro' : undefined}>
        <legend className="mb-1.5 text-sm font-semibold text-slate-900">
          Período preferido <span className="text-red-600" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {periods.map((p) => (
            <label
              key={p}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-2 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-orange-500/20 ${
                data.periodo === p ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              <input type="radio" name="periodo" value={p} checked={data.periodo === p} onChange={() => set('periodo', p)} className="sr-only" />
              {p}
            </label>
          ))}
        </div>
        {errors.periodo && (
          <p id="ns-periodo-erro" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.periodo}
          </p>
        )}
      </fieldset>

      <Field
        id="ns-descricao"
        label="Descreva o serviço"
        required
        error={errors.descricao}
        hint="Ex.: torneira da cozinha pingando, precisa trocar o reparo."
        controlClassName="focus:!border-orange-500 focus:!ring-orange-500/15"
      >
        {(p) => <textarea {...p} name="descricao" rows={4} value={data.descricao} onChange={(e) => set('descricao', e.target.value)} />}
      </Field>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            name="aceite"
            checked={data.aceite}
            onChange={(e) => set('aceite', e.target.checked)}
            aria-invalid={!!errors.aceite}
            aria-describedby={errors.aceite ? 'ns-aceite-erro' : undefined}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-orange-700"
          />
          Concordo em ser contatado(a) sobre este orçamento.
        </label>
        {errors.aceite && (
          <p id="ns-aceite-erro" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.aceite}
          </p>
        )}
      </div>

      <button type="submit" className="h-12 w-full rounded-xl bg-orange-700 px-5 font-semibold text-white shadow-[0_10px_24px_-10px_rgb(234_88_12/0.7)] transition-colors hover:bg-orange-800">
        Revisar pedido de orçamento
      </button>
      <p id="ns-form-aviso" className="text-center text-xs text-slate-500">
        Demonstração: nenhum dado é enviado ou armazenado por esta página.
      </p>
    </form>
  )
}
