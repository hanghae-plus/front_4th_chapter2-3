import { Input, Textarea } from "@shared/ui"

interface PostFormProps {
  title: string
  body: string
  onTitleChange: (value: string) => void
  onBodyChange: (value: string) => void
}

export const PostForm = ({ title, body, onTitleChange, onBodyChange }: PostFormProps) => (
  <div className="space-y-4">
    <Input
      placeholder="제목"
      value={title}
      onChange={(e) => {
        onTitleChange(e.target.value)
      }}
    />
    <Textarea
      placeholder="내용"
      value={body}
      onChange={(e) => {
        onBodyChange(e.target.value)
      }}
    />
  </div>
)
