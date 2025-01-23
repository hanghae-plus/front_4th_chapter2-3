import React, { useState } from "react"
import { Button, Input, Textarea } from "../../../shared/ui"
import { newPost } from "../../../entities/post/model/type"
import { useAddToPost } from "../model/useAddToPost"

interface AddToPostFormProps {
  onClose: () => void
}

export const AddToPostForm: React.FC<AddToPostFormProps> = ({ onClose }) => {
  const [newPost, setNewPost] = useState<newPost>({
    title: "",
    body: "",
    userId: 1,
  })

  const handleAddPost = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAddToPost({ ...newPost, id: Date.now() })
    setNewPost({ title: "", body: "", userId: 1 })
    onClose()
  }
  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <Textarea
        rows={30}
        placeholder="내용"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={newPost.userId}
        onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
      />
      <Button onClick={handleAddPost}>게시물 추가</Button>
    </div>
  )
}
