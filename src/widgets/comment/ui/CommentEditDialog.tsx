import { Comment } from "@/entities/comment/model/types"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"

interface CommentEditDialogProps {
  selectedComment: Comment | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
  setSelectedComment: (comment: Comment) => void
  updateComment: () => void
}

export const CommentEditDialog = ({
  selectedComment,
  open,
  onOpenChange,
  setSelectedComment,
  updateComment,
}: CommentEditDialogProps) => {
  return (
    selectedComment && (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment.body}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}
