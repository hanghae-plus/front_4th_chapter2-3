import { Textarea, Button } from "@shared/ui"
import { Comment } from "@entities/comment/model"

interface CommentFormProps {
  mode: "add" | "edit"
  comment?: Comment | null
  onBodyChange: (value: string) => void
  onSubmit: () => void
}

export const CommentForm = ({ mode, comment, onBodyChange, onSubmit }: CommentFormProps) => {
  const isEdit = mode === "edit"

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={isEdit ? (comment?.body ?? "") : ""}
        onChange={(e) => onBodyChange(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onSubmit}>{isEdit ? "댓글 업데이트" : "댓글 추가"}</Button>
      </div>
    </div>
  )
}
