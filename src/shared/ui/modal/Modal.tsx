import { useModalStore } from "@shared/model"
import { Dialog } from "../dialog"

export function Modal() {
  const { isOpen, content, onClose } = useModalStore()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {content}
    </Dialog>
  )
}
