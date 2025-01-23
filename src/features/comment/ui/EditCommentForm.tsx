import { useCommentStore } from '@/features/comment';

import { Comments, putComment } from '@/entities/comments';

import { Button, Textarea } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditCommentForm = () => {
  const queryClient = useQueryClient();
  const { setShowEditCommentDialog, setSelectedComment, selectedComment } = useCommentStore();

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return;
    await mutateAsync(selectedComment);
  };

  const { mutateAsync } = useMutation({
    mutationFn: putComment,
    onSuccess: (data) => {
      queryClient.setQueryData<Comments>(['comments', data.postId], (prevData) =>
        prevData
          ? {
              ...prevData,
              comments: prevData.comments.map((comment) =>
                comment.id === data.id ? data : comment,
              ),
            }
          : undefined,
      );
      setShowEditCommentDialog(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className='space-y-4'>
      <Textarea
        placeholder='댓글 내용'
        value={selectedComment?.body || ''}
        onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
      />
      <Button onClick={updateComment}>댓글 업데이트</Button>
    </div>
  );
};

export default EditCommentForm;
