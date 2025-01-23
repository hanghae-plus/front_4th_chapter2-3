import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface Props {
  open: boolean
  onClose: () => void
  newComment: {
    body: string
    postId: number | null
    userId: number
  }
  postId: number
  handleSubmit: (postId: number) => void
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const CommentAddDialog = ({ open, onClose, newComment, postId, handleSubmit, handleChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={handleChange} />
          <Button onClick={() => handleSubmit(postId)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
