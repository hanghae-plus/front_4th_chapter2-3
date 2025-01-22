import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"
import { DialogComponentProps } from "../hooks/useDialog"
import { PostWithUser } from "../types/post"
import { Comment } from "../types/comment"

interface Props extends DialogComponentProps {
  selectedPost: PostWithUser | null
  onSelectComment: (comment: Comment) => void
}

export const PostDetailDialog = ({ selectedPost, open, onOpenChange, onSelectComment }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments postId={selectedPost?.id} onSelectComment={onSelectComment} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
