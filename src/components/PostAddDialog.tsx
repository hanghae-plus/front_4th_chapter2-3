import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Input, Textarea } from "../shared/ui"
import { addPost as addPostFunction } from "../api/post"
import { useForm } from "../hooks/useForm"
import { useDialogStore } from "../store/dialog"

export const PostAddDialog = () => {
  const { dialogs, onOpenChange } = useDialogStore()
  const { formState: newPost, handleChange, reset } = useForm({ title: "", body: "", userId: 1 })

  const addPost = async () => {
    try {
      const data = await addPostFunction(newPost)
      setPosts([data, ...posts])
      onOpenChange("addPostDialog", false)
      reset()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
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
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
