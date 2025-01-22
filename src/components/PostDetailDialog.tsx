import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"
import { PostWithUser } from "../types/post"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"

interface Props {
  selectedPost: PostWithUser | null
  onSelectComment: (comment: Comment) => void
  searchQuery: string
}
export const PostDetailDialog = ({ selectedPost, onSelectComment, searchQuery }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()

  return (
    <Dialog open={dialogs["postDetailDialog"]} onOpenChange={(open: boolean) => onOpenChange("postDetailDialog", open)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments postId={selectedPost?.id} onSelectComment={onSelectComment} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
