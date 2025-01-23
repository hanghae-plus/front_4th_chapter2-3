import { MessageSquare } from 'lucide-react';
import { usePostStore } from '@/features/post';

import { Post } from '@/entities/post';
import { getComments } from '@/entities/comments';

import { Button } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';

interface PostDetailButtonProps {
  post: Post;
}

const PostDetailButton = ({ post }: PostDetailButtonProps) => {
  const { setSelectedPost, setShowPostDetailDialog } = usePostStore();

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    refetch().then(() => setShowPostDetailDialog(true));
  };

  const { refetch } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => getComments(post.id),
    enabled: false,
  });

  return (
    <Button variant='ghost' size='sm' onClick={() => openPostDetail(post)}>
      <MessageSquare className='w-4 h-4' />
    </Button>
  );
};

export default PostDetailButton;
