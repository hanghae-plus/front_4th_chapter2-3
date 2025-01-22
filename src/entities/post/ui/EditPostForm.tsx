import { Button, Input, Textarea } from "../../../shared/ui"
import { Post } from "../model/types"

interface EditPostFormProps {
  post?: Post
  onChange: (field: string, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const EditPostForm = ({ post, onChange, onSubmit, isSubmitting }: EditPostFormProps) => {
  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={post?.title || ""} onChange={(e) => onChange("title", e.target.value)} />
      <Textarea
        rows={15}
        placeholder="내용"
        value={post?.body || ""}
        onChange={(e) => onChange("body", e.target.value)}
      />
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "업데이트 중..." : "게시물 업데이트"}
      </Button>
    </div>
  )
}
