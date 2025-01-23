import { Plus, Edit2, Trash2, ThumbsUp } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { useCommentStore } from '../model/store';
import { useSearchStore } from '../../../features/posts/model/searchStore';
import { highlightText } from '../../../shared/lib';
import type { Comment } from '../../../shared/types';

interface CommentListProps {
  postId: number;
  onAddClick: (postId: number) => void;
  onEditClick: (comment: Comment) => void;
  onDeleteClick: (commentId: number, postId: number) => void;
  onLikeClick: (commentId: number, postId: number) => void;
}

export const CommentList = ({
  postId,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onLikeClick,
}: CommentListProps) => {
  const { comments } = useCommentStore();
  const { searchQuery } = useSearchStore();

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold'>댓글</h3>
        <Button size='sm' onClick={() => onAddClick(postId)}>
          <Plus className='w-3 h-3 mr-1' />
          댓글 추가
        </Button>
      </div>
      <div className='space-y-1'>
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className='flex items-center justify-between text-sm border-b pb-1'>
            <div className='flex items-center space-x-2 overflow-hidden'>
              <span className='font-medium truncate'>{comment.user.username}:</span>
              <span className='truncate'>{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <Button variant='ghost' size='sm' onClick={() => onLikeClick(comment.id, postId)}>
                <ThumbsUp className='w-3 h-3' />
                <span className='ml-1 text-xs'>{comment.likes}</span>
              </Button>
              <Button variant='ghost' size='sm' onClick={() => onEditClick(comment)}>
                <Edit2 className='w-3 h-3' />
              </Button>
              <Button variant='ghost' size='sm' onClick={() => onDeleteClick(comment.id, postId)}>
                <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
