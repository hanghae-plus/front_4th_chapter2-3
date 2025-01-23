import { Post } from "@/entities/post/model/types"
import { Table, TableBody } from "@/shared/ui"
import { PostTableHeader } from "../../../features/post/post-table/ui/PostTableHead"
import { usePostStore } from "@/features/post/model/store"
import { PostTableRow } from "../../../features/post/post-table/ui/PostTableRow"

interface PostTableProps {
  searchQuery: string
  selectedTag: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
  openPostDetail: (post: Post) => void
  setSelectedPost: (post: Post) => void
  setShowEditDialog: (flag: boolean) => void
  deletePost: (id: number) => void
}

// 게시물 테이블
export const PostTable = ({
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}: PostTableProps) => {
  const posts = usePostStore((state) => state.posts)

  return (
    <Table>
      <PostTableHeader />
      <TableBody>
        {posts.map((post) => (
          <PostTableRow
            key={post.id}
            post={post}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            updateURL={updateURL}
            openPostDetail={openPostDetail}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            deletePost={deletePost}
          />
        ))}
      </TableBody>
    </Table>
  )
}
