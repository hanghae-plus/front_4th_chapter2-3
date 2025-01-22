import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Textarea } from "../shared/ui"
import { updateComment as updateCommentFunction } from "../api/comment"
import { DialogComponentProps } from "../hooks/useDialog"
import { Comment } from "../types/comment"

interface Props extends DialogComponentProps {
  selectedComment: Comment | null
  onSelectComment: (comment: Comment) => void
}

export const CommentUpdateDialog = ({ open, onOpenChange, selectedComment, onSelectComment }: Props) => {
  const updateComment = async () => {
    try {
      const data = await updateCommentFunction(selectedComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      onOpenChange(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
