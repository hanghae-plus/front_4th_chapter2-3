import { useCreatePost } from '@/features/posts/api';
import { usePostsStoreSelector } from '@/features/posts/model';
import { useNewPost } from '@/features/posts/model/useNewPost';
import { Button, CustomDialog, Input, Textarea } from '@/shared/ui';

interface Props {
  open: boolean;
  onOpenChange: (show: boolean) => void;
}
/**
 * 게시물 추가 다이얼로그
 */
export default function PostAddDialog({ open, onOpenChange }: Props) {
  const { newPost, updateNewPost, resetNewPost } = useNewPost();
  const { mutateAsync: mutatePostCreate } = useCreatePost();
  const { addPost } = usePostsStoreSelector(['posts', 'addPost']);

  // 게시물 추가
  const handlePostAdd = async () => {
    try {
      await mutatePostCreate(newPost, {
        onSuccess: (post) => {
          addPost(post);
          onOpenChange(false);
          resetNewPost();
        },
      });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  return (
    <CustomDialog open={open} onOpenChange={onOpenChange} title='새 게시물 추가'>
      <Input
        placeholder='제목'
        value={newPost.title}
        onChange={(e) => updateNewPost('title', e.target.value)}
      />
      <Textarea
        rows={30}
        placeholder='내용'
        value={newPost.body}
        onChange={(e) => updateNewPost('body', e.target.value)}
      />
      <Input
        type='number'
        placeholder='사용자 ID'
        value={newPost.userId}
        onChange={(e) => updateNewPost('userId', Number(e.target.value))}
      />
      <Button onClick={handlePostAdd}>게시물 추가</Button>
    </CustomDialog>
  );
}
