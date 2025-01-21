import { Post } from "@/entities/post/model/types"
import { User } from "@/entities/user/model/types"
import { TableRow, TableCell } from "@/shared/ui"
import { PostTableTitle } from "./PostTableTitle"
import { PostTableAuthor } from "./PostTableAuthor"
import { PostTableReaction } from "./PostTableReaction"
import { PostTableWork } from "./PostTableWork"

interface PostTableRowProps {
  post: Post
  searchQuery: string
  selectedTag: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
  openUserModal: (user: Partial<User>) => void
  openPostDetail: (post: Post) => void
  setSelectedPost: (post: Post) => void
  setShowEditDialog: (flag: boolean) => void
  deletePost: (id: number) => void
}

export const PostTableRow = ({
  post,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  openUserModal,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}: PostTableRowProps) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <PostTableTitle
        post={post}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
      />
      <PostTableAuthor post={post} openUserModal={openUserModal} />
      <PostTableReaction post={post} />
      <PostTableWork
        post={post}
        openPostDetail={openPostDetail}
        setSelectedPost={setSelectedPost}
        setShowEditDialog={setShowEditDialog}
        deletePost={deletePost}
      />
    </TableRow>
  )
}
