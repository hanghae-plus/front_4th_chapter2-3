import { Post } from "@/entities/post/model/types"
import { User } from "@/entities/user/model/types"
import { TableRow, TableCell } from "@/shared/ui"
import { PostTableTitle } from "./PostTableTitle"
import { PostTableWork } from "./PostTableWork"
import { PostReaction } from "@/entities/post/ui/PostReaction"
import { UserAvatar } from "@/entities/user/ui/UserAvatar"

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
