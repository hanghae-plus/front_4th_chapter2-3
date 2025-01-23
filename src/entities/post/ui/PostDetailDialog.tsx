import { highlightText } from "../../../shared/lib/highlightText"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Post } from "../model/types"

interface Props {
  open: boolean
  onClose: () => void
  post?: Post
  searchQuery?: string
  renderComments: (postId: Post["id"]) => React.ReactNode
}

export const PostDetailDialog = ({ open, onClose, post, searchQuery = "", renderComments }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post?.title && highlightText(post?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{post?.body && highlightText(post?.body, searchQuery)}</p>
          {post?.id && renderComments(post?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}
