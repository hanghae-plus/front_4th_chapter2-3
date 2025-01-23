import { Edit2, Plus, ThumbsUp, Trash2 } from 'lucide-react';
import { useCommentStore } from '@/features/comment';
import { useQueryStore } from '@/features/post/model';
import { Comment, Comments, deleteComment, patchComment } from '@/entities/comments';
import { Button, HighlightText } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentList = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();
  const comments = queryClient.getQueryData<Comments>(['comments', postId])?.comments || [];
  const { setNewComment, setSelectedComment, setShowAddCommentDialog, setShowEditCommentDialog } =
    useCommentStore();

  const { searchQuery } = useQueryStore();

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

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<Comments>(['comments', postId], (prevData) =>
        prevData
          ? {
              ...prevData,
              comments: prevData.comments.filter((comment) => comment.id !== commentId),
            }
          : undefined,
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutateAsync: patchMutate } = useMutation({
    mutationFn: patchComment,
    onSuccess: (data) => {
      queryClient.setQueryData<Comments>(['comments', postId], (prevData) =>
        prevData
          ? {
              ...prevData,
              comments: prevData.comments.map((comment) =>
                comment.id === data.id ? { ...data, likes: (data.likes ?? 0) + 1 } : comment,
              ),
            }
          : undefined,
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 댓글 삭제
  const removeComment = async (commentId: number) => {
    await deleteMutate(commentId);
  };

  // 댓글 좋아요
  const likeComment = async (commentId: number, postId: number) => {
    const likes =
      (queryClient
        .getQueryData<Comments>(['comments', postId])
        ?.comments.find((c) => c.id === commentId)?.likes ?? 0) + 1;
    await patchMutate({ commentId, body: { likes } });
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
        {comments?.map((comment) => (
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
              <Button variant='ghost' size='sm' onClick={() => removeComment(comment.id)}>
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
