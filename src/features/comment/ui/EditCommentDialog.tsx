import { BaseDialog, Button, Textarea } from '../../../shared/ui';
import useCommentStore from '../model/use-comment-store.ts';
import { putComment } from '../../../entities/comments/api';

const EditCommentDialog = () => {
  const {
    showEditCommentDialog,
    setShowEditCommentDialog,
    setSelectedComment,
    selectedComment,
    setComments,
  } = useCommentStore([
    'showEditCommentDialog',
    'setShowEditCommentDialog',
    'selectedComment',
    'setSelectedComment',
    'setComments',
  ]);

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return;

    try {
      const data = await putComment(selectedComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <BaseDialog
      open={showEditCommentDialog}
      onOpenChange={setShowEditCommentDialog}
      title='댓글 수정'
    >
      <div className='space-y-4'>
        <Textarea
          placeholder='댓글 내용'
          value={selectedComment?.body || ''}
          onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
        />
        <Button onClick={updateComment}>댓글 업데이트</Button>
      </div>
    </BaseDialog>
  );
};

export default EditCommentDialog;
