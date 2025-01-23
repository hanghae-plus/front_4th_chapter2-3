import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { Comment } from "../model/types"

interface Props {
  open: boolean
  onClose: () => void
  selectedComment: Comment | null
  handleSubmit: () => void
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const CommentEditDialog = ({ open, onClose, selectedComment, handleSubmit, handleChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={handleChange} />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
