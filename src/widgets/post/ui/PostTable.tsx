import { Table, TableBody } from "@/shared/ui"
import { PostTableHeader } from "../../../features/post/post-table/ui/PostTableHead"
import { usePostStore } from "@/features/post/model/store"
import { PostTableRow } from "../../../features/post/post-table/ui/PostTableRow"

// 게시물 테이블
export const PostTable = () => {
  const posts = usePostStore((state) => state.posts)

  return (
    <Table>
      <PostTableHeader />
      <TableBody>
        {posts.map((post) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
