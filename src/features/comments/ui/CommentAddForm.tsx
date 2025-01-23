import { useState } from "react"

import { useMutationAddComment } from "../../../entities/comment/model/hooks/useMutationAddComment"
import { Button, Textarea } from "../../../shared/ui"

interface CommentAddFormProps {
  onCloseDialog: () => void
  postId: number
}

export const CommentAddForm = ({ onCloseDialog, postId }: CommentAddFormProps) => {
  const [comment, setComment] = useState({ body: "", postId, userId: 1 })

  const { mutateAsync: commentAddMutation } = useMutationAddComment()

  const handleAddClick = async () => {
    await commentAddMutation(comment)
    onCloseDialog()
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={comment.body}
        onChange={(e) => setComment({ ...comment, body: e.target.value })}
      />
      <Button onClick={handleAddClick}>댓글 추가</Button>
    </div>
  )
}
