import { Button, Input, Textarea } from "../../../shared/ui"
import { useQueryEditPost } from "../model/hooks/useQueryEditPost"

import type { Post } from "../model/types/post"

interface PostEditFormProps {
  posts: Post[]
  selectedPost: Post
  onChangeSelectedPost: (...args: any) => void
  onShowEditDialog: (open: boolean) => void
  onChangeEditPosts: (posts: any[]) => void
}

export const PostEditForm = ({
  posts,
  selectedPost,
  onChangeSelectedPost,
  onShowEditDialog,
  onChangeEditPosts,
}: PostEditFormProps) => {
  const { onUpdatePost } = useQueryEditPost(selectedPost, posts, onShowEditDialog, onChangeEditPosts)

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={selectedPost?.title || ""}
        onChange={(e) => onChangeSelectedPost({ ...selectedPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) => onChangeSelectedPost({ ...selectedPost, body: e.target.value })}
      />
      <Button onClick={onUpdatePost}>게시물 업데이트</Button>
    </div>
  )
}
