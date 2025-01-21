import { Textarea } from "@shared/ui"
import { Comment } from "@entities/comment/model"
import { DialogActions } from "@features/common/dialog/ui"

interface CommentFormProps {
  mode: "add" | "edit"
  comment?: Comment | null
  onBodyChange: (value: string) => void
  onSubmit: () => void
}

export const CommentForm = ({
  mode,
  comment,
  onBodyChange,
  onSubmit,
}: CommentFormProps) => {
  const isEdit = mode === "edit"

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={isEdit ? (comment?.body ?? "") : ""}
        onChange={(e) => onBodyChange(e.target.value)}
      />
      <DialogActions onSubmit={onSubmit} submitText={isEdit ? "댓글 업데이트" : "댓글 추가"} />
    </div>
  )
}