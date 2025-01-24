import { useAtom } from 'jotai';
import { commentsAtom } from '../../model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from '@/shared/ui';
import { commentsApi } from '@/shared/api/comments';

export const CommentDialog = () => {
  const [{ dialogs, selectedComment }, setComments] = useAtom(commentsAtom);

  const closeDialog = () => {
    setComments((prev) => ({
      ...prev,
      dialogs: { add: false, edit: false },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const body = formData.get('body') as string;

    if (dialogs.edit && selectedComment) {
      await commentsApi.update(selectedComment.id, { body });
    } else {
      await commentsApi.create({
        body,
        postId: selectedComment?.postId!,
        userId: 1, // 임시 userId
      });
    }

    closeDialog();
  };

  return (
    <Dialog open={dialogs.add || dialogs.edit} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogs.add ? '새 댓글 작성' : '댓글 수정'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Textarea
            name='body'
            placeholder='댓글 내용'
            defaultValue={selectedComment?.body || ''}
            required
          />
          <Button type='submit'>{dialogs.add ? '작성' : '수정'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
