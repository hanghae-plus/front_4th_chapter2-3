import { type Comment } from "@/entities/comment/model"
import { useComment } from "@/features/comment/model/useComment"
import { useDialog } from "@/features/@dialog/model/useDialog"
import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"

export function CommentShowEditDialogButton({ comment }: { comment: Comment }) {
  const { setSelectedComment } = useComment()
  const { setShowEditCommentDialog } = useDialog()

  function handleEditCommentDialogOpen() {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleEditCommentDialogOpen}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
