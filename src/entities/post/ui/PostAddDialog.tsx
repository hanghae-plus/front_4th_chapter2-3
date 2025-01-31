import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@shared/ui"
import { Post } from "../model/types"

interface Props {
  open: boolean
  onClose: () => void
  newPost: Partial<Post>
  handleSubmit: () => void
  handleChange: (field: keyof Partial<Post>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const PostAddDialog = ({ open, onClose, newPost, handleSubmit, handleChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={newPost.title} onChange={handleChange("title")} />
          <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={handleChange("body")} />
          <Input type="number" placeholder="사용자 ID" value={newPost.userId} onChange={handleChange("userId")} />
          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
