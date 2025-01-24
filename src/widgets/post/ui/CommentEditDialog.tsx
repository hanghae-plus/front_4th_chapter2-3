import { useSelectedCommentStoreSelector } from '@/features/comments/model';
import { useCommentsStoreSelector } from '@/features/comments/model/useCommentsStore';
import { useNewCommentStoreSelector } from '@/features/comments/model/useNewCommentStore';
import type { useDialog } from '@/features/dialog/model';
import { CustomDialog } from '@/features/dialog/ui';
import { post } from '@/shared/api/fetch';
import { Button, Textarea } from '@/shared/ui';

interface Props {
  dialogState: ReturnType<typeof useDialog>;
}
/**
 * 게시물 추가 다이얼로그
 */
export const CommentEditDialog = ({ dialogState }: Props) => {
  const { setComments } = useCommentsStoreSelector(['setComments']);
  const { newComment, resetNewComment } = useNewCommentStoreSelector([
    'newComment',
    'resetNewComment',
  ]);
  const { selectedComment, setSelectedComment } = useSelectedCommentStoreSelector([
    'selectedComment',
    'setSelectedComment',
  ]);

  const handleCommentUpdate = async () => {
    try {
      const data = await post('/api/comments/add', newComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      dialogState.close();
      resetNewComment();
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  return (
    <CustomDialog open={dialogState.isOpen} onOpenChange={dialogState.close} title='댓글 수정'>
      <Textarea
        placeholder='댓글 내용'
        value={selectedComment?.body || ''}
        onChange={(e) =>
          selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })
        }
      />
      <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>
    </CustomDialog>
  );
};
