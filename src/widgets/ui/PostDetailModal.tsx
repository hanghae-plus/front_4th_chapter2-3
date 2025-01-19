import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../../shared/ui"
import { highlightText } from "../../shared/lib/highlightText"
import { Post } from "../../entities/post/model/types"

interface PostDetailModalProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (value: boolean) => void
  selectedPost: Post
  searchQuery: string
  children?: React.ReactNode
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  children,
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailModal
