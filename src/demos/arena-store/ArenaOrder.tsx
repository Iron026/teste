import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, FlaskConical } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { formatBRL } from '@/lib/format'
import { BASE } from './paths'
import { useCart } from './cart'

interface OrderState {
  code: string
  name: string
  total: number
  items: number
}

export default function ArenaOrder() {
  useSeo({ title: 'Pedido simulado — Arena Store (demonstração)', noindex: true })
  const order = useLocation().state as OrderState | null
  const { clear } = useCart()

  // O carrinho só é esvaziado quando a simulação é exibida
  useEffect(() => {
    if (order) clear()
  }, [order, clear])

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      {order ? (
        <>
          <CheckCircle2 aria-hidden="true" className="mx-auto h-14 w-14 text-lime-600" />
          <h1 className="mt-5 font-display text-3xl font-extrabold text-zinc-900">Simulação concluída, {order.name}!</h1>
          <p className="mt-3 text-zinc-600">
            O fluxo de compra foi percorrido com {order.items} {order.items === 1 ? 'item' : 'itens'}, no total de {formatBRL(order.total)}.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-950">
            <FlaskConical aria-hidden="true" className="h-5 w-5 shrink-0" />
            <span>
              Código de demonstração <strong className="font-mono">{order.code}</strong>. Nenhum pedido foi criado, nenhuma cobrança foi feita
              e nenhum produto será enviado.
            </span>
          </p>
        </>
      ) : (
        <h1 className="font-display text-3xl font-extrabold text-zinc-900">Nenhum pedido simulado nesta sessão</h1>
      )}
      <Link to={BASE} className="mt-8 inline-flex rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white">
        Voltar para a loja
      </Link>
    </div>
  )
}
