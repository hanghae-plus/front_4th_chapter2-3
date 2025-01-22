import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface AddCommentDialogProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      body: string
      postId: number | null
      userId: number
    }>
  >
  newComment: {
    body: string
    postId: number | null
    userId: number
  }
  addComment: () => Promise<void>
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  setNewComment,
  newComment,
  addComment,
}) => {
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />

          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
