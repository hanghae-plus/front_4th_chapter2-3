import { Trash2 } from 'lucide-react';
import { usePostStore } from '@/features/post';
import { deletePost } from '@/entities/post';
import { Button } from '@/shared/ui';

interface DeletePostButtonProps {
  postId: number;
}

const PostDeleteButton = ({ postId }: DeletePostButtonProps) => {
  const { posts, setPosts } = usePostStore();

  // 게시물 삭제
  const removePost = async (id: number) => {
    const post = posts.find((post) => post.id === id);
    if (!post) return;
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Button variant='ghost' size='sm' onClick={() => removePost(postId)}>
      <Trash2 className='w-4 h-4' />
    </Button>
  );
};

export default PostDeleteButton;
