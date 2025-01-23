import { useState } from "react"

import { useMutationUpdatePost } from "../../../entities/post/model/queries/useMutationEditPost"
import { Button, Input, Textarea } from "../../../shared/ui"

import type { Post } from "../../../entities/post/model/types/post"

interface PostEditFormProps {
  post: Post
  onCloseDialog: () => void
}

export const PostEditForm = ({ post, onCloseDialog }: PostEditFormProps) => {
  const [currentPost, setCurrentPost] = useState(post)

  const { mutateAsync: updatePostMutation } = useMutationUpdatePost()

  const handleUpdateButtonClick = async () => {
    await updatePostMutation(currentPost)
    onCloseDialog()
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={currentPost?.title || ""}
        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={currentPost?.body || ""}
        onChange={(e) => setCurrentPost({ ...currentPost, body: e.target.value })}
      />
      <Button onClick={handleUpdateButtonClick}>게시물 업데이트</Button>
    </div>
  )
}
