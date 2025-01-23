import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '../../../shared/ui';
import { useCommentStore } from '../model/store';
import { useCommentMutation } from '../api/mutations';

/**
 * 댓글 폼 컴포넌트
 * 댓글 추가 및 수정 기능을 제공
 */
export const CommentForm = () => {
  const { selectedComment, isCommentFormOpen, setSelectedComment, setIsCommentFormOpen } =
    useCommentStore();

  const { mutate: mutateComment } = useCommentMutation();

  const handleSubmit = () => {
    if (!selectedComment?.body) return;

    mutateComment(
      {
        comment: selectedComment,
        isEdit: !!selectedComment.id,
      },
      {
        onSuccess: () => {
          setSelectedComment(null);
          setIsCommentFormOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isCommentFormOpen} onOpenChange={setIsCommentFormOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedComment?.id ? '댓글 수정' : '새 댓글 작성'}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Textarea
            placeholder='댓글 내용'
            value={selectedComment?.body || ''}
            onChange={(e) =>
              setSelectedComment({
                ...selectedComment!,
                body: e.target.value,
              })
            }
          />
          <Button onClick={handleSubmit}>{selectedComment?.id ? '댓글 수정' : '댓글 작성'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
