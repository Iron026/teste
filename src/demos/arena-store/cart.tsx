import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FREE_SHIPPING_FROM, SHIPPING_FEE, getProduct, type Product } from './data'

export interface CartItem {
  productId: string
  size: string
  qty: number
}

export interface CartLine extends CartItem {
  product: Product
  total: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  shipping: number
  total: number
  add: (productId: string, size: string, qty: number) => void
  setQty: (productId: string, size: string, qty: number) => void
  remove: (productId: string, size: string) => void
  clear: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)
export const MAX_QTY = 10

/** Carrinho persistido no localStorage do navegador. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('arena-store:carrinho', [])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const lines = useMemo(
    () =>
      items.flatMap((i) => {
        const product = getProduct(i.productId)
        // Ignora itens salvos que não existem mais no catálogo
        return product ? [{ ...i, product, total: product.price * i.qty }] : []
      }),
    [items],
  )

  const count = lines.reduce((a, l) => a + l.qty, 0)
  const subtotal = Math.round(lines.reduce((a, l) => a + l.total, 0) * 100) / 100
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
  const total = Math.round((subtotal + shipping) * 100) / 100

  const add = useCallback(
    (productId: string, size: string, qty: number) =>
      setItems((list) => {
        const existing = list.find((i) => i.productId === productId && i.size === size)
        if (existing) return list.map((i) => (i === existing ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
        return [...list, { productId, size, qty: Math.min(MAX_QTY, qty) }]
      }),
    [setItems],
  )
  const setQty = useCallback(
    (productId: string, size: string, qty: number) =>
      setItems((list) => list.map((i) => (i.productId === productId && i.size === size ? { ...i, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : i))),
    [setItems],
  )
  const remove = useCallback(
    (productId: string, size: string) => setItems((list) => list.filter((i) => !(i.productId === productId && i.size === size))),
    [setItems],
  )
  const clear = useCallback(() => setItems([]), [setItems])

  return (
    <CartContext.Provider value={{ lines, count, subtotal, shipping, total, add, setQty, remove, clear, drawerOpen, setDrawerOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}
