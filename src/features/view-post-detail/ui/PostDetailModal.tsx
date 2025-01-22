import { Modal } from "../../../shared/ui/modal/Modal"
import { Post } from "../../../entities/post/model/types"
import { Comment } from "../../../entities/comment/model/types"
import { highlightText } from "../../../shared/lib/utils/highlight-text"
import { DialogHeader, DialogTitle } from "../../../shared/ui"

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post?: Post
  comments?: Comment[]
  searchQuery?: string
  renderComments: () => React.ReactNode
}

export const PostDetailModal = ({ isOpen, onClose, post, searchQuery = "", renderComments }: PostDetailModalProps) => (
  <Modal open={isOpen} onClose={onClose}>
    <DialogHeader>
      <DialogTitle>{highlightText(post?.title ?? "", searchQuery)}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div className="overflow-hidden">
        <p className="break-words">{highlightText(post?.body ?? "", searchQuery)}</p>
        {renderComments()}
      </div>
    </div>
  </Modal>
)
