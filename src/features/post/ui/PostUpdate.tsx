import { Post } from "@entities/post/types"
import { useUpdatePostMutation } from "@features/post/model"
import { useState } from "react"
import { useModalStore } from "@shared/model"
import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"

interface PostUpdateProps {
  post: Post
}

export function PostUpdate(props: PostUpdateProps) {
  const { post } = props
  const [selectedPost, setSelectedPost] = useState<Post>(post)
  const { mutate: updatePost } = useUpdatePostMutation()
  const { onClose } = useModalStore()

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPost({ ...selectedPost, title: e.target.value })
  }
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedPost({ ...selectedPost, body: e.target.value })
  }
  const handleUpdatePost = () => {
    updatePost(selectedPost)
    onClose()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input placeholder="제목" value={selectedPost?.title || ""} onChange={handleChangeTitle} />
        <Textarea rows={15} placeholder="내용" value={selectedPost?.body || ""} onChange={handleChangeContent} />
        <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  )
}
