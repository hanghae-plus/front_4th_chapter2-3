import { useModalStore } from "@shared/model"
import { Dialog } from "@shared/ui"

export function Modal() {
  const { isOpen, content, closeModal } = useModalStore()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      {content}
    </Dialog>
  )
}
