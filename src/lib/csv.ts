/**
 * Gera e baixa um CSV compatível com o Excel em português:
 * separador ";" e BOM UTF-8 para acentuação correta.
 */
export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escape = (value: string | number) => {
    const text = typeof value === 'number' ? value.toString().replace('.', ',') : value
    return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const lines = [headers, ...rows].map((r) => r.map(escape).join(';'))
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
