import { Edit2 } from 'lucide-react';
import { Post } from '../../../shared/types';
import { Button } from '../../../shared/ui';

interface OpenEditDialogButtonProps {
  post: Post;
}

export const OpenEditDialogButton = ({ post }: OpenEditDialogButtonProps) => {
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
