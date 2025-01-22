import { Modal } from "../../../shared/ui/modal/Modal"
import { Post } from "../../../entities/post/model/types"
import { EditPostForm } from "../../../entities/post/ui/EditPostForm"

interface EditPostModalProps {
  post?: Post
  isOpen: boolean
  onClose: () => void
  onChange: (field: string, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const EditPostModal = (props: EditPostModalProps) => (
  <Modal open={props.isOpen} onClose={props.onClose} title="게시물 수정">
    <EditPostForm {...props} />
  </Modal>
)
