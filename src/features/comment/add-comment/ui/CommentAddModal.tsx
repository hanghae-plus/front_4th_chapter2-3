import { DialogContent, DialogTitle } from "@radix-ui/react-dialog"

import { Modal, DialogHeader, Textarea, Button } from "../../../../shared/ui"

interface CommentAddModalProps {
  post?: Comment
  isOpen: boolean
  body: string | null
  onClose: () => void
  onChange: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const CommentAddModal = ({ isOpen, onClose, body, onChange, onSubmit, isSubmitting }: CommentAddModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
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
