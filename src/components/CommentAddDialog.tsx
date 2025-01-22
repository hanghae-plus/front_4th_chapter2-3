import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Textarea } from "../shared/ui"
import { useForm } from "../hooks/useForm"
import { useDialogStore } from "../store/dialog"
import { useComments } from "../hooks/useComments"

interface Props {
  postId: number
}

export const CommentAddDialog = ({ postId }: Props) => {
  const { addComment } = useComments(postId)
  const { dialogs, onOpenChange } = useDialogStore()
  const { formState: newComment, handleChange, reset } = useForm({ body: "", postId, userId: 1 })

  const handleAddComment = async () => {
    addComment(newComment, {
      onSuccess: () => {
        onOpenChange("addCommentDialog", false)
        reset()
      },
    })
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
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
