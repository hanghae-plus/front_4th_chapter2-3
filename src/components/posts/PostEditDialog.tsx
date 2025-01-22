import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { Post } from "../../types/posts"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  onUpdate: (post: Post) => void
}

export const PostEditDialog = ({ open, onOpenChange, post, onUpdate }: PostEditDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={post.title} onChange={(e) => onUpdate({ ...post, title: e.target.value })} />
          <Textarea
            placeholder="내용"
            value={post.body}
            onChange={(e) => onUpdate({ ...post, body: e.target.value })}
          />
          <Button onClick={() => onUpdate(post)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
