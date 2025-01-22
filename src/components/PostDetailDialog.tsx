import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"
import { DialogType } from "../hooks/useDialog"
import { PostWithUser } from "../types/post"
import { Comment } from "../types/comment"

interface Props {
  selectedPost: PostWithUser | null
  onSelectComment: (comment: Comment) => void
  open: boolean
  onOpenChange: (dialogType: DialogType, open: boolean) => void
  searchQuery: string
}
export const PostDetailDialog = ({ selectedPost, open, onOpenChange, onSelectComment, searchQuery }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(open: boolean) => onOpenChange("postDetailDialog", open)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments
            postId={selectedPost?.id}
            onSelectComment={onSelectComment}
            onOpenChange={onOpenChange}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
