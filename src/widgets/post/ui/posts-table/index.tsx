import { Table } from "@shared/ui"
import { Post } from "@entities/post/model"
import { User } from "@entities/user/model"
import { PostTableRow } from "@features/post/ui"

interface PostsTableProps {
  posts: Post[]
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onViewComments: (post: Post) => void
  onUserClick: (user: User | undefined) => void
}

export const PostsTable = ({ posts, onEdit, onDelete, onViewComments, onUserClick }: PostsTableProps) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head className="w-[50px]">ID</Table.Head>
        <Table.Head>제목</Table.Head>
        <Table.Head className="w-[150px]">작성자</Table.Head>
        <Table.Head className="w-[150px]">반응</Table.Head>
        <Table.Head className="w-[150px]">작업</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {posts.map((post) => (
        <PostTableRow
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewComments={onViewComments}
          onUserClick={onUserClick}
        />
      ))}
    </Table.Body>
  </Table>
)
