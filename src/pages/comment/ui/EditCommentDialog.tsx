import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '../../../shared/ui';
import useCommentStore from '../../../features/comment/model/useCommentStore.ts';
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
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Textarea
            placeholder='댓글 내용'
            value={selectedComment?.body || ''}
            onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentDialog;
