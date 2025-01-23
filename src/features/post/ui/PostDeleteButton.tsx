import { Trash2 } from 'lucide-react';
import { usePostStore } from '@/features/post';
import { deletePost, Posts } from '@/entities/post';
import { Button } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeletePostButtonProps {
  postId: number;
}

const PostDeleteButton = ({ postId }: DeletePostButtonProps) => {
  const queryClient = useQueryClient();
  const { posts } = usePostStore();

  const { mutateAsync } = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData<Posts>(['posts'], (prevData) =>
        prevData
          ? {
              ...prevData,
              posts: prevData.posts.filter((post) => post.id !== postId),
            }
          : undefined,
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 게시물 삭제
  const removePost = async (id: number) => {
    const post = posts.find((post) => post.id === id);
    if (!post) return;
    await mutateAsync(post.id);
  };

  return (
    <Button variant='ghost' size='sm' onClick={() => removePost(postId)}>
      <Trash2 className='w-4 h-4' />
    </Button>
  );
};

export default PostDeleteButton;
