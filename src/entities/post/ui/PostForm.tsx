import { Button, Input, Textarea } from "../../../shared/ui"

interface PostFormData {
  title: string
  body: string
  userId?: number
}

interface PostFormProps {
  formData: PostFormData
  onChange: (field: string, value: string | number) => void
  onSubmit: () => void
  isSubmitting: boolean
  submitLabel: {
    default: string
    loading: string
  }
  showUserId?: boolean
}

export const PostForm = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
  showUserId = false,
}: PostFormProps) => (
  <div className="space-y-4">
    <Input placeholder="제목" value={formData.title} onChange={(e) => onChange("title", e.target.value)} />
    <Textarea rows={15} placeholder="내용" value={formData.body} onChange={(e) => onChange("body", e.target.value)} />
    {showUserId && (
      <Input
        type="number"
        placeholder="사용자 ID"
        value={formData.userId}
        onChange={(e) => onChange("userId", Number(e.target.value))}
      />
    )}
    <Button onClick={onSubmit} disabled={isSubmitting}>
      {isSubmitting ? submitLabel.loading : submitLabel.default}
    </Button>
  </div>
)
