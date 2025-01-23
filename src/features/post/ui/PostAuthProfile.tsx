import { useDialog } from "../../../app/model/DialogProvider"
import { UserDialog } from "../../../widgets/user-dialog/ui/UserDialog"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostAuthProfileProps {
  post: PostWithUser
}

export const PostAuthProfile = ({ post }: PostAuthProfileProps) => {
  const { openDialog } = useDialog()

  const handleOpenModal = (selectedUser: PostWithUser["author"]) => {
    openDialog(UserDialog, { open: true, selectedUser })
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleOpenModal(post.author)}>
      <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
      <span>{post.author?.username}</span>
    </div>
  )
}
