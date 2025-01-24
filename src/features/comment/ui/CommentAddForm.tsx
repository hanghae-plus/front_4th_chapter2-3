import { CommentInput } from "@/entities/comment/model"
import { useDialog } from "@/features/@dialog/model/useDialog.ts"
import { Button, Textarea } from "@/shared/ui"
import { useState } from "react"
import { useMutationCommentAdd } from "../api/useMutationCommentAdd"

export function CommentAddForm() {
  const { showAddCommentDialog } = useDialog()
  const postId = showAddCommentDialog?.postId
  const [newComment, setNewComment] = useState<CommentInput>({ body: "", postId, userId: 1 })

  const { mutate: addComment } = useMutationCommentAdd()
  const { setShowAddCommentDialog } = useDialog()

  function handleBodyChange(body: string) {
    setNewComment({ ...newComment, body })
  }

  async function handleCommentAdd() {
    addComment(newComment)
    setShowAddCommentDialog(null)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  return (
    <div className="space-y-4">
      <Textarea placeholder="댓글 내용" value={newComment.body} onChange={(e) => handleBodyChange(e.target.value)} />

      <Button onClick={handleCommentAdd}>댓글 추가</Button>
    </div>
  )
}
