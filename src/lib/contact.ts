import { siteConfig } from '@/config/site'

const { contact } = siteConfig

export const hasWhatsapp = contact.whatsapp.replace(/\D/g, '').length >= 10
export const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
export const hasProfile = contact.profile.url.startsWith('http')
export const extraLinks = contact.extraLinks.filter((l) => l.url.startsWith('http'))
export const hasAnyContact = hasWhatsapp || hasEmail || hasProfile || extraLinks.length > 0

export function whatsappUrl(message: string = contact.whatsappMessage) {
  const phone = contact.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
