import { useState } from 'react'

export function useLocalStore(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initial } catch { return initial }
  })

  const update = (next) => {
    const finalValue = typeof next === 'function' ? next(value) : next
    setValue(finalValue)
    localStorage.setItem(key, JSON.stringify(finalValue))
  }

  return [value, update]
}
