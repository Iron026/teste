import { processSteps } from '@/data/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Process() {
  return (
    <section id="como-trabalho" aria-labelledby="processo-titulo" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            id="processo-titulo"
            tone="light"
            eyebrow="Como trabalho"
            title="Um processo simples, transparente e sem surpresas."
            description="Você sabe o que vai receber, quando e por quanto antes de qualquer linha de código."
          />
        </Reveal>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal as="li" key={step.title} delay={i * 80} className="relative">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-aqua-400/40 hover:bg-white/[0.05]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-400/10 text-aqua-300">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm text-slate-500" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    <span className="sr-only">Etapa {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
