import { useDialog } from "../../../app/model/DialogProvider"
import { CommentEditForm } from "../../../features/comments/ui/CommentEditForm"
import { Dialog } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentEditDialogProps {
  open: boolean
  comment: Comment
  dialogId: number
}

export const CommentEditDialog = ({ open, comment, dialogId }: CommentEditDialogProps) => {
  const { closeDialog } = useDialog()

  return (
    <Dialog open={open} onOpenChange={() => closeDialog(dialogId)}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <CommentEditForm comment={comment} />
      </Dialog.Content>
    </Dialog>
  )
}
