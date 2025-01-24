import { useAtom } from 'jotai';
import { commentsAtom } from '../model/store';
import { Button } from '@/shared/ui';
import { ThumbsUp, Edit2, Trash2 } from 'lucide-react';

interface CommentListProps {
  postId: number;
}

export const CommentList = ({ postId }: CommentListProps) => {
  const [{ byPost }] = useAtom(commentsAtom);
  const comments = byPost[postId] || [];

  return (
    <div className='space-y-2'>
      {comments.map((comment) => (
        <div key={comment.id} className='flex items-center justify-between p-2 border-b'>
          <div className='flex items-center gap-2'>
            <img
              src={comment.user.image}
              alt={comment.user.username}
              className='w-6 h-6 rounded-full'
            />
            <span className='font-medium'>{comment.user.username}:</span>
            <span>{comment.body}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm'>
              <ThumbsUp className='w-4 h-4' />
              <span className='ml-1'>{comment.likes}</span>
            </Button>
            <Button variant='ghost' size='sm'>
              <Edit2 className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='sm'>
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
