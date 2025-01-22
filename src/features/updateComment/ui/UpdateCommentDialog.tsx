import { useAtom, useSetAtom } from "jotai"

import { useUpdateCommentMutation } from "../api"
import { updateCommentAtom } from "../model"
import { commentsAtom } from "../../../entities/comment/model"
import { dialogAtomFamily } from "../../../shared/model"
import { Button, Textarea } from "../../../shared/ui/common"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"

export const UpdateCommentDialog = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(dialogAtomFamily("update-comment"))
  const [selectedComment, setSelectedComment] = useAtom(updateCommentAtom)
  const setComments = useSetAtom(commentsAtom)

  const updateCommentMutation = useUpdateCommentMutation({
    onSuccess: (updatedComment) => {
      setComments((prev) => prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)))
      setShowEditCommentDialog(false)
    },
  })

  const updateComment = () => {
    if (!selectedComment) return

    updateCommentMutation.mutate({ comment: selectedComment, selectedCommentId: selectedComment.id })
  }

  return (
    <DialogContainer open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
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
    </DialogContainer>
  )
}
