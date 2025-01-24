import { Button } from "../../../shared/ui"
import { Trash2 } from "lucide-react"
import { useDeleteComment } from "../model/useDeleteComment"
import { Comment } from "../../../entities/comments/model/types"
import { Post } from "../../../entities/post/model/types"

export const DeleteCommentButton = ({ comment, postId }: { comment: Comment; postId: Post["id"] }) => {
  const { onDeleteComment } = useDeleteComment(postId)

  return (
    <Button variant="ghost" size="sm" onClick={() => onDeleteComment(comment.id)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
