import { Edit2 } from "lucide-react"

import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { CommentEditDialog } from "../../../widgets/comment-edit-dialog/ui/CommentEditDialog"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface EditCommentButtonProps {
  comment: Comment
}

export const EditCommentButton = ({ comment }: EditCommentButtonProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = (comment: Comment) => {
    openDialog(CommentEditDialog, {
      open: true,
      comment,
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleOpenModal(comment)
      }}
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
