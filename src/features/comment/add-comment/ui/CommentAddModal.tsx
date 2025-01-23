import { Modal, DialogHeader, Textarea, Button, DialogContent, DialogTitle } from "../../../../shared/ui"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

interface CommentAddModalProps {
  post?: Comment
  body: string | null
  onChange: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const CommentAddModal = ({ body, onChange, onSubmit, isSubmitting }: CommentAddModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("addComment")} onClose={() => onClose("addComment")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body ?? ""} onChange={(e) => onChange(e.target.value)} />
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "추가 중..." : "댓글 추가"}
          </Button>
        </div>
      </DialogContent>
    </Modal>
  )
}
