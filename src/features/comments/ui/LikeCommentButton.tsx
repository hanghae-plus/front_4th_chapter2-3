import { ThumbsUp } from "lucide-react"

import { Button } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface LikeCommentButtonProps {
  comment: Comment
  postId: number
}

export const LikeCommentButton = ({ comment, postId }: LikeCommentButtonProps) => {
  // ReactQuery로 추출 예정
  const likeComment = (commentId: number, postId: number) => {}

  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
