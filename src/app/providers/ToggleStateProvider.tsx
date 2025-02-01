import { PropsWithChildren, useCallback, useState } from "react"

import { type ToggleState, ToggleStateContext } from "../../shared/model/ToggleStateContext"

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
