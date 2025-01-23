import { useDialog } from "../../../app/model/DialogProvider"
import { CommentAddForm } from "../../../features/comments/ui/CommentAddForm"
import { Dialog } from "../../../shared/ui"

interface CommentAddDialogProps {
  open: boolean
  postId: number
  dialogId: number
}

export const CommentAddDialog = ({ open, postId, dialogId }: CommentAddDialogProps) => {
  const { closeDialog } = useDialog()

  const handleCloseButtonClick = () => {
    closeDialog(dialogId)
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseButtonClick}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <CommentAddForm oneCloseButtonClick={handleCloseButtonClick} postId={postId} />
      </Dialog.Content>
    </Dialog>
  )
}
