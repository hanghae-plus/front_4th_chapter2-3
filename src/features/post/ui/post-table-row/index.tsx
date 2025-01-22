import { Table } from "@shared/ui"
import { Post } from "@entities/post/model"
import { PostPreview } from "@entities/post/ui"
import { User } from "@entities/user/model"
import { UserInfo } from "@entities/user/ui"
import { PostActionButtons } from "@features/post/ui"

interface PostTableRowProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onViewComments: (post: Post) => void
  onUserClick: (user: User | undefined) => void
}

export const PostTableRow = ({ post, onEdit, onDelete, onViewComments, onUserClick }: PostTableRowProps) => (
  <Table.Row>
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
)
