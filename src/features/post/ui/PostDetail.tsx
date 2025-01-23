import { HighlightText } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import { useSearchStore } from '../../search/model';
import CommentList from '../../../widgets/comment-list/ui/CommentList.tsx';

const PostDetail = () => {
  const { selectedPost } = usePostStore(['selectedPost']);
  const { searchQuery } = useSearchStore(['searchQuery']);

  return (
    <div className='space-y-4'>
      <p>
        <HighlightText text={selectedPost?.body!} highlight={searchQuery} />
      </p>
      <CommentList postId={selectedPost?.id!} />
    </div>
  );
};

export default PostDetail;
