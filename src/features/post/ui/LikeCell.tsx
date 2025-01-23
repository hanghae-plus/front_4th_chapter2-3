import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Post } from '@/entities/post/model';
import { TableCell } from '@/shared/ui';

interface LikeCellProps {
  post: Post;
}

const LikeCell = ({ post }: LikeCellProps) => (
  <TableCell>
    <div className='flex items-center gap-2'>
      <ThumbsUp className='w-4 h-4' />
      <span>{post.reactions?.likes || 0}</span>
      <ThumbsDown className='w-4 h-4' />
      <span>{post.reactions?.dislikes || 0}</span>
    </div>
  </TableCell>
);

export default LikeCell;
