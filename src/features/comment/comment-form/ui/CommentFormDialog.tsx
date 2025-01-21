import { Dialog, Textarea } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { DialogActions } from "@features/common/dialog/ui/DialogActions"

interface CommentFormDialogProps {
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  comment?: Comment | null
  onBodyChange: (value: string) => void
  onSubmit: () => void
}

export const CommentFormDialog = ({
  mode,
  open,
  onOpenChange,
  comment,
  onBodyChange,
  onSubmit,
}: CommentFormDialogProps) => {
  const isEdit = mode === "edit"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{isEdit ? "댓글 수정" : "새 댓글 추가"}</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={isEdit ? (comment?.body ?? "") : ""}
            onChange={(e) => onBodyChange(e.target.value)}
          />
          <DialogActions onSubmit={onSubmit} submitText={isEdit ? "댓글 업데이트" : "댓글 추가"} />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
