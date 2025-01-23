import { Edit2 } from 'lucide-react';
import { Post } from '../../../shared/types';
import { Button } from '../../../shared/ui';
import { usePostStore } from '../model/store';

interface OpenEditDialogButtonProps {
  post: Post;
}

export const OpenEditDialogButton = ({ post }: OpenEditDialogButtonProps) => {
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
