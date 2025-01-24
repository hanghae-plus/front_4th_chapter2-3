import { NewComment } from "../../entities/comment/model/types"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"

interface CommentAddModalProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (value: boolean) => void
  newComment: NewComment
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  addComment: () => void
}

const CommentAddModal: React.FC<CommentAddModalProps> = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
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

export default CommentAddModal
