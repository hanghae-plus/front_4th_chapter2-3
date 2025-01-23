import { useState, useCallback } from "react"

export function useLayerStack<T>() {
  const [layers, setLayers] = useState<Array<{ id: number; props: T; isOpen: boolean }>>([])
  const [nextId, setNextId] = useState(0)

  const open = useCallback(
    (props: T) => {
      const id = nextId
      setNextId((prev) => prev + 1)
      setLayers((prev) => [...prev, { id, props, isOpen: true }])
      return id
    },
    [nextId],
  )

  const close = useCallback((id: number) => {
    setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, isOpen: false } : layer)))
  }, [])

  return { layers, open, close }
}
