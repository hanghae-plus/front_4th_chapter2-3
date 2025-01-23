import { Post } from "@/entities/posts"
import { UserAvatar } from "@/entities/user"
import { PostReactions } from "@/features/post-reactions/ui/post-reactions"
import { PostTags } from "@/features/post-tags"
import { TableBody, TableCell, TableRow } from "@/shared"
import { highlightText } from "@/shared/lib/highlight-text"
import { PostEditDialog } from "../../post-edit-dialog"

interface PostsTableBodyProps {
  posts: Post[]
}

function PostsTableBody(props: PostsTableBodyProps) {
  const { posts } = props
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get("search") || ""

  return (
    <TableBody>
      {posts?.map((post) => (
        <TableRow key={post.id}>
          <TableCell>{post.id}</TableCell>
          <TableCell>
            <div className="space-y-1">
              <div>{highlightText(post?.title || "", searchQuery)}</div>
              <PostTags post={post} />
            </div>
          </TableCell>
          <TableCell>
            <UserAvatar image={post.author?.image} username={post.author?.username} />
          </TableCell>
          <TableCell>
            <PostReactions likes={post.reactions?.likes || 0} dislikes={post.reactions?.dislikes || 0} />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <PostEditDialog post={post} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export { PostsTableBody }
