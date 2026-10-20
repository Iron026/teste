import { faq } from '@/data/faq'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Accordion } from '@/components/ui/Accordion'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="faq-titulo" className="bg-slate-50 py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="faq-titulo"
            eyebrow="Perguntas frequentes"
            title="Dúvidas comuns antes de começar."
            description="Não encontrou sua pergunta? Envie uma mensagem pela seção de contato."
          />
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={faq} className="border-y border-slate-200" />
        </Reveal>
      </div>
    </section>
  )
}
