import { Dialog } from "./Dialog"
import { useModalStore } from "../model/useModalStore"

function Modal() {
  const { isOpen, content, closeModal } = useModalStore()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      {content}
    </Dialog>
  )
}

export default Modal
