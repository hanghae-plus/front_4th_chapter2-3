import { CommentAddForm } from "../../../features/comments/ui/CommentAddForm"
import { Dialog } from "../../../shared/ui"

import type { NewComment } from "../../../entities/comment/model/types/comments"

interface CommentAddDialogProps {
  open: boolean
  setShowAddCommentDialog: (open: boolean) => void
  newComment: NewComment
  setNewComment: (comment: NewComment) => void
}

export const CommentAddDialog = ({ open, setShowAddCommentDialog, ...rest }: CommentAddDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setShowAddCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <CommentAddForm {...rest} />
      </Dialog.Content>
    </Dialog>
  )
}
