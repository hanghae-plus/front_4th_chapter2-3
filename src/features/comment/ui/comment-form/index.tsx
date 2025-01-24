import { Textarea, Button } from "@shared/ui"
import { useCommentStore } from "../../model/stores"

interface CommentFormProps {
  mode: "add" | "edit"
}

export const CommentForm = ({ mode }: CommentFormProps) => {
  const {
    selectedComment,
    newComment,
    setNewCommentBody,
    addComment,
    updateComment,
    selectedComment: comment,
  } = useCommentStore()

  const isEdit = mode === "edit"
  const commentBody = isEdit ? (selectedComment?.body ?? "") : newComment.body

  const handleSubmit = () => {
    if (isEdit) {
      updateComment()
    } else {
      addComment()
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={commentBody}
        onChange={(e) => {
          if (isEdit && comment) {
            useCommentStore.setState({
              selectedComment: { ...comment, body: e.target.value },
            })
          } else {
            setNewCommentBody(e.target.value)
          }
        }}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={handleSubmit}>{isEdit ? "댓글 업데이트" : "댓글 추가"}</Button>
      </div>
    </div>
  )
}
