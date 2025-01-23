import { Modal } from "../../../../shared/ui"
import { Post } from "../../../../entities/post/model"
import { PostForm } from "../../../../entities/post/ui"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

interface PostEditModalProps {
  post?: Post
  onChange: (field: string, value: string | number) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const PostEditModal = ({ post, onChange, onSubmit, isSubmitting }: PostEditModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("editPost")} onClose={() => onClose("editPost")} title="게시물 수정">
      <PostForm
        formData={{
          title: post?.title ?? "",
          body: post?.body ?? "",
          userId: post?.userId ?? 0,
        }}
        submitLabel={{
          default: "게시물 수정",
          loading: "수정 중...",
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Modal>
  )
}
