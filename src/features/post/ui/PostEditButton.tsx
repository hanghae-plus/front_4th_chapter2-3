import { Edit2 } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { Post } from '../../../entities/post/model';
import usePostStore from '../model/use-post-store.ts';

interface PostEditButtonProps {
  post: Post;
}

const PostEditButton = ({ post }: PostEditButtonProps) => {
  const { setSelectedPost, setShowEditDialog } = usePostStore([
    'setSelectedPost',
    'setShowEditDialog',
  ]);

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
