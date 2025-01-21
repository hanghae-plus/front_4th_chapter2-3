import { Post } from "@/entities/post/model/types"
import { User } from "@/entities/user/model/types"
import { TableCell } from "@/shared/ui"

interface PostTableAuthor {
  post: Post
  openUserModal: (user: Partial<User>) => void
}

export const PostTableAuthor = ({
  post,
  openUserModal,
}: PostTableAuthor) => {
  return (
    <TableCell>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author!)}>
        <img src={post.author?.image || undefined} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  )
}
