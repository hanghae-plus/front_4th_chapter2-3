import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Textarea } from "../shared/ui"
import { addComment as addCommentFunction } from "../api/comment"
import { useForm } from "../hooks/useForm"
import { useDialogStore } from "../store/dialog"

interface Props {
  postId?: number
}

export const CommentAddDialog = ({ postId }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()
  const {
    formState: newComment,
    handleChange,
    reset,
  } = useForm({ body: "", postId: postId ? postId : null, userId: 1 })

  const addComment = async () => {
    try {
      const data = await addCommentFunction(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      onOpenChange("addCommentDialog", false)
      reset()
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={dialogs["addCommentDialog"]} onOpenChange={(open: boolean) => onOpenChange("addCommentDialog", open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
