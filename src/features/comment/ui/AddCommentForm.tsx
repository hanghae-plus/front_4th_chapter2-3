import { useCommentStore } from '@/features/comment';
import { Comments, initNewComment, postComment } from '@/entities/comments';
import { Button, Textarea } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent } from 'react';

const AddCommentForm = () => {
  const queryClient = useQueryClient();
  const { newComment, setNewComment, setShowAddCommentDialog } = useCommentStore();

  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.setQueryData<Comments>(['comments', data.postId], (prev) => {
        if (!prev) return undefined;
        return { ...prev, comments: [data, ...prev.comments] };
      });

      setShowAddCommentDialog(false);
      setNewComment(initNewComment);
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    },
  });

  // 댓글 추가
  const addComment = async () => {
    mutate(newComment);
  };

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setNewComment({ ...newComment, body: e.target.value });

  return (
    <div className='space-y-4'>
      <Textarea placeholder='댓글 내용' value={newComment.body} onChange={handleChangeComment} />
      <Button onClick={addComment}>댓글 추가</Button>
    </div>
  );
};

export default AddCommentForm;
