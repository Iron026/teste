import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { siteConfig } from './src/config/site'

/** Preenche os metadados do index.html a partir de src/config/site.ts. */
function siteMeta(): Plugin {
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const url = siteConfig.siteUrl.replace(/\/$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_NAME%', escape(siteConfig.name))
        .replaceAll('%SITE_TAGLINE%', escape(siteConfig.tagline))
        .replaceAll('%SITE_DESCRIPTION%', escape(siteConfig.description))
        .replaceAll('%SITE_URL%', url)
        .replace('%SITE_CANONICAL%', url ? `<link rel="canonical" href="${url}/" />` : '')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
