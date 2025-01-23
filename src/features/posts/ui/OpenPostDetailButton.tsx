import { MessageSquare } from 'lucide-react';
import { Post } from '../../../shared/types';
import { Button } from '../../../shared/ui';

interface OpenPostDetailButtonProps {
  post: Post;
}

export const OpenPostDetailButton = ({ post }: OpenPostDetailButtonProps) => {
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    // setSelectedPost(post);
    // fetchComments(post.id);
    // setShowPostDetailDialog(true);
  };

  return (
    <Button variant='ghost' size='sm' onClick={() => openPostDetail(post)}>
      <MessageSquare className='w-4 h-4' />
    </Button>
  );
};
