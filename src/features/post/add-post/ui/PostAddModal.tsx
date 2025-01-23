import { Modal } from "../../../../shared/ui"
import { PostForm } from "../../../../entities/post/ui"
interface PostAddModalProps {
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

export const PostAddModal = ({ isOpen, onClose, formData, onChange, onSubmit, isSubmitting }: PostAddModalProps) => (
  <Modal open={isOpen} onClose={onClose} title="새 게시물 추가">
    <PostForm
      formData={formData}
      onChange={(field, value) => onChange({ field, value })}
      submitLabel={{
        default: "게시물 추가",
        loading: "추가 중...",
      }}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  </Modal>
)
