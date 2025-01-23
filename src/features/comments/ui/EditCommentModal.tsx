import { Button, Modal, Textarea } from "../../../shared/ui"
import { useAtom } from "jotai"
import { showEditCommentDialogAtom } from "../../../entities/modal/model/modalOpenerStore.ts"
import { selectedCommentAtom } from "../../../entities/comment/model/commentStore.ts"
import useComments from "../model/useComments.ts"

{/* 댓글 수정 대화상자 */}
export default function EditCommentModal() {
  const {
    showEditCommentDialog, setShowEditCommentDialog,
    selectedComment, setSelectedComment,
    updateComment
  } = useComments();
  
  return (
    <Modal open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog} title="댓글 수정">
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={selectedComment?.body || ""}
          onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
        />
        <Button onClick={updateComment}>댓글 업데이트</Button>
      </div>
    </Modal>
  )
}
