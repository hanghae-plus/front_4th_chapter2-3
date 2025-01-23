import { Comment } from "../../../entities/comment/model/type"
import { Modal } from "../../../shared/ui/Modal/Modal"
import { EditToCommentForm } from "./EditToCommentForm"

interface EditCommentModalProps {
  isOpen: boolean
  onClose: () => void
  comment: Comment
}

export const EditCommentModal = ({ isOpen, onClose, comment }: EditCommentModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title="댓글 수정">
      <EditToCommentForm comment={comment} onClose={onClose} />
    </Modal>
  )
}
