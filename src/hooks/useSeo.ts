import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

interface SeoOptions {
  /** Título da página. O nome do site é acrescentado automaticamente. */
  title?: string
  description?: string
  /** Use em demonstrações que não devem competir com o portfólio nas buscas. */
  noindex?: boolean
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function useSeo({ title, description, noindex }: SeoOptions = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`
    const desc = description ?? siteConfig.description
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
  }, [title, description, noindex])
}
