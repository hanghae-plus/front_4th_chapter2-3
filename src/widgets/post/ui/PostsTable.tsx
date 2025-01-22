import { Table } from "@shared/ui"
import { Post } from "@entities/post/model"
import { User } from "@entities/user/model"
import { PostPreview } from "@entities/post/ui/PostPreview"
import { UserInfo } from "@entities/user/ui/UserInfo"
import { PostActionButtons } from "@features/post/ui/add-post-button"

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
        <Table.Row key={post.id}>
          <Table.Cell>{post.id}</Table.Cell>
          <Table.Cell>
            <PostPreview title={post.title || ""} body={post.body || ""} tags={post.tags} reactions={post.reactions} />
          </Table.Cell>
          <Table.Cell>
            <div className="cursor-pointer" onClick={() => onUserClick(post.author)}>
              <UserInfo username={post.author?.username || ""} image={post.author?.image} size="md" />
            </div>
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center gap-2">
              <span>좋아요 {post.reactions?.likes || 0}</span>
              <span>싫어요 {post.reactions?.dislikes || 0}</span>
            </div>
          </Table.Cell>
          <Table.Cell>
            <PostActionButtons post={post} onEdit={onEdit} onDelete={onDelete} onViewComments={onViewComments} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
