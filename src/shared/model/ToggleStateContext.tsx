import { createContext, useContext } from "react"

export type ToggleState = {
  isOpen: boolean
}

export type ToggleStateContextValue<T extends string> = {
  toggles: Record<T, ToggleState>
  isOpen: (key: T) => boolean
  onOpen: (key: T) => void
  onClose: (key: T) => void
  onToggle: (key: T) => void
}

export const ToggleStateContext = createContext<ToggleStateContextValue<never> | null>(null)

import { PropsWithChildren, useCallback, useState } from "react"

export const ToggleStateProvider = <T extends string>({
  children,
  initialState = {} as Record<T, boolean>,
}: PropsWithChildren<{ initialState?: Record<T, boolean> }>) => {
  const [toggles, setToggles] = useState<Record<T, ToggleState>>(() =>
    Object.entries(initialState).reduce(
      (acc, [id, state]) => ({
        ...acc,
        [id]: { isOpen: state },
      }),
      {} as Record<T, ToggleState>,
    ),
  )

  const onOpen = useCallback((id: T) => {
    setToggles((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true },
    }))
  }, [])

  const onClose = useCallback((id: T) => {
    setToggles((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }))
  }, [])

  const onToggle = useCallback((id: T) => {
    setToggles((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: !prev[id]?.isOpen },
    }))
  }, [])

  const isOpen = useCallback((id: T) => toggles[id]?.isOpen ?? false, [toggles])

  return (
    <ToggleStateContext.Provider value={{ toggles, isOpen, onOpen, onClose, onToggle }}>
      {children}
    </ToggleStateContext.Provider>
  )
}

export const useToggleState = <T extends string>() => {
  const context = useContext(ToggleStateContext) as ToggleStateContextValue<T> | null

  if (!context) throw new Error("useToggleState must be used within a ToggleStateProvider")

  return context
}
