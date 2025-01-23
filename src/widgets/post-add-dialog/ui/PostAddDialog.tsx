import { useDialog } from "../../../app/model/DialogProvider"
import { PostAddForm } from "../../../features/post/ui/PostAddForm"
import { Dialog } from "../../../shared/ui"

interface PostAddDialogProps {
  open: boolean
  dialogId: number
}

export const PostAddDialog = ({ open, dialogId }: PostAddDialogProps) => {
  const { closeDialog } = useDialog()

  const handleCloseDialog = () => {
    closeDialog(dialogId)
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <PostAddForm onCloseDialog={handleCloseDialog} />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
