import { useState } from "react"
import { useAddCommentMutation } from "@features/post/model"
import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"

interface CommentAddProps {
  postId: number
}

export function CommentAdd(props: CommentAddProps) {
  const { postId } = props
  const [newComment, setNewComment] = useState({ body: "", postId: postId, userId: 1 })
  const { mutate: addComment } = useAddCommentMutation()

  const handleAddComment = () => {
    addComment(newComment)
  }

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
        <Button onClick={handleAddComment}>댓글 추가</Button>
      </div>
    </DialogContent>
  )
}
