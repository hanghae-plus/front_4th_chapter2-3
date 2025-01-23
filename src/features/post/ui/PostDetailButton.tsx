import { MessageSquare } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { Post } from '../../../entities/post/model';
import useCommentStore from '../../comment/model/use-comment-store.ts';
import usePostStore from '../model/use-post-store.ts';
import { getComments } from '../../../entities/comments/api';

interface PostDetailButtonProps {
  post: Post;
}

const PostDetailButton = ({ post }: PostDetailButtonProps) => {
  const { setComments, comments } = useCommentStore();
  const { setSelectedPost, setShowPostDetailDialog } = usePostStore();

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id).then(() => setShowPostDetailDialog(true));
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const data = await getComments(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <Button variant='ghost' size='sm' onClick={() => openPostDetail(post)}>
      <MessageSquare className='w-4 h-4' />
    </Button>
  );
};

export default PostDetailButton;
