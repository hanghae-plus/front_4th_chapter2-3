import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { Comment } from "../types"

interface ModifyCommentProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedComment: Comment | null
  setSelectedComment: (value: React.SetStateAction<Comment | null>) => void
  updateComment: () => Promise<void>
}
const ModifyComment: React.FC<ModifyCommentProps> = ({
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

export default ModifyComment
