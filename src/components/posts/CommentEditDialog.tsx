import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { Comment } from "@/types/posts"

interface CommentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: Comment | null
  onUpdate: (comment: Comment) => void
}

export const CommentEditDialog = ({ open, onOpenChange, comment, onUpdate }: CommentEditDialogProps) => {
  if (!comment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment.body}
            onChange={(e) => onUpdate({ ...comment, body: e.target.value })}
          />
          <Button onClick={() => onUpdate(comment)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
