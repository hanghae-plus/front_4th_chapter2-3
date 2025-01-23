import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "@shared/ui"
import { Comment } from "@entities/comment/types"
import { useState } from "react"
import { useUpdateCommentMutation } from "@features/comment/model"
import { useModalStore } from "@shared/model"

interface CommentUpdateProps {
  comment: Comment
}

export function CommentUpdate(props: CommentUpdateProps) {
  const { comment } = props
  const [commentBody, setCommentBody] = useState(comment.body)
  const { mutate: updateCommentMutation } = useUpdateCommentMutation()
  const { closeModal } = useModalStore()

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value)
  }
  const handleUpdateComment = (comment: Comment) => {
    updateCommentMutation(comment)
    closeModal()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea placeholder="댓글 내용" value={commentBody} onChange={handleCommentBodyChange} />
        <Button onClick={() => handleUpdateComment(comment)}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  )
}
