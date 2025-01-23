import { Edit2 } from "lucide-react"

import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { PostEditDialog } from "../../../widgets/post-edit-dialog/ui/PostEditDialog"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostEditDialogOpenButtonProps {
  post: PostWithUser
}

export const PostEditDialogOpenButton = ({ post }: PostEditDialogOpenButtonProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = () => {
    openDialog(PostEditDialog, { open: true, post })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleOpenModal}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
