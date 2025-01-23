import { CommentList } from '@/widgets/comment-list';
import { usePostStore, useQueryStore } from '@/features/post';
import { BaseDialog, HighlightText } from '@/shared/ui';

const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostStore();
  const { searchQuery } = useQueryStore();

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
        <CommentList postId={selectedPost?.id!} />
      </div>
    </BaseDialog>
  );
};

export default PostDetailDialog;
