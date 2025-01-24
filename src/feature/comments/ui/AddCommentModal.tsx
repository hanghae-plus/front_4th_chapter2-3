import { useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import useComments from "../model/useComments"
import { CommentForm } from "../../../entity/comment/model/types"

type AddCommentModalProps = {
  postId: number
}
function AddCommentModal({ postId }: AddCommentModalProps) {
  const { addComment } = useComments()
  const [newComment, setNewComment] = useState<CommentForm>({ body: "", postId, userId: 1 })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
      </div>
    </DialogContent>
  )
}

export { AddCommentModal }
