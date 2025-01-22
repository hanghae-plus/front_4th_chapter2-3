import { Trash2 } from "lucide-react"

import { Button } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface DeleteCommentButtonProps {
  comment: Comment
  postId: number
}

export const DeleteCommentButton = ({ comment, postId }: DeleteCommentButtonProps) => {
  // ReactQuery로 추출 예정
  const deleteComment = (commentId: number, postId: number) => {}

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
