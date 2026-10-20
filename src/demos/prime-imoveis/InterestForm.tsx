import { useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Info } from 'lucide-react'
import { Field } from '@/components/ui/Field'
import { isEmail, isPhoneBR, maskPhoneBR, focusFirstError, type Errors } from '@/lib/validation'

interface Data {
  nome: string
  telefone: string
  email: string
  mensagem: string
}

function validate(d: Data): Errors<Data> {
  const e: Errors<Data> = {}
  if (d.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (!isPhoneBR(d.telefone)) e.telefone = 'Informe um telefone com DDD.'
  if (!isEmail(d.email)) e.email = 'Informe um e-mail válido.'
  if (d.mensagem.trim().length < 10) e.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return e
}

/**
 * Formulário de interesse em imóvel.
 * DEMONSTRAÇÃO: não existe servidor. Após validar, o formulário apenas
 * mostra um resumo e informa claramente que nada foi enviado.
 */
export function InterestForm({ subject }: { subject?: string }) {
  const ref = useRef<HTMLFormElement>(null)
  const initial: Data = {
    nome: '',
    telefone: '',
    email: '',
    mensagem: subject ? `Olá! Tenho interesse no imóvel ${subject} e gostaria de agendar uma visita.` : '',
  }
  const [data, setData] = useState<Data>(initial)
  const [errors, setErrors] = useState<Errors<Data>>({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: keyof Data, v: string) => {
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
    setDone(true)
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="flex items-center gap-2 font-semibold text-emerald-900">
          <CheckCircle2 aria-hidden="true" className="h-5 w-5" /> Dados validados com sucesso
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          <strong>Esta é uma demonstração:</strong> nenhuma mensagem foi enviada. Em um site real, o pedido de{' '}
          <strong>{data.nome.trim()}</strong> seria encaminhado ao corretor por e-mail, WhatsApp ou sistema de gestão.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(initial)
            setDone(false)
            setSubmitted(false)
          }}
          className="mt-4 text-sm font-semibold text-emerald-900 underline underline-offset-4"
        >
          Preencher novamente
        </button>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id="pi-nome" label="Nome" required error={errors.nome}>
        {(p) => <input {...p} name="nome" autoComplete="name" value={data.nome} onChange={(e) => set('nome', e.target.value)} />}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="pi-telefone" label="Telefone" required error={errors.telefone}>
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
        <Field id="pi-email" label="E-mail" required error={errors.email}>
          {(p) => (
            <input {...p} name="email" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
          )}
        </Field>
      </div>
      <Field id="pi-mensagem" label="Mensagem" required error={errors.mensagem}>
        {(p) => <textarea {...p} name="mensagem" rows={4} value={data.mensagem} onChange={(e) => set('mensagem', e.target.value)} />}
      </Field>
      <button
        type="submit"
        className="w-full rounded-xl bg-[#1f2b26] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#2d3d36]"
      >
        Quero falar com um corretor
      </button>
      <p className="flex gap-2 text-xs leading-relaxed text-[#6b6455]">
        <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Demonstração: os dados são apenas validados no navegador e não são enviados nem armazenados.
      </p>
    </form>
  )
}
