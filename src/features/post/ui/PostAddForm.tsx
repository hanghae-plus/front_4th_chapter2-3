import { useState } from "react"

import { Button, Input, Textarea } from "../../../shared/ui"
import { useMutationAddPost } from "../model/hooks/useMutationAddPost"

interface PostAddFormProps {
  onCloseDialog: () => void
}

export const PostAddForm = ({ onCloseDialog }: PostAddFormProps) => {
  const [post, setPost] = useState({ title: "", body: "", userId: 1 })

  const { mutateAsync: addPostMutation } = useMutationAddPost()

  const handleAddPostButtonClick = async () => {
    await addPostMutation(post)
    onCloseDialog()
  }

  return (
    <>
      <Input placeholder="제목" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
      <Textarea
        rows={30}
        placeholder="내용"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={post.userId}
        onChange={(e) => setPost({ ...post, userId: Number(e.target.value) })}
      />
      <Button onClick={handleAddPostButtonClick}>게시물 추가</Button>
    </>
  )
}
