import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from '../../../shared/ui';
import { PostItemType } from '../../../entities/post/model/types';
import { usePostStore } from '../model/store';
import { usePostMutation } from '../api/mutations';

/**
 * 게시물 폼 컴포넌트
 * 게시물 추가 및 수정 기능을 제공
 */
export const PostFormDialog = () => {
  const selectedPost = usePostStore((state) => state.selectedPost);
  const setSelectedPost = usePostStore((state) => state.setSelectedPost);
  const { mutate: mutatePost } = usePostMutation();

  // 게시물 추가 및 수정 핸들러
  const handleSubmit = () => {
    if (!selectedPost?.title || !selectedPost?.body) {
      return;
    }

    const postData = {
      post: {
        ...selectedPost,
        userId: selectedPost.userId || 1,
      },
      isEdit: !!selectedPost.id,
    };

    mutatePost(postData, {
      onSuccess: () => {
        setSelectedPost(null);
      },
    });
  };

  // 폼 열기/닫기 핸들러
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedPost(null);
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PostItemType,
  ) => {
    const value = field === 'userId' ? Number(e.target.value) : e.target.value;
    setSelectedPost({
      ...(selectedPost || { userId: 1 }),
      [field]: value,
    } as PostItemType);
  };

  return (
    <Dialog open={!!selectedPost} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedPost?.id ? '게시물 수정' : '새 게시물 추가'}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='제목'
            value={selectedPost?.title || ''}
            onChange={(e) => handleInputChange(e, 'title')}
          />
          <Textarea
            rows={selectedPost?.id ? 15 : 30}
            placeholder='내용'
            value={selectedPost?.body || ''}
            onChange={(e) => handleInputChange(e, 'body')}
          />
          {!selectedPost?.id && (
            <Input
              type='number'
              placeholder='사용자 ID'
              value={selectedPost?.userId || 1}
              onChange={(e) => handleInputChange(e, 'userId')}
            />
          )}
          <Button onClick={handleSubmit}>
            {selectedPost?.id ? '게시물 업데이트' : '게시물 추가'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
