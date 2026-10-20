// Exporta as transações fictícias do Gestão360 para JSON,
// para que a planilha XLSX use exatamente os mesmos dados do dashboard.
// Uso: node --experimental-strip-types scripts/exportar-transacoes.mjs
import { writeFileSync } from 'node:fs'
import { transactions } from '../src/demos/gestao360/data.ts'

const out = new URL('./dados/gestao360-transacoes.json', import.meta.url)
const sorted = [...transactions].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : 1))
writeFileSync(out, JSON.stringify(sorted, null, 0))
console.log(`${sorted.length} transações exportadas para ${out.pathname}`)
