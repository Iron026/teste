import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Menu, X, CalendarDays, Clock3, MapPin, Wrench } from 'lucide-react'
import { DemoBar } from '@/components/layout/DemoBar'
import { Accordion } from '@/components/ui/Accordion'
import { useSeo } from '@/hooks/useSeo'
import { benefits, company, faq, services, steps } from './content'
import { QuoteForm } from './QuoteForm'

const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#beneficios', label: 'Vantagens' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#duvidas', label: 'Dúvidas' },
]

function NovaLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white">
        <Wrench aria-hidden="true" className="h-5 w-5" />
      </span>
      <span className={`font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        Nova<span className="text-orange-600">Serviços</span>
      </span>
    </span>
  )
}

export default function NovaServicosPage() {
  useSeo({
    title: 'Nova Serviços — landing page (demonstração)',
    description: 'Demonstração de landing page de serviços com formulário de orçamento validado.',
    noindex: true,
  })
  const [open, setOpen] = useState(false)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById('orcamento')
      const formTop = form ? form.getBoundingClientRect().top : Infinity
      setShowSticky(window.scrollY > 500 && formTop > window.innerHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-700">
      <DemoBar projectSlug="nova-servicos" projectName="Nova Serviços" />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#topo" aria-label="Nova Serviços — topo da página" className="rounded-lg">
            <NovaLogo />
          </a>
          <nav aria-label="Nova Serviços" className="hidden md:block">
            <ul className="flex gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#orcamento" className="hidden h-10 items-center rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700 sm:inline-flex">
              Pedir orçamento
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="ns-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-900 hover:bg-slate-100 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <nav id="ns-menu" hidden={!open} aria-label="Nova Serviços (celular)" className="border-t border-slate-200 md:hidden">
          <ul className="px-4 py-3">
            {[...nav, { href: '#orcamento', label: 'Pedir orçamento' }].map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-slate-900 hover:bg-slate-50">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="conteudo">
        {/* Hero */}
        <section id="topo" className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {company.region}
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
                Manutenção da sua casa, <span className="text-orange-600">sem dor de cabeça.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
                Elétrica, hidráulica, pintura, montagem de móveis e pequenos reparos com horário agendado e orçamento antes do serviço.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#orcamento" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 font-semibold text-white shadow-[0_12px_28px_-12px_rgb(234_88_12/0.8)] hover:bg-orange-700">
                  Pedir orçamento gratuito <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a href="#servicos" className="inline-flex h-13 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-800 hover:bg-slate-50">
                  Ver serviços
                </a>
              </div>
              <ul className="mt-8 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                {['Orçamento sem compromisso', 'Valor informado antes', 'Atendimento agendado', 'Local limpo ao final'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-orange-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Composição ilustrativa: cartão de agendamento */}
            <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
              <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-orange-200/60 blur-3xl" />
              <div className="relative rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgb(15_23_42/0.35)] ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pedido de orçamento</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Troca de torneira da cozinha</p>
                <div className="mt-5 space-y-3 text-sm">
                  <p className="flex items-center gap-3 text-slate-600">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Wrench className="h-4 w-4" />
                    </span>
                    Hidráulica
                  </p>
                  <p className="flex items-center gap-3 text-slate-600">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    Quinta-feira
                  </p>
                  <p className="flex items-center gap-3 text-slate-600">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Clock3 className="h-4 w-4" />
                    </span>
                    Período da manhã
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="text-sm text-slate-500">Situação</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">Orçamento enviado</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl sm:block">
                <span className="font-semibold">6 tipos de serviço</span>
                <span className="block text-xs text-slate-400">em um só lugar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" aria-labelledby="ns-servicos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600">Serviços</p>
            <h2 id="ns-servicos" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              O que fazemos por você
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text }) => (
              <li key={title} className="group rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefícios */}
        <section id="beneficios" aria-labelledby="ns-beneficios" className="scroll-mt-20 bg-slate-900 py-20 text-slate-300">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="ns-beneficios" className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Por que escolher a Nova Serviços
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon aria-hidden="true" className="h-7 w-7 text-orange-400" />
                  <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" aria-labelledby="ns-como" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-600">Como funciona</p>
          <h2 id="ns-como" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Do pedido ao serviço pronto em 4 passos
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative rounded-2xl bg-orange-50/60 p-6">
                <span className="font-display text-5xl font-extrabold text-orange-200" aria-hidden="true">
                  {i + 1}
                </span>
                <Icon aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 text-orange-600" />
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Orçamento + FAQ */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
            <div id="duvidas" className="scroll-mt-20">
              <p className="text-sm font-bold uppercase tracking-wider text-orange-600">Dúvidas frequentes</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Perguntas comuns</h2>
              <Accordion items={faq} className="mt-6 border-y border-slate-200" accentClassName="bg-orange-600 text-white" />
            </div>
            <div id="orcamento" className="scroll-mt-20 rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgb(15_23_42/0.3)] ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Peça seu orçamento</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">Leva menos de 2 minutos. Campos com * são obrigatórios.</p>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 pb-24 pt-12 text-sm text-slate-400 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <NovaLogo light />
          <p>Empresa fictícia criada para demonstração. Serviços, região e contatos não são reais.</p>
        </div>
      </footer>

      {/* CTA fixo no celular */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showSticky}
      >
        <a href="#orcamento" tabIndex={showSticky ? 0 : -1} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 font-semibold text-white">
          Pedir orçamento gratuito <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
