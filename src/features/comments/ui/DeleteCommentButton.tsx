import { Trash2 } from "lucide-react"

import { deleteComment } from "../../../entities/comment/api/deleteComment"
import { Button } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface DeleteCommentButtonProps {
  comment: Comment
  postId: number
}

export const DeleteCommentButton = ({ comment, postId }: DeleteCommentButtonProps) => {
  // ReactQuery로 추출 예정
  const handleDeleteCommentClick = async (commentId: number, postId: number) => {
    try {
      const response = await deleteComment(commentId)

      // setComments((prev) => ({
      //   ...prev,
      //   [postId]: prev[postId].filter((comment) => comment.id !== id),
      // }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handleDeleteCommentClick(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
