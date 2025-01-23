import { Modal } from "../../../../shared/ui"
import { PostForm } from "../../../../entities/post/ui"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"
interface PostAddModalProps {
  formData: {
    title: string
    body: string
    userId: number
  }
  onChange: (data: { field: string; value: string | number }) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const PostAddModal = ({ formData, onChange, onSubmit, isSubmitting }: PostAddModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("addPost")} onClose={() => onClose("addPost")} title="새 게시물 추가">
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
}
