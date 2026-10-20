import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { useSeo } from '@/hooks/useSeo'

export default function NotFoundPage() {
  useSeo({ title: 'Página não encontrada', noindex: true })
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 pt-24 text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="container-page relative text-center">
        <p className="font-mono text-sm text-aqua-300">Erro 404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-300">O endereço acessado não existe ou foi alterado.</p>
        <ButtonLink to="/" variant="light" size="lg" className="mt-8">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar ao início
        </ButtonLink>
      </div>
    </section>
  )
}
