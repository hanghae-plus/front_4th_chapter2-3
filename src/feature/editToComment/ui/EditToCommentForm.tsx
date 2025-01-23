import React, { useState } from "react"
import { Comment } from "../../../entities/comment/model/type"
import { Button, Textarea } from "../../../shared/ui"
import { useEditToComment } from "../model/useEditToComment"

interface EditToCommentFormProps {
  comment: Comment
  onClose: () => void
}

export const EditToCommentForm: React.FC<EditToCommentFormProps> = ({ comment, onClose }) => {
  const { editComment } = useEditToComment()
  const [editedComment, setEditedComment] = useState<Comment>(comment)

  const updateComment = () => {
    editComment(editedComment)
    onClose()
  }
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={editedComment?.body || ""}
        onChange={(e) => setEditedComment({ ...editedComment, body: e.target.value })}
      />
      <Button onClick={updateComment}>댓글 업데이트</Button>
    </div>
  )
}
