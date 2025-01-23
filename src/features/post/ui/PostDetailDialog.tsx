import { BaseDialog, HighlightText } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import CommentsInPostDetail from '../../comment/ui/CommentsInPostDetail.tsx';
import useSearchStore from '../../search/model/use-search-store.ts';

const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostStore();
  const { searchQuery } = useSearchStore();

  return (
    <BaseDialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={<HighlightText text={selectedPost?.title!} highlight={searchQuery} />}
    >
      <div className='space-y-4'>
        <p>
          <HighlightText text={selectedPost?.body!} highlight={searchQuery} />
        </p>
        <CommentsInPostDetail postId={selectedPost?.id!} />
      </div>
    </BaseDialog>
  );
};

export default PostDetailDialog;
