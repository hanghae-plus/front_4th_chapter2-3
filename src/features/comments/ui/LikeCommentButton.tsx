import { ThumbsUp } from "lucide-react"

import { likeComment } from "../../../entities/comment/api/likeComment"
import { Button } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface LikeCommentButtonProps {
  comment: Comment
  postId: number
}

export const LikeCommentButton = ({ comment, postId }: LikeCommentButtonProps) => {
  // ReactQuery로 추출 예정
  const handleLikeCommentClick = async (comment: Comment) => {
    // const targetComment = comments[postId].find((c) => c.id === id)
    const likeCount = comment.likes + 1

    try {
      const response = await likeComment(comment.id, likeCount)

      // setComments((prev) => ({
      //   ...prev,
      //   [postId]: prev[postId].map((comment) =>
      //     comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
      //   ),
      // }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleLikeCommentClick(comment)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
