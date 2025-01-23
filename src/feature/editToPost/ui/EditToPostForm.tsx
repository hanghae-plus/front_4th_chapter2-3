import React, { useState } from "react"
import { Button, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/type"
import { useEditToPost } from "../model/useEditToPost"

interface EditToPostFormProps {
  post: Post
  onClose: () => void
}

export const EditToPostForm: React.FC<EditToPostFormProps> = ({ post, onClose }) => {
  const { editPost } = useEditToPost()
  const [editedPost, setEditedPost] = useState<Post>(post)

  const updatePost = () => {
    editPost(editedPost)
    onClose()
  }
  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={editedPost?.title || ""}
        onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={editedPost?.body || ""}
        onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
      />
      <Button onClick={updatePost}>게시물 업데이트</Button>
    </div>
  )
}
