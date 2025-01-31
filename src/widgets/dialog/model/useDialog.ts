import { useState } from "react"

export interface Props {
  onOpen?: () => void
  onClose?: () => void
}

export const useDialog = (props?: Props) => {
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
