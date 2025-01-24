import { Dialog, Textarea, Button } from "@shared/ui"
import { useCommentStore } from "@features/comment/model/stores"

interface CommentFormDialogProps {
  mode: "add" | "edit"
}

export const CommentFormDialog = ({ mode }: CommentFormDialogProps) => {
  const {
    selectedComment,
    newComment,
    showAddCommentDialog,
    showEditCommentDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setNewCommentBody,
    addComment,
    updateComment,
  } = useCommentStore()

  const isEdit = mode === "edit"
  const isOpen = isEdit ? showEditCommentDialog : showAddCommentDialog

  const handleOpenChange = (open: boolean) => {
    if (isEdit) {
      setShowEditCommentDialog(open)
    } else {
      setShowAddCommentDialog(open)
    }
  }

  const handleBodyChange = (value: string) => {
    if (isEdit && selectedComment) {
      useCommentStore.setState({
        selectedComment: { ...selectedComment, body: value },
      })
    } else {
      setNewCommentBody(value)
    }
  }

  const handleSubmit = () => {
    if (isEdit) {
      updateComment()
    } else {
      addComment()
    }
  }

  const commentBody = isEdit ? selectedComment?.body : newComment.body

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{isEdit ? "댓글 수정" : "새 댓글 추가"}</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={commentBody ?? ""}
            onChange={(e) => handleBodyChange(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleSubmit}>{isEdit ? "댓글 업데이트" : "댓글 추가"}</Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
