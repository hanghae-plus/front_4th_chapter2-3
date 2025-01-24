import { PostId } from "@/entities/post/model"
import { useDialog } from "@/features/@dialog/model/useDialog"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

export function CommentAddButton({ postId }: { postId: PostId }) {
  const { setShowAddCommentDialog } = useDialog()

  function handleAddCommentDialogOpen() {
    setShowAddCommentDialog({ postId })
  }

  return (
    <Button size="sm" onClick={handleAddCommentDialogOpen}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
