import { Input, Textarea } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostAddFormProps {
  newPost: PostWithUser
  setNewPost: (post: PostWithUser) => void
}

export const PostAddForm = ({ newPost, setNewPost }: PostAddFormProps) => {
  return (
    <>
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
    </>
  )
}
