import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../../shared/ui"
import { highlightText } from "../../shared/lib/highlightText"
import { Post } from "../../entities/post/model/types"

interface PostDetailModalProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (value: boolean) => void
  selectedPost: Post
  searchQuery: string
  renderComments: (postId: number) => React.ReactNode
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  renderComments,
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          {renderComments(selectedPost.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailModal
