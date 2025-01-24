import { PostsManagerWidget, PostDetailDialog, PostFormDialog } from "@widgets/post/ui"
import { CommentFormDialog } from "@widgets/comment/ui"
import { UserInfoDialog } from "@widgets/user/ui"

const PostsManager = () => {
  return (
    <>
      <PostsManagerWidget />
      <PostDetailDialog />
      <PostFormDialog mode="add" />
      <PostFormDialog mode="edit" />
      <CommentFormDialog mode="add" />
      <CommentFormDialog mode="edit" />
      <UserInfoDialog />
    </>
  )
}

export default PostsManager
