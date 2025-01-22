import { CommentEditForm } from "../../../features/comments/ui/CommentEditForm"
import { Dialog } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentEditDialogProps {
  open: boolean
  setShowEditCommentDialog: (open: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment) => void
}

export const CommentEditDialog = ({
  open,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
}: CommentEditDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setShowEditCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        {selectedComment && (
          <CommentEditForm selectedComment={selectedComment} setSelectedComment={setSelectedComment} />
        )}
      </Dialog.Content>
    </Dialog>
  )
}
