import { Button, DialogContent, DialogHeader, DialogTitle, Modal, Textarea } from "../../../../shared/ui"
import { Comment } from "../../../../entities/comment/model"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

interface CommentEditModalProps {
  post?: Comment
  body: string | null
  onChange: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const CommentEditModal = ({ body, onChange, onSubmit, isSubmitting }: CommentEditModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("editComment")} onClose={() => onClose("editComment")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body ?? ""} onChange={(e) => onChange(e.target.value)} />
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "업데이트 중..." : "댓글 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Modal>
  )
}
