import { type Comment } from "@/entities/comment/model"
import { Button } from "@/shared/ui"
import { Trash2 } from "lucide-react"
import { useMutationCommentDelete } from "../api/useMutationCommentDelete"

export function CommentDeleteButton({ comment }: { comment: Comment }) {
  const { mutate: deleteComment } = useMutationCommentDelete()

  async function handleCommentDelete() {
    deleteComment(comment)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCommentDelete}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
