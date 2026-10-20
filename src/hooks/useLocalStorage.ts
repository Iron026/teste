import { useEffect, useState } from 'react'

/** Estado sincronizado com o localStorage (falha de forma silenciosa se indisponível). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível (modo privado, cota cheia): segue só em memória */
    }
  }, [key, value])

  return [value, setValue] as const
}
