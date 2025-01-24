import { Button, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@shared/ui"
import { useState } from "react"
import { useAddPostMutation } from "@features/post/model"
import { RequestPost } from "@entities/post/types"
import { useModalStore } from "@shared/model"

export function PostAdd() {
  const [newPost, setNewPost] = useState<RequestPost>({ title: "", body: "", userId: 1 })

  const { mutate: addPost } = useAddPostMutation()
  const { closeModal } = useModalStore()

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value })
  }
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, body: e.target.value })
  }
  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, userId: Number(e.target.value) })
  }
  const handleAddPost = () => {
    if (!newPost) return
    addPost(newPost)
    closeModal()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 게시물 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input placeholder="제목" value={newPost.title} onChange={handleChangeTitle} />
        <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={handleChangeBody} />
        <Input type="number" placeholder="사용자 ID" value={newPost.userId} onChange={handleChangeId} />
        <Button onClick={handleAddPost}>게시물 추가</Button>
      </div>
    </DialogContent>
  )
}
