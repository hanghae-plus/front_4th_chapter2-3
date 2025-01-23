import { Skeleton, TableBody, TableCell, TableRow } from "@/shared"
import { highlightText } from "@/shared/lib/highlight-text"
import { PostDetailDialog } from "@/widgets/posts/post-detail"
import { UserAvatarWithDetail } from "@/widgets/user"

import { PostEditDialog } from "@/widgets/posts/post-edit"
import { PostDeleteButton } from "../../post-delete"
import { PostReactions } from "../../post-reactions/ui/post-reactions"
import { PostTags } from "../../post-tags"
import { useQueryPosts } from "../model/use-query-posts"
import { PostListPagination } from "./post-list-pagination"

function PostList() {
  const { data, isLoading, searchQuery } = useQueryPosts()

  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  return (
    <>
      <TableBody>
        {data?.posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post?.title || "", searchQuery)}</div>
                <PostTags post={post} />
              </div>
            </TableCell>
            <TableCell>
              <UserAvatarWithDetail userId={post.userId} image={post.author?.image} username={post.author?.username} />
            </TableCell>
            <TableCell>
              <PostReactions likes={post.reactions?.likes || 0} dislikes={post.reactions?.dislikes || 0} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <PostDetailDialog post={post} />
                <PostEditDialog post={post} />
                <PostDeleteButton postId={post.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <PostListPagination total={data?.total || 0} />
    </>
  )
}

export { PostList }
