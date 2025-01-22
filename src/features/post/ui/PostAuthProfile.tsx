import type { PostWithUser } from "../../../entities/post/model/types/post"
import type { User } from "../../../entities/user/model/types/user"

interface PostAuthProfileProps {
  post: PostWithUser
  openUserModal: (user: User) => void
}

export const PostAuthProfile = ({ post, openUserModal }: PostAuthProfileProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
      <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
      <span>{post.author?.username}</span>
    </div>
  )
}
