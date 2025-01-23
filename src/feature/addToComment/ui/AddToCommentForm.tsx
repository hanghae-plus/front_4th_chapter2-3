import React, { useState } from "react"
import { Button, Textarea } from "../../../shared/ui"
import { newComment } from "../../../entities/comment/model/type"
import { useAddToComment } from "../model/useAddToComment"

interface AddToCommentFormProps {
  onClose: () => void
}

export const AddToCommentForm: React.FC<AddToCommentFormProps> = ({ onClose }) => {
  const [newComment, setNewComment] = useState<newComment>({
    body: "",
    postId: null,
    userId: 1,
  })

  const handleAddComment = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAddToComment({ ...newComment, id: Date.now() })
    setNewComment({ body: "", postId: null, userId: 1 })
    onClose()
  }
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleAddComment}>댓글 추가</Button>
    </div>
  )
}
