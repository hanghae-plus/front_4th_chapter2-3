import { useAtom, useSetAtom } from "jotai"

import { useAddCommentMutation } from "../api"
import { newCommentAtom } from "../model"
import { commentsAtom } from "../../../entities/comment/model"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Button, Textarea } from "../../../shared/ui/common"
import { dialogAtomFamily } from "../../../shared/model"

export const AddCommentDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(dialogAtomFamily("add-comment"))
  const setComments = useSetAtom(commentsAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)

  const addCommentMutation = useAddCommentMutation({
    onSuccess: (newComment) => {
      setComments((prev) => [...prev, newComment])
      setNewComment({ body: "", postId: -1, userId: 1 })
      setShowAddCommentDialog(false)
    },
    onError: (error) => {
      new Error(`댓글 추가 오류: ${error.message}`)
    },
  })

  const addComment = () => {
    addCommentMutation.mutate(newComment)
  }

  return (
    <DialogContainer open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
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
    </DialogContainer>
  )
}
