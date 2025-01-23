import { Edit2, ThumbsUp, Trash2 } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { CommentItemProps } from '../../../entities/comment/model/types';
import { useCommentStore } from '../model/store';
import { useDeleteComment } from '../api/mutations';
import { highlightText } from '../../../shared/lib/utils/highlight';

/**
 * 댓글 아이템 컴포넌트
 * @param comment 댓글
 * @param searchQuery 검색 쿼리
 * @returns 댓글 아이템 컴포넌트
 */
export const CommentItem = ({ comment, searchQuery }: CommentItemProps) => {
  const { setSelectedComment, setIsCommentFormOpen } = useCommentStore();
  const { mutate: handleDeleteComment } = useDeleteComment();

  return (
    <div className='flex items-center justify-between text-sm border-b pb-1'>
      <div className='flex items-center space-x-2 overflow-hidden'>
        <span className='font-medium truncate'>{comment.user.username}:</span>
        <span className='truncate'>{highlightText(comment.body, searchQuery || '')}</span>
      </div>
      <div className='flex items-center space-x-1'>
        <Button variant='ghost' size='sm'>
          <ThumbsUp className='w-3 h-3' />
          <span className='ml-1 text-xs'>{comment.likes}</span>
        </Button>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            setSelectedComment(comment);
            setIsCommentFormOpen(true);
          }}
        >
          <Edit2 className='w-3 h-3' />
        </Button>
        <Button variant='ghost' size='sm' onClick={() => handleDeleteComment(comment.id)}>
          <Trash2 className='w-3 h-3' />
        </Button>
      </div>
    </div>
  );
};
