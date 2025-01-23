import { useDialog } from "../../../app/model/DialogProvider"
import { PostEditForm } from "../../../features/post/ui/PostEditForm"
import { Dialog } from "../../../shared/ui"

import type { Post } from "../../../entities/post/model/types/post"

interface PostEditDialogProps {
  open: boolean
  post: Post
  dialogId: number
}

export const PostEditDialog = ({ post, open, dialogId }: PostEditDialogProps) => {
  const { closeDialog } = useDialog()

  const handleCloseDialog = () => {
    closeDialog(dialogId)
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <PostEditForm post={post} onCloseDialog={handleCloseDialog} />
      </Dialog.Content>
    </Dialog>
  )
}
