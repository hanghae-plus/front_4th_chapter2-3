import { Dialog, DialogContent, DialogTitle, DialogHeader, Textarea, Button } from "../../shared/ui"
import { Comment } from "../../entities/post/model/types"

interface CommentEditModalProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (value: boolean) => void
  selectedComment: Comment
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  updateComment: () => void
}

const CommentEditModal: React.FC<CommentEditModalProps> = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}) => {
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentEditModal
