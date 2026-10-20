import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ao trocar de rota: rola até a âncora (#secao) se existir,
 * caso contrário volta ao topo. Tenta algumas vezes para aguardar
 * páginas carregadas sob demanda.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    let tries = 0
    let timer: number
    const scroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        if (el.tabIndex < 0 && !/^(A|BUTTON|INPUT)$/.test(el.tagName)) el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      } else if (tries++ < 20) {
        timer = window.setTimeout(scroll, 50)
      }
    }
    scroll()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
