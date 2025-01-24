import { CommentEditForm } from "@/features/comment/ui/CommentEditForm"
import { useDialog } from "@/features/@dialog/model/useDialog.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export function CommentEditDialog() {
  const { showEditCommentDialog, setShowEditCommentDialog } = useDialog()

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <CommentEditForm />
      </DialogContent>
    </Dialog>
  )
}
