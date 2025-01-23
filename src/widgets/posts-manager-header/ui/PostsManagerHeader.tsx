import { Plus } from 'lucide-react';
import { usePostStore } from '@/features/post';
import { Button, CardHeader, CardTitle } from '@/shared/ui';

const PostsManagerHeader = () => {
  const { setShowAddDialog } = usePostStore();
  return (
    <CardHeader>
      <CardTitle className='flex items-center justify-between'>
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className='w-4 h-4 mr-2' />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  );
};

export default PostsManagerHeader;
