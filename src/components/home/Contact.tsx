import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Mail, MessageCircle, ExternalLink, Send, Copy, Check, Info } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { hasEmail, hasProfile, hasWhatsapp, hasAnyContact, extraLinks, whatsappUrl, mailtoUrl } from '@/lib/contact'
import { isEmail, focusFirstError, type Errors } from '@/lib/validation'

interface FormData {
  nome: string
  email: string
  servico: string
  mensagem: string
}

const empty: FormData = { nome: '', email: '', servico: '', mensagem: '' }

function validate(d: FormData): Errors<FormData> {
  const e: Errors<FormData> = {}
  if (d.nome.trim().length < 2) e.nome = 'Informe seu nome.'
  if (!isEmail(d.email)) e.email = 'Informe um e-mail válido, como nome@exemplo.com.'
  if (!d.servico) e.servico = 'Escolha o tipo de projeto.'
  if (d.mensagem.trim().length < 20) e.mensagem = 'Descreva sua necessidade em pelo menos 20 caracteres.'
  return e
}

function buildMessage(d: FormData) {
  return `Olá! Meu nome é ${d.nome.trim()}.\n\nTipo de projeto: ${d.servico}\nE-mail para retorno: ${d.email.trim()}\n\n${d.mensagem.trim()}`
}

