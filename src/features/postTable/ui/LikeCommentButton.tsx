import { Button } from "../../../shared/ui"
import { ThumbsUp } from "lucide-react"
import { useLikeComment } from "../model/useLikeComment"
import { Comment } from "../../../entities/comments/model/types"
import { Post } from "../../../entities/post/model/types"

export const LikeCommentButton = ({ comment, postId }: { comment: Comment; postId: Post["id"] }) => {
  const { onLikeComment } = useLikeComment(postId)

  return (
    <Button variant="ghost" size="sm" onClick={() => onLikeComment(comment)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
