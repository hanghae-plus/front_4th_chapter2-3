import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"
import { Post } from "../types/post"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"
import { useParamsStore } from "../store/params"

interface Props {
  selectedPost: Post
  onSelectComment: (comment: Comment) => void
}
export const PostDetailDialog = ({ selectedPost, onSelectComment }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()
  const { searchQuery } = useParamsStore()

  return (
    <Dialog open={dialogs["postDetailDialog"]} onOpenChange={(open: boolean) => onOpenChange("postDetailDialog", open)}>
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
