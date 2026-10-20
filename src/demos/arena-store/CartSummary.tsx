import { formatBRL } from '@/lib/format'
import { FREE_SHIPPING_FROM } from './data'
import { useCart } from './cart'

export function CartSummary() {
  const { subtotal, shipping, total, count } = useCart()
  const missing = FREE_SHIPPING_FROM - subtotal
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between text-zinc-600">
        <dt>Subtotal ({count} {count === 1 ? 'item' : 'itens'})</dt>
        <dd className="tabular-nums text-zinc-900">{formatBRL(subtotal)}</dd>
      </div>
      <div className="flex justify-between text-zinc-600">
        <dt>Frete (simulado)</dt>
        <dd className="tabular-nums text-zinc-900">{shipping === 0 ? (subtotal > 0 ? 'Grátis' : '—') : formatBRL(shipping)}</dd>
      </div>
      {subtotal > 0 && missing > 0 && (
        <p className="rounded-lg bg-lime-50 px-3 py-2 text-xs text-lime-900">
          Faltam <strong>{formatBRL(missing)}</strong> para o frete grátis (acima de {formatBRL(FREE_SHIPPING_FROM)}).
        </p>
      )}
      <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-zinc-900">
        <dt>Total</dt>
        <dd className="tabular-nums">{formatBRL(total)}</dd>
      </div>
    </dl>
  )
}
