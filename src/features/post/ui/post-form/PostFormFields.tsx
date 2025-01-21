import { Input, Textarea } from "@shared/ui"

interface PostFormFieldsProps {
  title: string
  body: string
  onTitleChange: (value: string) => void
  onBodyChange: (value: string) => void
}

export const PostFormFields = ({ title, body, onTitleChange, onBodyChange }: PostFormFieldsProps) => (
  <div className="space-y-4">
    <Input placeholder="제목" value={title} onChange={(e) => onTitleChange(e.target.value)} />
    <Textarea placeholder="내용" value={body} onChange={(e) => onBodyChange(e.target.value)} />
  </div>
)
