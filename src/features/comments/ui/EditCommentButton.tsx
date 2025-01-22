import { Edit2 } from "lucide-react"

import { Button } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface EditCommentButtonProps {
  comment: Comment
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (open: boolean) => void
}

export const EditCommentButton = ({
  setSelectedComment,
  setShowEditCommentDialog,
  comment,
}: EditCommentButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedComment(comment)
        setShowEditCommentDialog(true)
      }}
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
