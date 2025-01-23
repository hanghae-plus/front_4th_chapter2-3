import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Comments } from "../../../features/comments/ui/Comments"
import { highlightText } from "../../../app/lib/html"
import { Post } from "../../../entities/post/model/type"
import { Comment } from "../../../entities/comment/model/type"
import { useDialogStore } from "../../../app/model/dialog-store"
import { useParamsStore } from "../../../app/model/params-store"

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
          <p>{highlightText(searchQuery, selectedPost?.body)}</p>
          <Comments postId={selectedPost?.id} onSelectComment={onSelectComment} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
