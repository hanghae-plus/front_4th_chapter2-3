import { useAtom } from 'jotai';
import { postsAtom } from '../model/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Button,
} from '@/shared/ui';
import { postActions } from '../model/actions';
import { CommentList } from '@/features/comments/ui/CommentList';

export const PostDialog = () => {
  const [{ dialogs, selectedPost }, setPosts] = useAtom(postsAtom);

  const closeDialog = () => {
    setPosts((prev) => ({
      ...prev,
      dialogs: {
        ...prev.dialogs,
        add: false,
        edit: false,
        detail: false,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      userId: 1, // 임시 userId
    };

    if (dialogs.edit && selectedPost) {
      await postActions.updatePost(selectedPost.id, { ...selectedPost, ...data });
    } else {
      await postActions.createPost(data);
    }

    closeDialog();
  };

  return (
    <>
      {/* 추가/수정 다이얼로그 */}
      <Dialog open={dialogs.add || dialogs.edit} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogs.add ? '새 게시물 추가' : '게시물 수정'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              name='title'
              placeholder='제목'
              defaultValue={selectedPost?.title || ''}
              required
            />
            <Textarea
              name='body'
              placeholder='내용'
              defaultValue={selectedPost?.body || ''}
              required
              rows={15}
            />
            <Button type='submit'>{dialogs.add ? '추가' : '수정'}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 상세 보기 다이얼로그 */}
      <Dialog open={dialogs.detail} onOpenChange={closeDialog}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p className='whitespace-pre-wrap'>{selectedPost?.body}</p>
            <CommentList postId={selectedPost?.id!} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
