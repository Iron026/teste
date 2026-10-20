/**
 * Gera as capas dos projetos (public/projetos/*.webp) a partir de
 * capturas de tela das próprias demonstrações.
 *
 * Requisitos (opcionais, só para quem quiser regenerar as capas):
 *   npm i -D playwright && npx playwright install chromium
 *   pip install pillow
 * Uso:
 *   npm run dev            (em outro terminal)
 *   node scripts/gerar-capas.mjs [http://localhost:5173]
 */
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const base = process.argv[2] ?? 'http://localhost:5173'
const out = new URL('../public/projetos/', import.meta.url).pathname
mkdirSync(out, { recursive: true })

const shots = [
  { slug: 'prime-imoveis', path: '/demos/prime-imoveis/imoveis' },
  { slug: 'gestao360', path: '/demos/gestao360' },
  { slug: 'nova-servicos', path: '/demos/nova-servicos' },
  { slug: 'arena-store', path: '/demos/arena-store' },
]

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1.25 })
for (const s of shots) {
  await page.goto(base + s.path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900) // aguarda animações de entrada
  const png = `${out}${s.slug}.png`
  await page.screenshot({ path: png })
  // Converte para WebP (menor) usando Pillow
  execFileSync('python3', ['-c', `from PIL import Image;import os;im=Image.open('${png}').convert('RGB');im.save('${out}${s.slug}.webp','WEBP',quality=82,method=6);os.remove('${png}')`])
  console.log('capa gerada:', s.slug)
}
await browser.close()
