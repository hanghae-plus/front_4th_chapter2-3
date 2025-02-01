import { useState } from "react"

import { UseModalProps } from "./types"

export const useModal = (props?: UseModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    setIsOpen(true)
    props?.onOpen?.()
  }

  const close = () => {
    setIsOpen(false)
    props?.onClose?.()
  }

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  }
}
