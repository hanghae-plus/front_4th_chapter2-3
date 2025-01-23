import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { useForm } from "../../../shared/model/useForm"
import { useDialogStore } from "../../../app/model/dialog-store"
import { usePosts } from "../../../features/posts/api/usePosts"

export const PostAddDialog = () => {
  const { dialogs, onOpenChange } = useDialogStore()
  const { addPost } = usePosts()
  const { formState: newPost, handleChange, reset } = useForm({ title: "", body: "", userId: 1 })

  const handleAddPost = () => {
    addPost(newPost, {
      onSuccess: () => {
        onOpenChange("addPostDialog", false)
        reset()
      },
    })
  }

  return (
    <Dialog open={dialogs["addPostDialog"]} onOpenChange={(open: boolean) => onOpenChange("addPostDialog", open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={newPost.title} onChange={(e) => handleChange("title", e.target.value)} />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => handleChange("userId", Number(e.target.value))}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
