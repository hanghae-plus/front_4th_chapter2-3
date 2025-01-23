import { useUpdatePost } from '@/features/posts/api';
import { usePostsStoreSelector } from '@/features/posts/model';
import { useSelectedPostStore } from '@/features/posts/model/useSelectedPostStore';
import { Button, CustomDialog, Input, Textarea } from '@/shared/ui';

interface Props {
  open: boolean;
  onOpenChange: (show: boolean) => void;
}
/**
 * 게시물 추가 다이얼로그
 */
export default function PostAddDialog({ open, onOpenChange }: Props) {
  const { selectedPost, setSelectedPost } = useSelectedPostStore();
  const { mutateAsync: mutatePostUpdate } = useUpdatePost();
  const { updatePost } = usePostsStoreSelector(['updatePost']);

  // 게시물 업데이트
  const handlePostUpdate = async () => {
    if (!selectedPost) return;
    try {
      await mutatePostUpdate(selectedPost, {
        onSuccess: (updatedPost) => {
          updatePost(updatedPost);
          onOpenChange(false);
        },
      });
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  return (
    <CustomDialog open={open} onOpenChange={onOpenChange} title='게시물 수정'>
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
}
