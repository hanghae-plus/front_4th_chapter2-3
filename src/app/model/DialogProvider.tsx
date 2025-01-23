import React, { createContext, useContext, useState } from "react"

import type { ReactNode, ComponentType } from "react"

interface DialogLayer {
  id: number
  Component: ComponentType<any>
  props?: any
  isOpen: boolean
}

interface DialogContextType {
  openDialog: (Component: ComponentType<any>, props?: any) => number
  closeDialog: (id: number) => void
  layers: DialogLayer[]
}

const DialogContext = createContext<DialogContextType | null>(null)

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layers, setLayers] = useState<DialogLayer[]>([])
  const [nextId, setNextId] = useState(0)

  const openDialog = (Component: ComponentType<any>, props = {}) => {
    const id = nextId
    setNextId((prev) => prev + 1)
    setLayers((prev) => [...prev, { id, Component, props, isOpen: true }])
    return id
  }

  const closeDialog = (id: number) => {
    setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, isOpen: false } : layer)))
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, layers }}>
      {children}
      {layers.map((layer) => layer.isOpen && <layer.Component key={layer.id} {...layer.props} dialogId={layer.id} />)}
    </DialogContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
