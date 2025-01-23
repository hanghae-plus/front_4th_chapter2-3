import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { PostAddDialog } from "../../../widgets/post-add-dialog/ui/PostAddDialog"

export const PostAddDialogOpenButton = () => {
  const { openDialog } = useDialog()

  const handleOpenModal = () => {
    openDialog(PostAddDialog, { open: true })
  }

  return <Button onClick={handleOpenModal}>게시물 추가</Button>
}
