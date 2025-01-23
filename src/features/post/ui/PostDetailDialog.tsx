import { BaseDialog, HighlightText } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import useSearchStore from '../../search/model/use-search-store.ts';
import PostDetail from './PostDetail.tsx';

const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostStore([
    'showPostDetailDialog',
    'setShowPostDetailDialog',
    'selectedPost',
  ]);
  const { searchQuery } = useSearchStore(['searchQuery']);

  return (
    <BaseDialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={<HighlightText text={selectedPost?.title!} highlight={searchQuery} />}
    >
      <PostDetail />
    </BaseDialog>
  );
};

export default PostDetailDialog;
