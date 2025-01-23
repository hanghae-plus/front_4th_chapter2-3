import { UserPreview } from '@/features/user';
import { PostTitle, PostDetailButton, PostEditButton, PostDeleteButton } from '@/features/post';
import { ReactionStatus } from '@/entities/reaction';
import { Post } from '@/entities/post';
import { TableCell, TableRow } from '@/shared/ui';

interface PostTableRowProps {
  post: Post;
}

const PostTableRow = ({ post }: PostTableRowProps) => (
  <TableRow key={post.id}>
    <TableCell>{post.id}</TableCell>
    <TableCell>
      <PostTitle post={post} />
    </TableCell>
    <TableCell>
      <UserPreview user={post?.author} />
    </TableCell>
    <TableCell>
      <ReactionStatus reactions={post?.reactions} />
    </TableCell>
    <TableCell>
      <div className='flex items-center gap-2'>
        <PostDetailButton post={post} />
        <PostEditButton post={post} />
        <PostDeleteButton postId={post.id} />
      </div>
    </TableCell>
  </TableRow>
);

export default PostTableRow;
