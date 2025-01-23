import { Button } from "@/shared"
import { Loader, ThumbsUp } from "lucide-react"
import { useMutationLikeComment } from "../model/use-mutation-like-comment"

interface CommentLikeButtonProps {
  postId?: number
  commentId: number
  likes: number
}

function CommentLikeButton(props: CommentLikeButtonProps) {
  const { commentId, postId, likes } = props

  const { likeComment, isPending } = useMutationLikeComment({ postId, commentId, likes })

  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment()} disabled={isPending}>
      <ThumbsUp className="w-3 h-3" />
      {isPending ? <Loader className="ml-1 w-3 h-3 animate-spin" /> : <span className="ml-1 text-xs">{likes}</span>}
    </Button>
  )
}

export { CommentLikeButton }
