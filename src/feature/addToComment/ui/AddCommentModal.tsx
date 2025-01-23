import { Modal } from "../../../shared/ui/Modal/Modal"
import { AddToCommentForm } from "./AddToCommentForm"

interface AddCommentModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddCommentModal = ({ isOpen, onClose }: AddCommentModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title="새 댓글 추가">
      <AddToCommentForm />
    </Modal>
  )
}
