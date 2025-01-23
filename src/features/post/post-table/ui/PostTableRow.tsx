import { Post } from "@/entities/post/model/types"
import { TableRow, TableCell } from "@/shared/ui"
import { PostTableTitle } from "./PostTableTitle"
import { PostTableWork } from "./PostTableWork"
import { PostReaction } from "@/entities/post/ui/PostReaction"
import { UserAvatar } from "@/entities/user/ui/UserAvatar"
import { useUserStore } from "@/features/user/model/store"

interface PostTableRowProps {
  post: Post
}

export const PostTableRow = ({ post }: PostTableRowProps) => {
  const { openUserModal } = useUserStore()
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <PostTableTitle post={post} />
      <TableCell>
        <UserAvatar
          image={post.author?.image}
          username={post.author?.username}
          onClick={() => openUserModal(post.author!)}
        />
      </TableCell>
      <TableCell>
        <PostReaction post={post} />
      </TableCell>
      <PostTableWork post={post} />
    </TableRow>
  )
}
