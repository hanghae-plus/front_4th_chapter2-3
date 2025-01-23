import { Trash2 } from 'lucide-react';
import { Post } from '../../../shared/types';
import { Button } from '../../../shared/ui';
import { usePostStore } from '../model/store';
import { deletePost } from '../api/posts';

interface DeletePostButtonProps {
  post: Post;
}

export const DeletePostButton = ({ post }: DeletePostButtonProps) => {
  const { posts, setPosts } = usePostStore();

  // 게시물 삭제
  const handlerDeletePost = async (id: number) => {
    try {
      deletePost(post.id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  return (
    <Button variant='ghost' size='sm' onClick={() => handlerDeletePost(post.id)}>
      <Trash2 className='w-4 h-4' />
    </Button>
  );
};