export function Contact() {
  const { contact } = siteConfig
  const formRef = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<FormData>(empty)
  const [errors, setErrors] = useState<Errors<FormData>>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'email' | 'whatsapp' | 'copied'>('idle')

  const canSend = hasEmail || hasWhatsapp

  const update = (field: keyof FormData, value: string) => {
    const next = { ...data, [field]: value }
    setData(next)
    if (touched) setErrors(validate(next))
    setStatus('idle')
  }

  const check = () => {
    setTouched(true)
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length) {
      focusFirstError(formRef.current, e)
      return false
    }
    return true
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!check()) return
    if (hasEmail) {
      window.location.href = mailtoUrl(contact.email, `Orçamento: ${data.servico}`, buildMessage(data))
      setStatus('email')
    } else if (hasWhatsapp) {
      window.open(whatsappUrl(buildMessage(data)), '_blank', 'noopener')
      setStatus('whatsapp')
    }
  }

  const sendWhatsapp = () => {
    if (!check()) return
    window.open(whatsappUrl(buildMessage(data)), '_blank', 'noopener')
    setStatus('whatsapp')
  }

  const copy = async () => {
    if (!check()) return
    try {
      await navigator.clipboard.writeText(buildMessage(data))
      setStatus('copied')
    } catch {
      setStatus('idle')
    }
  }

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card lg:grid lg:grid-cols-[1fr_1.25fr]">
          {/* Coluna de canais */}
          <div className="relative overflow-hidden bg-ink-950 p-8 text-white sm:p-12">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-600/30 blur-3xl" />
            <Reveal className="relative">
              <SectionHeading
                id="contato-titulo"
                tone="light"
                eyebrow="Contato"
                title="Vamos conversar sobre o seu projeto?"
                description="Conte o que você precisa. Respondo com perguntas para entender melhor e, em seguida, envio uma proposta com escopo, prazo e valor."
              />

              {hasAnyContact ? (
                <ul className="mt-10 space-y-3">
                  {hasWhatsapp && (
                    <ContactLink href={whatsappUrl()} icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" detail="Conversar agora" />
                  )}
                  {hasEmail && (
                    <ContactLink href={`mailto:${contact.email}`} icon={<Mail className="h-5 w-5" />} label="E-mail" detail={contact.email} />
                  )}
                  {hasProfile && (
                    <ContactLink href={contact.profile.url} icon={<ExternalLink className="h-5 w-5" />} label={contact.profile.label} detail="Ver perfil profissional" />
                  )}
                  {extraLinks.map((l) => (
                    <ContactLink key={l.url} href={l.url} icon={<ExternalLink className="h-5 w-5" />} label={l.label} detail={l.url.replace(/^https?:\/\//, '')} />
                  ))}
                </ul>
              ) : (
                <p className="mt-10 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-300">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-300" />
                  Os canais de contato diretos serão publicados em breve. Enquanto isso, se você chegou por uma plataforma de
                  freelancers, utilize o chat da própria plataforma.
                </p>
              )}
            </Reveal>
          </div>

          {/* Formulário */}
          <div className="p-8 sm:p-12">
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="contato-aviso">
              <h3 className="text-xl font-bold">Solicitar orçamento</h3>
              <p id="contato-aviso" className="mt-2 text-sm leading-relaxed text-slate-500">
                {canSend
                  ? 'Este site não possui servidor próprio: ao enviar, seu aplicativo de e-mail ou o WhatsApp será aberto com a mensagem pronta. O envio só acontece quando você confirmar nele.'
                  : 'O envio direto ainda não está disponível. Você pode preencher e copiar a mensagem para enviar pelo canal que preferir.'}
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field id="contato-nome" label="Seu nome" required error={errors.nome}>
                  {(p) => (
                    <input {...p} name="nome" autoComplete="name" value={data.nome} onChange={(e) => update('nome', e.target.value)} />
                  )}
                </Field>
                <Field id="contato-email" label="Seu e-mail" required error={errors.email}>
                  {(p) => (
                    <input
                      {...p}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  )}
                </Field>
                <Field id="contato-servico" label="Tipo de projeto" required error={errors.servico} className="sm:col-span-2">
                  {(p) => (
                    <select {...p} name="servico" value={data.servico} onChange={(e) => update('servico', e.target.value)}>
                      <option value="">Selecione…</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Outro / ainda não sei">Outro / ainda não sei</option>
                    </select>
                  )}
                </Field>
                <Field
                  id="contato-mensagem"
                  label="Descreva o que você precisa"
                  required
                  error={errors.mensagem}
                  hint="Ex.: tipo de negócio, objetivo do projeto e se já existe algo pronto."
                  className="sm:col-span-2"
                >
                  {(p) => (
                    <textarea {...p} name="mensagem" rows={5} value={data.mensagem} onChange={(e) => update('mensagem', e.target.value)} />
                  )}
                </Field>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {canSend && (
                  <Button type="submit" size="lg" className="sm:flex-1">
                    <Send aria-hidden="true" className="h-4 w-4" />
                    {hasEmail ? 'Abrir e-mail com a mensagem' : 'Enviar pelo WhatsApp'}
                  </Button>
                )}
                {hasEmail && hasWhatsapp && (
                  <Button variant="secondary" size="lg" onClick={sendWhatsapp} className="sm:flex-1">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" /> Enviar pelo WhatsApp
                  </Button>
                )}
                <Button variant={canSend ? 'ghost' : 'primary'} size="lg" onClick={copy} className={canSend ? 'border border-slate-200' : 'sm:flex-1'}>
                  {status === 'copied' ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                  {status === 'copied' ? 'Mensagem copiada' : 'Copiar mensagem'}
                </Button>
              </div>

              <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm text-slate-600">
                {status === 'email' && 'Seu aplicativo de e-mail foi aberto com a mensagem preenchida. Confirme o envio por lá.'}
                {status === 'whatsapp' && 'O WhatsApp foi aberto em uma nova aba com a mensagem preenchida. Confirme o envio por lá.'}
                {status === 'copied' && 'Texto copiado para a área de transferência. Cole no canal de sua preferência.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactLink({ href, icon, label, detail }: { href: string; icon: ReactNode; label: string; detail: string }) {
  const external = href.startsWith('http')
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-aqua-400/50 hover:bg-white/[0.08]"
      >
        <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aqua-400/10 text-aqua-300">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-white">{label}</span>
          <span className="block truncate text-sm text-slate-400">{detail}</span>
        </span>
      </a>
    </li>
  )
}
