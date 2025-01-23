import { Plus, ThumbsUp, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { CommentType } from '../../../entities/comment/model/types';
import { useCommentStore } from '../model/store';
import { highlightText } from '../../../shared/lib/utils/highlight';

interface CommentListProps {
  postId: number;
  searchQuery: string;
}

/**
 * 댓글 목록 컴포넌트
 * 게시물의 댓글 목록을 표시
 */
export const CommentList = ({ postId, searchQuery }: CommentListProps) => {
  const { comments, setSelectedComment, setIsCommentFormOpen, likeComment, deleteComment } =
    useCommentStore();

  // 댓글 추가
  const handleAddComment = () => {
    setSelectedComment({ postId } as CommentType);
    setIsCommentFormOpen(true);
  };

  // 댓글 수정
  const handleEditComment = (comment: CommentType) => {
    setSelectedComment(comment);
    setIsCommentFormOpen(true);
  };

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold'>댓글</h3>
        <Button size='sm' onClick={handleAddComment}>
          <Plus className='w-3 h-3 mr-1' />
          댓글 추가
        </Button>
      </div>
      <div className='space-y-1'>
        {comments.get(postId)?.map((comment) => (
          <div key={comment.id} className='flex items-center justify-between text-sm border-b pb-1'>
            <div className='flex items-center space-x-2 overflow-hidden'>
              <span className='font-medium truncate'>{comment.user.username}:</span>
              <span
                className='truncate'
                dangerouslySetInnerHTML={{
                  __html: highlightText(comment.body, searchQuery),
                }}
              />
            </div>
            <div className='flex items-center space-x-1'>
              <Button variant='ghost' size='sm' onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className='w-3 h-3' />
                <span className='ml-1 text-xs'>{comment.likes}</span>
              </Button>
              <Button variant='ghost' size='sm' onClick={() => handleEditComment(comment)}>
                <Edit2 className='w-3 h-3' />
              </Button>
              <Button variant='ghost' size='sm' onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
