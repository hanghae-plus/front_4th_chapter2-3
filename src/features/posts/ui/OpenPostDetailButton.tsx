import { MessageSquare } from 'lucide-react';
import { Post } from '../../../shared/types';
import { Button } from '../../../shared/ui';
import { usePostStore } from '../model/store';
import { useCommentStore } from '../../../features/comments/model/store';

interface OpenPostDetailButtonProps {
  post: Post;
}

export const OpenPostDetailButton = ({ post }: OpenPostDetailButtonProps) => {
  const { setSelectedPost, setShowPostDetailDialog } = usePostStore();
  const { fetchComments } = useCommentStore();
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return (
    <Button variant='ghost' size='sm' onClick={() => openPostDetail(post)}>
      <MessageSquare className='w-4 h-4' />
    </Button>
  );
};
