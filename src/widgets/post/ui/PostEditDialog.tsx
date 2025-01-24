import type { useDialog } from '@/features/dialog/model';
import { CustomDialog } from '@/features/dialog/ui';
import { useUpdatePost } from '@/features/posts/api';
import { useSelectedPostStore } from '@/features/posts/model';
import { Button, Input, Textarea } from '@/shared/ui';

interface Props {
  dialogState: ReturnType<typeof useDialog>;
}
/**
 * 게시물 수정 다이얼로그
 */
export const PostEditDialog = ({ dialogState }: Props) => {
  const { selectedPost, setSelectedPost } = useSelectedPostStore();
  const { mutateAsync: mutatePostUpdate } = useUpdatePost();

  // 게시물 업데이트
  const handlePostUpdate = async () => {
    if (!selectedPost) return;
    try {
      await mutatePostUpdate(selectedPost, {
        onSuccess: () => {
          dialogState.close();
        },
      });
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  return (
    <CustomDialog open={dialogState.isOpen} onOpenChange={dialogState.close} title='게시물 수정'>
      <Input
        placeholder='제목'
        value={selectedPost?.title || ''}
        onChange={(e) =>
          selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })
        }
      />
      <Textarea
        rows={15}
        placeholder='내용'
        value={selectedPost?.body || ''}
        onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
      />
      <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
    </CustomDialog>
  );
};
