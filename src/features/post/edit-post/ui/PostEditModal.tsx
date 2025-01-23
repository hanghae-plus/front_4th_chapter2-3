import { Modal } from "../../../../shared/ui"
import { Post } from "../../../../entities/post/model"
import { PostForm } from "../../../../entities/post/ui"

interface PostEditModalProps {
  post?: Post
  isOpen: boolean
  onClose: () => void
  onChange: (field: string, value: string | number) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const PostEditModal = ({ post, isOpen, onClose, onChange, onSubmit, isSubmitting }: PostEditModalProps) => (
  <Modal open={isOpen} onClose={onClose} title="게시물 수정">
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
