import { Button, Input, Textarea } from "../../../shared/ui"

interface AddPostFormProps {
  formData: {
    title: string
    body: string
    userId: number
  }
  onChange: (data: { field: string; value: string | number }) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export const AddPostForm = ({ formData, onChange, onSubmit, isSubmitting }: AddPostFormProps) => (
  <div className="space-y-4">
    <Input
      placeholder="제목"
      value={formData.title}
      onChange={(e) => onChange({ field: "title", value: e.target.value })}
    />
    <Textarea
      rows={30}
      placeholder="내용"
      value={formData.body}
      onChange={(e) => onChange({ field: "body", value: e.target.value })}
    />
    <Input
      type="number"
      placeholder="사용자 ID"
      value={formData.userId}
      onChange={(e) => onChange({ field: "userId", value: Number(e.target.value) })}
    />
    <Button onClick={onSubmit} disabled={isSubmitting}>
      {isSubmitting ? "추가 중..." : "게시물 추가"}
    </Button>
  </div>
)
