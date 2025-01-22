import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Textarea } from "../shared/ui"
import { updateComment as updateCommentFunction } from "../api/comment"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"

interface Props {
  selectedComment: Comment | null
  onSelectComment: (comment: Comment) => void
}

export const CommentUpdateDialog = ({ selectedComment, onSelectComment }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()
  const updateComment = async () => {
    try {
      const data = await updateCommentFunction(selectedComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      onOpenChange("editCommentDialog", false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }
  return (
    <Dialog
      open={dialogs["editCommentDialog"]}
      onOpenChange={(open: boolean) => onOpenChange("editCommentDialog", open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => {
              if (selectedComment) {
                onSelectComment({ ...selectedComment, body: e.target.value })
              }
            }}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
