import { Trash2 } from 'lucide-react';
import { Button } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import { deletePost } from '../../../entities/post/api';

interface DeletePostButtonProps {
  postId: number;
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
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

export default DeletePostButton;
