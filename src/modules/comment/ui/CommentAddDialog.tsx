import { CommentAddForm } from "@/features/comment/ui/CommentAddForm"
import { useDialog } from "@/features/@dialog/model/useDialog.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export function CommentAddDialog() {
  const { showAddCommentDialog, setShowAddCommentDialog } = useDialog()
  const isOpen = showAddCommentDialog !== null

  function handleClose() {
    setShowAddCommentDialog(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <CommentAddForm />
      </DialogContent>
    </Dialog>
  )
}
