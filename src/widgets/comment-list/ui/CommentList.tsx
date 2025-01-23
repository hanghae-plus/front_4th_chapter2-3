import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useCommentStore } from '@/features/comment';
import { useQueryStore } from '@/features/search/model';
import { Comment, deleteComment, patchComment } from '@/entities/comments';
import { Button, HighlightText } from '@/shared/ui';

const CommentList = ({ postId }: { postId: number }) => {
  const {
    comments,
    setComments,
    setNewComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  } = useCommentStore();

  const searchQuery = useQueryStore((state) => state.searchQuery);

  // 댓글 추가
  const handleAddComment = (postId: number) => {
    setNewComment((prev) => ({ ...prev, postId }));
    setShowAddCommentDialog(true);
  };

  // 댓글 수정
  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment);
    setShowEditCommentDialog(true);
  };

  // 댓글 삭제
  const removeComment = async (commentId: number, postId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // 댓글 좋아요
  const likeComment = async (commentId: number, postId: number) => {
    try {
      const likes = (comments[postId].find((c) => c.id === commentId)?.likes ?? 0) + 1;
      const data = await patchComment(commentId, { likes });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: (comment.likes ?? 0) + 1 } : comment,
        ),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold'>댓글</h3>
        <Button size='sm' onClick={() => handleAddComment(postId)}>
          <Plus className='w-3 h-3 mr-1' />
          댓글 추가
        </Button>
      </div>
      <div className='space-y-1'>
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className='flex items-center justify-between text-sm border-b pb-1'>
            <div className='flex items-center space-x-2 overflow-hidden'>
              <span className='font-medium truncate'>{comment.user.username}:</span>
              <span className='truncate'>
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className='flex items-center space-x-1'>
              <Button variant='ghost' size='sm' onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className='w-3 h-3' />
                <span className='ml-1 text-xs'>{comment.likes}</span>
              </Button>
              <Button variant='ghost' size='sm' onClick={() => handleEditComment(comment)}>
                <Edit2 className='w-3 h-3' />
              </Button>
              <Button variant='ghost' size='sm' onClick={() => removeComment(comment.id, postId)}>
                <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
