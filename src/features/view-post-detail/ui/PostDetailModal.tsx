import { Modal } from "../../../shared/ui/modal/Modal"
import { Post } from "../../../entities/post/model/types"
import { Comment } from "../../../entities/comment/model/types"
import { highlightText } from "../../../shared/lib/utils/highlight-text"
import { DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentList } from "../../../entities/comment/ui"

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post?: Post
  comments?: Comment[]
  searchQuery?: string
  onClickAddButton: () => void
  onClickEditButton: (id: number, body: string) => void
  onClickDeleteButton: (id: number, postId: number) => void
  onClickLikeButton: (id: number, postId: number) => void
}

export const PostDetailModal = ({
  isOpen,
  comments,
  onClose,
  post,
  searchQuery = "",
  onClickAddButton,
  onClickEditButton,
  onClickDeleteButton,
  onClickLikeButton,
}: PostDetailModalProps) => (
  <Modal open={isOpen} onClose={onClose}>
    <DialogHeader>
      <DialogTitle>{highlightText(post?.title ?? "", searchQuery)}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div className="overflow-hidden">
        <p className="break-words">{highlightText(post?.body ?? "", searchQuery)}</p>

        {post?.id && (
          <CommentList
            comments={comments || []}
            postId={post.id}
            onClickAddButton={onClickAddButton}
            onClickEditButton={onClickEditButton}
            onClickDeleteButton={onClickDeleteButton}
            onClickLikeButton={onClickLikeButton}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  </Modal>
)
