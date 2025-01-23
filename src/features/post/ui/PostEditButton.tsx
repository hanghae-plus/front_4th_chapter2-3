import { Edit2 } from 'lucide-react';
import { usePostStore } from '@/features/post';
import { Post } from '@/entities/post/model';
import { Button } from '@/shared/ui';

interface PostEditButtonProps {
  post: Post;
}

const PostEditButton = ({ post }: PostEditButtonProps) => {
  const { setSelectedPost, setShowEditDialog } = usePostStore();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => {
        setSelectedPost(post);
        setShowEditDialog(true);
      }}
    >
      <Edit2 className='w-4 h-4' />
    </Button>
  );
};

export default PostEditButton;
