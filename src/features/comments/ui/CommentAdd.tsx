import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui';

interface Props {
  onCommentAdd: () => void;
}
export const CommentAdd = ({ onCommentAdd }: Props) => (
  <div className='flex items-center justify-between mb-2'>
    <h3 className='text-sm font-semibold'>댓글</h3>
    <Button
      size='sm'
      onClick={() => {
        onCommentAdd();
      }}
    >
      <Plus className='w-3 h-3 mr-1' />
      댓글 추가
    </Button>
  </div>
);
