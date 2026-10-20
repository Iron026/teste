import { useEffect, useState } from 'react'

/** Retorna o id da seção visível no momento (para destacar o menu). */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!enabled) {
      setActive('')
      return
    }
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, enabled])

  return active
}
