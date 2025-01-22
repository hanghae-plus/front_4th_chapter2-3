import { Modal } from "../../../shared/ui"
import { AddPostForm } from "./AddPostForm"

interface AddPostModalProps {
  isOpen: boolean
  onClose: () => void
  formData: {
    title: string
    body: string
    userId: number
  }
  onChange: (data: { field: string; value: string | number }) => void
  onSubmit: () => void
  isSubmitting: boolean
}

interface AddPostModalProps {
  isOpen: boolean
  onClose: () => void
  formData: {
    title: string
    body: string
    userId: number
  }
  onChange: (data: { field: string; value: string | number }) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const AddPostModal = (props: AddPostModalProps) => (
  <Modal open={props.isOpen} onClose={props.onClose} title="새 게시물 추가">
    <AddPostForm {...props} />
  </Modal>
)
