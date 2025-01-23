import { useState } from "react"

import { useQueryMutationUpdateComment } from "../../../entities/comment/model/hooks/useMutationUpdateComment"
import { Button, Textarea } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentEditFormProps {
  comment: Comment
  handleClose: () => void
}

export const CommentEditForm = ({ comment, handleClose }: CommentEditFormProps) => {
  const [currentComment, setCurrentComment] = useState(comment)

  const { mutateAsync: commentUpdateMutation } = useQueryMutationUpdateComment()

  const handleUpdateButtonClick = async () => {
    await commentUpdateMutation(currentComment)
    handleClose()
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={currentComment?.body || ""}
        onChange={(e) => setCurrentComment({ ...currentComment, body: e.target.value })}
      />
      <Button onClick={handleUpdateButtonClick}>댓글 업데이트</Button>
    </div>
  )
}
