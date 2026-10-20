import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { siteConfig } from '@/config/site'
import { mainNav } from '@/data/navigation'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { hasEmail, hasProfile, hasWhatsapp, extraLinks, whatsappUrl } from '@/lib/contact'

export function Footer() {
  const year = new Date().getFullYear()
  const { contact } = siteConfig

  return (
    <footer className="bg-ink-950 text-slate-400">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed">{siteConfig.description}</p>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Os projetos apresentados são demonstrativos e autorais. Empresas, produtos, imóveis e valores exibidos são
            fictícios.
          </p>
        </div>

        <FooterColumn title="Navegação">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Serviços">
          {services.map((s) => (
            <li key={s.id}>
              <Link to={`/#servico-${s.id}`} className="hover:text-white">
                {s.title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Projetos">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to={`/projetos/${p.slug}`} className="hover:text-white">
                {p.name}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {hasWhatsapp && (
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            )}
            {hasEmail && (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4" /> E-mail
                </a>
              </li>
            )}
            {hasProfile && (
              <li>
                <a href={contact.profile.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  <ExternalLink aria-hidden="true" className="h-4 w-4" /> {contact.profile.label}
                </a>
              </li>
            )}
            {extraLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  <ExternalLink aria-hidden="true" className="h-4 w-4" /> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}
