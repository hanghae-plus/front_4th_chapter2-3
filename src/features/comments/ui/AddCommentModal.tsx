import { Button, Modal, Textarea } from "../../../shared/ui"
import { useAtom } from "jotai"
import { showAddCommentDialogAtom } from "../../../entities/modal/model/modalOpenerStore.ts"
import { newCommentAtom } from "../../../entities/comment/model/commentStore.ts"
import useComments from "../model/useComments.ts"

{/* 댓글 추가 대화상자 */}
export default function AddCommentModal() {
  const {
    newComment,
    setNewComment,
    addComment,
    showAddCommentDialog, setShowAddCommentDialog
  } = useComments();
  return (
    <Modal
      open={showAddCommentDialog}
      onOpenChange={setShowAddCommentDialog}
      title="새 댓글 추가"
    >
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={addComment}>댓글 추가</Button>
      </div>
    </Modal>
  )
}