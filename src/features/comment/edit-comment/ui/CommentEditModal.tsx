import { Button, DialogContent, DialogHeader, DialogTitle, Modal, Textarea } from "../../../../shared/ui"
import { Comment } from "../../../../entities/comment/model"

interface CommentEditModalProps {
  post?: Comment
  isOpen: boolean
  body: string | null
  onClose: () => void
  onChange: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const CommentEditModal = ({
  isOpen,
  onClose,
  body,
  onChange,
  onSubmit,
  isSubmitting,
}: CommentEditModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
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
