import { usePostStore } from '@/features/post';
import { Posts, putPost } from '@/entities/post';
import { BaseDialog, Button, Input, Textarea } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditPostDialog = () => {
  const queryClient = useQueryClient();
  const { showEditDialog, setShowEditDialog, selectedPost, setSelectedPost } = usePostStore();

  const { mutateAsync } = useMutation({
    mutationFn: putPost,
    onSuccess: (data) => {
      queryClient.setQueryData<Posts>(['posts'], (prevData) =>
        prevData
          ? {
              ...prevData,
              posts: prevData.posts.map((post) =>
                post.id === data.id ? { ...data, title: data.title, body: data.body } : post,
              ),
            }
          : undefined,
      );
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async () => {
      setShowEditDialog(false);
    },
  });

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return;
    await mutateAsync(selectedPost);
  };

  return (
    <BaseDialog open={showEditDialog} onOpenChange={setShowEditDialog} title='게시물 수정'>
      <div className='space-y-4'>
        <Input
          placeholder='제목'
          value={selectedPost?.title || ''}
          onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder='내용'
          value={selectedPost?.body || ''}
          onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
        />
        <Button onClick={updatePost}>게시물 업데이트</Button>
      </div>
    </BaseDialog>
  );
};

export default EditPostDialog;
