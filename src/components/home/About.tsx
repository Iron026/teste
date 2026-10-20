import { Sparkles } from 'lucide-react'
import { about } from '@/data/about'
import { technologies } from '@/data/technologies'
import { siteConfig } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { LogoMark } from '@/components/ui/Logo'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading id="sobre-titulo" eyebrow="Sobre" title={about.title} />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-5">
          {/* Cartão de identidade (sem foto pessoal) */}
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/30 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <LogoMark className="h-14 w-14" />
              <div>
                <p className="font-display text-lg font-bold">{siteConfig.name}</p>
                <p className="text-sm text-slate-400">{siteConfig.tagline}</p>
              </div>
            </div>
            <ul className="relative mt-7 space-y-4">
              {about.values.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-aqua-300" />
                  <p className="text-sm leading-relaxed text-slate-300">
                    <strong className="font-semibold text-white">{v.title}.</strong> {v.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Ferramentas e tecnologias</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <li key={t} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-ink-800">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
