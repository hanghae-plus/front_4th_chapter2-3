import { PostEditForm } from "../../../features/post/ui/PostEditForm"
import { Dialog } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: PostWithUser
  posts: PostWithUser[]
  onChangeEditPosts: (posts: PostWithUser[]) => void
  onShowEditDialog: (open: boolean) => void
  onChangeSelectedPost: (...args: any) => void
}

export const PostEditDialog = ({
  selectedPost,
  posts,
  onChangeSelectedPost,
  onShowEditDialog,
  onChangeEditPosts,
  ...props
}: PostEditDialogProps) => {
  return (
    <Dialog {...props}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <PostEditForm
          posts={posts}
          selectedPost={selectedPost}
          onChangeSelectedPost={onChangeSelectedPost}
          onShowEditDialog={onShowEditDialog}
          onChangeEditPosts={onChangeEditPosts}
        />
      </Dialog.Content>
    </Dialog>
  )
}
