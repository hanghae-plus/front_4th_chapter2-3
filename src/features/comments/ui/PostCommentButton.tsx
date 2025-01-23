import { Plus } from "lucide-react"

import { useDialog } from "../../../app/model/DialogProvider"
import { Button } from "../../../shared/ui"
import { CommentAddDialog } from "../../../widgets/comment-add-dialog/ui/CommentAddDialog"

interface PostCommentButtonProps {
  postId: number
}

export const PostCommentButton = ({ postId }: PostCommentButtonProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = () => {
    openDialog(CommentAddDialog, { open: true, postId })
  }

  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button size="sm" onClick={handleOpenModal}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  )
}
