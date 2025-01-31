import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@shared/ui"
import { Post } from "../model/types"

interface Props {
  open: boolean
  onClose: () => void
  editPost?: Post
  handleChange: (field: keyof Post) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: () => void
}

export const PostEditDialog = ({ open, onClose, editPost, handleChange, handleSubmit }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={editPost?.title || ""} onChange={handleChange("title")} />
          <Textarea rows={15} placeholder="내용" value={editPost?.body || ""} onChange={handleChange("body")} />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
