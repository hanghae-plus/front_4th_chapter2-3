import { PostAddButton } from "../../../features/post/ui/PostAddButton"
import { PostAddForm } from "../../../features/post/ui/PostAddForm"
import { Dialog } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  newPost: Pick<PostWithUser, "title" | "body" | "userId">
  setNewPost: (post: PostWithUser) => void
}

export const PostAddDialog = ({ open, onOpenChange, newPost, setNewPost }: PostAddDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <PostAddForm newPost={newPost} setNewPost={setNewPost} />
          <PostAddButton />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
