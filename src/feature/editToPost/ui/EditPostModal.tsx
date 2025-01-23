import { Post } from "../../../entities/post/model/type"
import { Modal } from "../../../shared/ui/Modal/Modal"
import { EditToPostForm } from "./EditToPostForm"

interface EditPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post
}

export const EditPostModal = ({ isOpen, onClose, post }: EditPostModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title="게시물 수정">
      <EditToPostForm post={post} onClose={onClose} />
    </Modal>
  )
}
